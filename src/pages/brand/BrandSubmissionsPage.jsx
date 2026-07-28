import React from "react";
import { useBrand } from "@/components/brand/BrandLayout";
import ReviewSubmissions from "@/components/brand/ReviewSubmissions";
import SubmissionsAnalytics from "@/components/brand/SubmissionsAnalytics";
import TreatedSubmissionRow from "@/components/brand/TreatedSubmissionRow";
import PayoutTracker from "@/components/brand/PayoutTracker";

export default function BrandSubmissionsPage() {
  const { submissions, pendingSubmissions, campaignsById, loadData } = useBrand();
  const treated = submissions.filter((s) => s.status !== "pending");

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-8">Soumissions</h1>

      <SubmissionsAnalytics submissions={submissions} />

      <h2 className="text-lg font-extrabold text-slate-900 mb-4">Suivi des paiements par créateur</h2>
      <p className="text-sm text-slate-500 -mt-3 mb-4">Vues cumulées de toutes les vidéos approuvées. Chaque palier de 1000 vues déjà payé est mémorisé — aucun double paiement possible.</p>
      <div className="mb-10">
        <PayoutTracker submissions={submissions} campaignsById={campaignsById} onUpdated={loadData} />
      </div>

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
          {treated.map((s) => (
            <TreatedSubmissionRow
              key={s.id}
              submission={s}
              rate={campaignsById[s.campaign_id]?.rate || 0}
              onUpdated={loadData}
            />
          ))}
        </div>
      )}
    </div>
  );
}