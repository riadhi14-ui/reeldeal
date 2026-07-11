import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { CheckCircle2, Link2, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import ScenariosSheet from "@/components/campaign/ScenariosSheet";

export default function JoinedActions({ campaign, onSubmitted }) {
  const [videoUrl, setVideoUrl] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [scenariosOpen, setScenariosOpen] = useState(false);

  const handleSubmit = async () => {
    if (!videoUrl.trim()) return;
    setSubmitting(true);
    await base44.entities.Submission.create({
      campaign_id: campaign.id,
      campaign_name: campaign.name,
      platform,
      video_url: videoUrl.trim(),
    });
    setSubmitting(false);
    setDone(true);
    setVideoUrl("");
    onSubmitted?.();
  };

  return (
    <div className="mt-8 rounded-3xl ring-1 ring-slate-100 bg-slate-50/60 p-6">
      <div className="flex items-center gap-2 text-[#DC2626] font-bold text-sm mb-1">
        <CheckCircle2 className="w-4 h-4" /> Tu participes déjà à cette campagne
      </div>
      <h3 className="text-lg font-extrabold text-slate-900 mb-4">Soumets ta vidéo</h3>

      {done ? (
        <div className="flex items-center gap-2 rounded-2xl bg-green-50 text-green-700 px-4 py-3 text-sm font-semibold mb-4">
          <CheckCircle2 className="w-4 h-4" /> Vidéo envoyée ! Elle sera validée par la marque.
        </div>
      ) : null}

      <div className="grid sm:grid-cols-[140px_1fr] gap-3">
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="TikTok">TikTok</SelectItem>
            <SelectItem value="Instagram Reels">Instagram Reels</SelectItem>
            <SelectItem value="YouTube Shorts">YouTube Shorts</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative">
          <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={videoUrl}
            onChange={(e) => { setVideoUrl(e.target.value); setDone(false); }}
            placeholder="Colle le lien de ta vidéo..."
            className="bg-white pl-9"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSubmit}
          disabled={submitting || !videoUrl.trim()}
          className="inline-flex h-12 px-6 items-center justify-center gap-2 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold shadow-lg shadow-red-500/25 transition-colors disabled:opacity-50"
        >
          {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi...</> : "Soumettre le lien"}
        </button>
        <button
          onClick={() => setScenariosOpen(true)}
          className="inline-flex h-12 px-6 items-center justify-center gap-2 rounded-full bg-white ring-1 ring-slate-200 hover:ring-[#EF4444] text-slate-700 hover:text-[#DC2626] font-bold transition-colors"
        >
          <Sparkles className="w-4 h-4" /> Créer du contenu
        </button>
      </div>

      <ScenariosSheet open={scenariosOpen} onOpenChange={setScenariosOpen} campaign={campaign} />
    </div>
  );
}