import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Pause, Play, Eye, Video, Loader2, BarChart3, CheckCircle2, Pencil } from "lucide-react";
import CreateCampaignDialog from "@/components/brand/CreateCampaignDialog";

export default function BrandCampaignControls({ campaign, onUpdated }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [status, setStatus] = useState(campaign.status || "active");

  useEffect(() => {
    base44.entities.Submission.filter({ campaign_id: campaign.id })
      .then((r) => setSubmissions(r))
      .catch(() => setSubmissions([]))
      .finally(() => setLoading(false));
  }, [campaign.id]);

  const totalViews = submissions.reduce((sum, s) => sum + (s.views || 0), 0);
  const approved = submissions.filter((s) => s.status === "approved").length;
  const paused = status === "closed";

  const toggleStatus = async () => {
    setUpdating(true);
    const next = paused ? "active" : "closed";
    await base44.entities.Campaign.update(campaign.id, { status: next });
    setStatus(next);
    setUpdating(false);
    onUpdated?.();
  };

  const stats = [
    { icon: Video, label: "Vidéos soumises", value: submissions.length },
    { icon: CheckCircle2, label: "Vidéos approuvées", value: approved },
    { icon: Eye, label: "Vues totales", value: totalViews.toLocaleString("fr-FR") },
  ];

  return (
    <div className="mt-8 rounded-3xl ring-1 ring-slate-100 bg-slate-50/60 p-6">
      <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm mb-1">
        <BarChart3 className="w-4 h-4 text-[#DC2626]" /> Ta campagne
      </div>
      <div className="flex items-center justify-between gap-3 mb-5">
        <h3 className="text-lg font-extrabold text-slate-900">Pilotage de la campagne</h3>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${paused ? "bg-slate-200 text-slate-600" : "bg-emerald-100 text-emerald-700"}`}>
          {paused ? "En pause" : "Active"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
            <Icon className="w-5 h-5 text-[#DC2626] mb-2" />
            <p className="text-xl font-extrabold text-slate-900">{loading ? "…" : value}</p>
            <p className="text-xs text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={toggleStatus}
          disabled={updating}
          className={`inline-flex h-12 px-6 items-center justify-center gap-2 rounded-full font-bold shadow-lg transition-colors disabled:opacity-50 ${paused ? "bg-[#EF4444] hover:bg-[#DC2626] text-white shadow-red-500/25" : "bg-white ring-1 ring-slate-200 hover:ring-[#EF4444] text-slate-700 hover:text-[#DC2626]"}`}
        >
          {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          {paused ? "Reprendre la campagne" : "Mettre en pause"}
        </button>
        <button
          onClick={() => setEditOpen(true)}
          className="inline-flex h-12 px-6 items-center justify-center gap-2 rounded-full bg-white ring-1 ring-slate-200 hover:ring-[#EF4444] text-slate-700 hover:text-[#DC2626] font-bold transition-colors"
        >
          <Pencil className="w-4 h-4" /> Modifier la campagne
        </button>
      </div>

      <CreateCampaignDialog
        campaign={campaign}
        open={editOpen}
        onOpenChange={setEditOpen}
        onCreated={onUpdated}
      />
    </div>
  );
}