import React from "react";
import { Link } from "react-router-dom";

export default function BrandCampaignsList({ campaigns, submissionCounts }) {
  if (campaigns.length === 0) {
    return (
      <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-10 text-center">
        <p className="font-bold text-slate-900">Aucune campagne pour le moment</p>
        <p className="text-sm text-slate-500 mt-1">Crée ta première campagne pour recevoir des vidéos de créateurs.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {campaigns.map((c) => (
        <Link
          key={c.id}
          to={`/campaign/${c.id}`}
          className="group rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm hover:shadow-lg hover:shadow-red-500/10 transition-all overflow-hidden"
        >
          <div className="h-28 overflow-hidden">
            <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="font-bold text-slate-900 truncate">{c.name}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${c.status === "active" ? "bg-emerald-50 text-emerald-600" : c.status === "draft" ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500"}`}>
                {c.status === "active" ? "Active" : c.status === "draft" ? "Brouillon" : "Fermée"}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{c.category} · {c.budget}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#DC2626] font-mono">${c.rate?.toFixed(2)}/1K vues</span>
              <span className="text-xs font-semibold text-slate-500">{submissionCounts[c.id] || 0} vidéo(s)</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}