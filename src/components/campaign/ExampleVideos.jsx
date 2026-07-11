import React from "react";
import { Play } from "lucide-react";

const FALLBACK = [
  { thumb: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=80", label: "Tuto : +100€ sans travailler" },
  { thumb: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&q=80", label: "Tuto : 4$ par 1000 vues" },
];

export default function ExampleVideos({ campaign }) {
  const examples = (campaign.examples && campaign.examples.length ? campaign.examples : FALLBACK);

  return (
    <div className="mt-14 max-w-3xl">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Exemples de contenu</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {examples.map((ex, i) => (
          <a
            key={i}
            href={ex.url || "#"}
            target={ex.url ? "_blank" : undefined}
            rel="noreferrer"
            className="group relative aspect-[9/16] rounded-2xl overflow-hidden ring-1 ring-slate-100 bg-slate-900"
            onClick={(e) => { if (!ex.url) e.preventDefault(); }}
          >
            <img src={ex.thumb} alt={ex.label || `Exemple ${i + 1}`} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-[#DC2626] fill-[#DC2626] ml-0.5" />
              </span>
            </span>
            {ex.label && (
              <span className="absolute bottom-3 inset-x-3 text-center text-xs font-bold text-white bg-[#DC2626] rounded-lg px-2 py-1">
                {ex.label}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}