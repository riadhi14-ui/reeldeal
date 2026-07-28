import React from "react";
import { ExternalLink } from "lucide-react";
import { safeUrl } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const statusConfig = {
  pending: { label: "En attente", cls: "bg-amber-50 text-amber-600" },
  approved: { label: "Validée", cls: "bg-emerald-50 text-emerald-600" },
  rejected: { label: "Refusée", cls: "bg-red-50 text-red-600" },
};

export default function SubmissionsList({ submissions }) {
  if (submissions.length === 0) {
    return (
      <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-10 text-center">
        <p className="font-bold text-slate-900">Aucune vidéo soumise pour le moment</p>
        <p className="text-sm text-slate-500 mt-1">Soumets ta première vidéo pour commencer à gagner.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm divide-y divide-slate-100 overflow-hidden">
      {submissions.map((s) => {
        const st = statusConfig[s.status] || statusConfig.pending;
        return (
          <div key={s.id} className="flex flex-wrap items-center gap-3 p-5">
            <div className="flex-1 min-w-[180px]">
              <p className="font-bold text-slate-900 truncate">{s.campaign_name}</p>
              <p className="text-xs text-slate-400">{s.platform} · {format(new Date(s.created_date), "dd MMM yyyy", { locale: fr })}</p>
            </div>
            {safeUrl(s.video_url) ? (
              <a href={safeUrl(s.video_url)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#DC2626] transition-colors">
                Voir la vidéo <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400">URL invalide</span>
            )}
            <div className="text-right w-24">
              <p className="text-sm font-extrabold text-slate-900 font-mono">{(s.views || 0).toLocaleString("fr-FR")}</p>
              <p className="text-[10px] text-slate-400">vues</p>
            </div>
            <div className="text-right w-24">
              <p className="text-sm font-extrabold text-[#DC2626] font-mono">{(s.earnings || 0).toLocaleString("fr-FR")} €</p>
              <p className="text-[10px] text-slate-400">gains</p>
            </div>
            <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${st.cls}`}>{st.label}</span>
          </div>
        );
      })}
    </div>
  );
}