"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  onSelect: () => void;
  loading?: boolean;
}

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  highlighted,
  onSelect,
  loading,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-8 flex flex-col",
        highlighted
          ? "bg-brand-600 text-white ring-4 ring-brand-300 shadow-2xl scale-105"
          : "bg-white border border-gray-200 shadow-sm"
      )}
    >
      <div className="mb-6">
        <h3 className={cn("text-lg font-bold", highlighted ? "text-white" : "text-gray-900")}>
          {name}
        </h3>
        <div className="mt-2 flex items-end gap-1">
          <span className={cn("text-4xl font-extrabold", highlighted ? "text-white" : "text-gray-900")}>
            {price}
          </span>
          {period && (
            <span className={cn("text-sm mb-1", highlighted ? "text-blue-100" : "text-gray-500")}>
              {period}
            </span>
          )}
        </div>
        <p className={cn("text-sm mt-2", highlighted ? "text-blue-100" : "text-gray-500")}>
          {description}
        </p>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm">
            <span className={highlighted ? "text-blue-200" : "text-green-500"}>✓</span>
            <span className={highlighted ? "text-blue-50" : "text-gray-700"}>{f}</span>
          </li>
        ))}
      </ul>

      <Button
        size="lg"
        variant={highlighted ? "secondary" : "primary"}
        className="w-full"
        onClick={onSelect}
        loading={loading}
      >
        {cta}
      </Button>
    </div>
  );
}
