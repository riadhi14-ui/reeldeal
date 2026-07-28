import React, { useState } from "react";
import { ExternalLink, Check, Loader2, Eye } from "lucide-react";
import { updateSubmissionViews } from "@/lib/viewTracking";
import { Input } from "@/components/ui/input";
import { safeUrl } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Ligne de traque d'une vidéo : la marque saisit / met à jour les vues réelles.
export default function VideoViewsRow({ submission, rate, onUpdated }) {
  const [views, setViews] = useState(String(submission.views || 0));
  const [saving, setSaving] = useState(false);
  const url = safeUrl(submission.video_url);
  const dirty = Number(views) !== (submission.views || 0);

  const save = async () => {
    setSaving(true);
    const v = Number(views) || 0;
    await updateSubmissionViews(submission, v, rate);
    setSaving(false);
    onUpdated();
  };

  return (
    <div className="flex flex-wrap items-center gap-3 py-3">
      <Eye className="w-3.5 h-3.5 text-slate-300 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-700 truncate">{submission.platform || "Vidéo"}</p>
        <p className="text-[10px] text-slate-400">{format(new Date(submission.created_date), "dd MMM yyyy", { locale: fr })}</p>
      </div>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-[#DC2626] transition-colors">
          Voir <ExternalLink className="w-3 h-3" />
        </a>
      ) : (
        <span className="text-xs font-semibold text-slate-300">URL invalide</span>
      )}
      <Input
        type="number"
        min="0"
        value={views}
        onChange={(e) => setViews(e.target.value)}
        className="w-28 h-9 rounded-full"
      />
      <span className="text-xs font-bold text-slate-500 font-mono w-20 text-right">
        {(Math.round(((Number(views) || 0) / 1000) * rate * 100) / 100).toFixed(2)} €
      </span>
      {saving ? (
        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
      ) : (
        <button
          onClick={save}
          disabled={!dirty}
          className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors disabled:opacity-30"
        >
          <Check className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}