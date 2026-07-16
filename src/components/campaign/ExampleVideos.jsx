import React from "react";
import { Play } from "lucide-react";

const FALLBACK = [
  { thumb: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=80", label: "Exemple de contenu" },
  { thumb: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&q=80", label: "Inspiration vidéo" },
];

export default function ExampleVideos({ campaign }) {
  const examples = campaign.example_videos?.length ? campaign.example_videos : (campaign.examples?.length ? campaign.examples : FALLBACK);
  return (
    <div className="mt-14 max-w-5xl">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Vidéos exemplaires</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {examples.map((example, index) => typeof example === "string" ? (
          <video key={example} src={example} controls preload="metadata" className="aspect-[9/16] w-full rounded-2xl bg-slate-900 object-cover ring-1 ring-slate-100" aria-label={`Vidéo exemple ${index + 1}`} />
        ) : (
          <a key={index} href={example.url || "#"} target={example.url ? "_blank" : undefined} rel="noreferrer" onClick={(event) => { if (!example.url) event.preventDefault(); }} className="group relative aspect-[9/16] rounded-2xl overflow-hidden ring-1 ring-slate-100 bg-slate-900">
            <img src={example.thumb} alt={example.label || `Exemple ${index + 1}`} className="w-full h-full object-cover opacity-90" /><span className="absolute inset-0 flex items-center justify-center"><span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center"><Play className="w-5 h-5 text-[#DC2626] fill-[#DC2626]" /></span></span>
          </a>
        ))}
      </div>
    </div>
  );
}