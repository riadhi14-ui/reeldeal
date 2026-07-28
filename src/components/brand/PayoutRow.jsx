import React, { useState } from "react";
import { Loader2, BadgeCheck, ChevronDown } from "lucide-react";
import VideoViewsRow from "@/components/brand/VideoViewsRow";

export default function PayoutRow({ row, paying, onPay, onUpdated }) {
  const [open, setOpen] = useState(false);
  const progress = Math.min(((row.dueViews % 1000) / 1000) * 100, 100);
  return (
    <div className="p-5 space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[180px]">
          <p className="font-bold text-slate-900 truncate">{row.campaign_name}</p>
          <p className="text-xs text-slate-400">{row.creator_name || `Créateur ${row.creator_id.slice(0, 6)}`} · {row.videos} vidéo{row.videos > 1 ? "s" : ""}</p>
        </div>
        <div className="text-right w-24">
          <p className="text-sm font-extrabold text-slate-900 font-mono">{row.views.toLocaleString("fr-FR")}</p>
          <p className="text-[10px] text-slate-400">vues cumulées</p>
        </div>
        <div className="text-right w-24">
          <p className="text-sm font-extrabold text-emerald-600 font-mono">{row.paidViews.toLocaleString("fr-FR")}</p>
          <p className="text-[10px] text-slate-400">vues payées</p>
        </div>
        <div className="text-right w-24">
          <p className="text-sm font-extrabold text-slate-900 font-mono">{row.paidAmount.toFixed(2)} €</p>
          <p className="text-[10px] text-slate-400">déjà versé</p>
        </div>
        {row.payableViews > 0 ? (
          <button
            onClick={onPay}
            disabled={paying}
            className="h-9 px-4 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-60"
          >
            {paying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <BadgeCheck className="w-3.5 h-3.5" />}
            Payer {row.amountDue.toFixed(2)} € ({(row.payableViews / 1000).toLocaleString("fr-FR")}k vues)
          </button>
        ) : (
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">À jour</span>
        )}
      </div>
      <div>
        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full bg-[#EF4444] rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-[10px] text-slate-400 mt-1">
          {row.dueViews % 1000} / 1000 vues vers le prochain palier · Taux : {row.rate} € / 1000 vues
        </p>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-[#DC2626] transition-colors"
      >
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        {open ? "Masquer" : "Traquer"} les vues vidéo par vidéo ({row.videos})
      </button>

      {open && (
        <div className="rounded-2xl bg-slate-50 px-4 divide-y divide-slate-200">
          {row.subs.map((s) => (
            <VideoViewsRow key={s.id} submission={s} rate={row.rate} onUpdated={onUpdated} />
          ))}
        </div>
      )}
    </div>
  );
}