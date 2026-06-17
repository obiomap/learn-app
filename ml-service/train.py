"""
Train a TF-IDF lesson recommender and save the model to model.pkl.
Run once before starting the server, or the server will train automatically on startup.

Usage:
    python train.py
"""
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from lessons_data import LESSONS

documents = [lesson["doc"] for lesson in LESSONS]

vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 2), min_df=1)
matrix = vectorizer.fit_transform(documents)

joblib.dump({"vectorizer": vectorizer, "matrix": matrix}, "model.pkl")
print(f"Trained on {len(LESSONS)} lessons. Vocabulary size: {len(vectorizer.vocabulary_)}. Saved to model.pkl")
