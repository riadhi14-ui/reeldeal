import React from "react";
import { ExternalLink } from "lucide-react";
import { useBrand } from "@/components/brand/BrandLayout";
import ReviewSubmissions from "@/components/brand/ReviewSubmissions";

const statusStyles = {
  approved: { label: "Approuvée", cls: "bg-green-50 text-green-700" },
  rejected: { label: "Refusée", cls: "bg-red-50 text-[#DC2626]" },
};

export default function BrandSubmissionsPage() {
  const { submissions, pendingSubmissions, campaignsById, loadData } = useBrand();
  const treated = submissions.filter((s) => s.status !== "pending");

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-8">Soumissions</h1>

      <h2 className="text-lg font-extrabold text-slate-900 mb-4">
        À valider {pendingSubmissions.length > 0 && <span className="ml-2 text-sm bg-red-50 text-[#DC2626] px-3 py-1 rounded-full">{pendingSubmissions.length}</span>}
      </h2>
      <ReviewSubmissions submissions={pendingSubmissions} campaignsById={campaignsById} onUpdated={loadData} />

      <h2 className="text-lg font-extrabold text-slate-900 mt-10 mb-4">Historique</h2>
      {treated.length === 0 ? (
        <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-8 text-center text-sm text-slate-400">
          Aucune vidéo traitée pour le moment.
        </div>
      ) : (
        <div className="space-y-3">
          {treated.map((s) => {
            const st = statusStyles[s.status] || statusStyles.rejected;
            return (
              <div key={s.id} className="flex items-center gap-4 rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-4">
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900 truncate">{s.campaign_name}</p>
                  <p className="text-xs text-slate-400">{s.platform} · {(s.views || 0).toLocaleString("fr-FR")} vues · ${(s.earnings || 0).toFixed(2)}</p>
                </div>
                <a href={s.video_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#DC2626]">
                  <ExternalLink className="w-4 h-4" />
                </a>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${st.cls}`}>{st.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}