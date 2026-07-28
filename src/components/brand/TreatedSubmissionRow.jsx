import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { ExternalLink, Pencil, Check, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { safeUrl } from "@/lib/utils";

const statusStyles = {
  approved: { label: "Approuvée", cls: "bg-green-50 text-green-700" },
  rejected: { label: "Refusée", cls: "bg-red-50 text-[#DC2626]" },
};

export default function TreatedSubmissionRow({ submission, rate, onUpdated }) {
  const [editing, setEditing] = useState(false);
  const [views, setViews] = useState(String(submission.views || 0));
  const [saving, setSaving] = useState(false);

  const st = statusStyles[submission.status] || statusStyles.rejected;
  const isApproved = submission.status === "approved";

  const save = async () => {
    setSaving(true);
    const v = Number(views) || 0;
    await base44.entities.Submission.update(submission.id, {
      views: v,
      earnings: Math.round((v / 1000) * rate * 100) / 100,
    });
    setSaving(false);
    setEditing(false);
    onUpdated();
  };

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-4">
      <div className="min-w-0 flex-1">
        <p className="font-bold text-slate-900 truncate">{submission.campaign_name}</p>
        <p className="text-xs text-slate-400">{submission.platform}</p>
      </div>

      {editing ? (
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="0"
            value={views}
            onChange={(e) => setViews(e.target.value)}
            className="w-28 rounded-full"
            autoFocus
          />
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
          ) : (
            <>
              <button onClick={save} className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={() => { setEditing(false); setViews(String(submission.views || 0)); }} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors">
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="text-right w-24">
            <p className="text-sm font-extrabold text-slate-900 font-mono">{(submission.views || 0).toLocaleString("fr-FR")}</p>
            <p className="text-[10px] text-slate-400">vues</p>
          </div>
          <div className="text-right w-24">
            <p className="text-sm font-extrabold text-[#DC2626] font-mono">{(submission.earnings || 0).toFixed(2)} €</p>
            <p className="text-[10px] text-slate-400">gains</p>
          </div>
          {isApproved && (
            <button onClick={() => setEditing(true)} className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-[#DC2626] transition-colors">
              <Pencil className="w-3.5 h-3.5" /> Vues
            </button>
          )}
        </>
      )}

      {safeUrl(submission.video_url) && (
        <a href={safeUrl(submission.video_url)} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#DC2626]">
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
      <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${st.cls}`}>{st.label}</span>
    </div>
  );
}