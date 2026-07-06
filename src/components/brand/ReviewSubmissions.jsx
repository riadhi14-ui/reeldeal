import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { ExternalLink, Check, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

function ReviewRow({ submission, rate, onUpdated }) {
  const [views, setViews] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleDecision = async (status) => {
    setProcessing(true);
    const v = status === "approved" ? Number(views) || 0 : 0;
    await base44.entities.Submission.update(submission.id, {
      status,
      views: v,
      earnings: status === "approved" ? Math.round((v / 1000) * rate * 100) / 100 : 0,
    });
    onUpdated();
  };

  return (
    <div className="flex flex-wrap items-center gap-3 p-5">
      <div className="flex-1 min-w-[180px]">
        <p className="font-bold text-slate-900 truncate">{submission.campaign_name}</p>
        <p className="text-xs text-slate-400">{submission.platform}</p>
      </div>
      <a href={submission.video_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#DC2626] transition-colors">
        Voir la vidéo <ExternalLink className="w-3 h-3" />
      </a>
      <Input
        type="number"
        min="0"
        placeholder="Vues"
        value={views}
        onChange={(e) => setViews(e.target.value)}
        className="w-28 rounded-full"
      />
      {processing ? (
        <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => handleDecision("approved")}
            className="h-9 px-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <Check className="w-3.5 h-3.5" /> Valider
          </button>
          <button
            onClick={() => handleDecision("rejected")}
            className="h-9 px-4 rounded-full bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Refuser
          </button>
        </div>
      )}
    </div>
  );
}

export default function ReviewSubmissions({ submissions, campaignsById, onUpdated }) {
  if (submissions.length === 0) {
    return (
      <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-10 text-center">
        <p className="font-bold text-slate-900">Aucune vidéo en attente de validation</p>
        <p className="text-sm text-slate-500 mt-1">Les vidéos soumises par les créateurs apparaîtront ici.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm divide-y divide-slate-100 overflow-hidden">
      {submissions.map((s) => (
        <ReviewRow key={s.id} submission={s} rate={campaignsById[s.campaign_id]?.rate || 0} onUpdated={onUpdated} />
      ))}
    </div>
  );
}