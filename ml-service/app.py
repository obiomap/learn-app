import os
import joblib
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from lessons_data import LESSONS

app = FastAPI(title="Python Lesson Recommender")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

MODEL_PATH = "model.pkl"

def load_or_train():
    if os.path.exists(MODEL_PATH):
        return joblib.load(MODEL_PATH)
    documents = [l["doc"] for l in LESSONS]
    vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 2), min_df=1)
    matrix = vectorizer.fit_transform(documents)
    model = {"vectorizer": vectorizer, "matrix": matrix}
    joblib.dump(model, MODEL_PATH)
    return model

_model = load_or_train()


class RecommendRequest(BaseModel):
    query: str
    top_k: int = 3


@app.get("/health")
def health():
    return {"status": "ok", "lessons": len(LESSONS)}


@app.post("/recommend")
def recommend(req: RecommendRequest):
    top_k = max(1, min(req.top_k, len(LESSONS)))
    query_vec = _model["vectorizer"].transform([req.query.lower()])
    scores = cosine_similarity(query_vec, _model["matrix"]).flatten()
    top_indices = np.argsort(scores)[::-1][:top_k]

    results = []
    for i in top_indices:
        if scores[i] > 0:
            results.append({
                "id": LESSONS[i]["id"],
                "title": LESSONS[i]["title"],
                "description": LESSONS[i]["description"],
                "score": round(float(scores[i]), 3),
            })

    return {"query": req.query, "recommendations": results}
