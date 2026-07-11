import React from "react";
import { Lightbulb } from "lucide-react";

export default function EarningsChart({ data }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-extrabold text-slate-900">Historique des gains par mois</h2>
        <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">Revenus globaux</span>
      </div>

      <div className="flex-1 flex items-end justify-between gap-3 min-h-[180px]">
        {data.map((d) => (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-slate-900 font-mono">${d.value}</span>
            <div className="w-full rounded-t-lg bg-gradient-to-t from-[#F87171] to-[#DC2626]" style={{ height: `${(d.value / max) * 130 + 6}px` }} />
            <span className="text-[11px] font-semibold text-slate-400">{d.label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 mt-6 pt-5 border-t border-slate-100 text-xs text-slate-500">
        <Lightbulb className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
        <p>Tes gains augmentent avec le nombre de vues cumulées. Publie tes vidéos courtes sur plusieurs canaux pour maximiser tes revenus.</p>
      </div>
    </div>
  );
}