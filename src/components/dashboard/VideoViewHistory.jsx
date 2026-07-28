import React from "react";
import { TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function VideoViewHistory({ snapshots = [] }) {
  if (!snapshots.length) {
    return <p className="w-full text-[11px] text-slate-400">Aucune évolution enregistrée pour cette vidéo.</p>;
  }

  return (
    <div className="w-full flex flex-wrap gap-2 pt-2 border-t border-slate-100">
      {snapshots.slice(0, 5).map((item) => (
        <div key={item.id} className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-xs font-bold text-slate-700">{item.views.toLocaleString("fr-FR")} vues</span>
          <span className={`text-[10px] font-semibold ${item.delta >= 0 ? "text-emerald-600" : "text-red-600"}`}>
            {item.delta >= 0 ? "+" : ""}{item.delta.toLocaleString("fr-FR")}
          </span>
          <span className="text-[10px] text-slate-400">{format(new Date(item.created_date), "dd MMM, HH:mm", { locale: fr })}</span>
        </div>
      ))}
    </div>
  );
}