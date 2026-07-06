import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";

const PLATFORMS = ["TikTok", "Instagram Reels", "YouTube Shorts"];

export default function SubmitVideoDialog({ participations, onSubmitted }) {
  const [open, setOpen] = useState(false);
  const [campaignId, setCampaignId] = useState("");
  const [platform, setPlatform] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const part = participations.find((p) => p.campaign_id === campaignId);
    if (!part || !platform) {
      setError("Choisis une campagne et une plateforme.");
      return;
    }
    setLoading(true);
    try {
      await base44.entities.Submission.create({
        campaign_id: part.campaign_id,
        campaign_name: part.campaign_name,
        platform,
        video_url: videoUrl,
        status: "pending",
        views: 0,
        earnings: 0,
      });
      setOpen(false);
      setCampaignId(""); setPlatform(""); setVideoUrl("");
      onSubmitted();
    } catch (err) {
      setError(err.message || "Échec de la soumission");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="h-11 px-6 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold shadow-lg shadow-red-500/25 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Soumettre une vidéo
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle>Soumettre une vidéo</DialogTitle>
        </DialogHeader>
        {participations.length === 0 ? (
          <p className="text-sm text-slate-500">Rejoins d'abord une campagne pour pouvoir soumettre une vidéo.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>}
            <div className="space-y-2">
              <Label>Campagne</Label>
              <Select value={campaignId} onValueChange={setCampaignId}>
                <SelectTrigger><SelectValue placeholder="Choisis une campagne" /></SelectTrigger>
                <SelectContent>
                  {participations.map((p) => (
                    <SelectItem key={p.id} value={p.campaign_id}>{p.campaign_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Plateforme</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger><SelectValue placeholder="Choisis une plateforme" /></SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="video_url">Lien de la vidéo</Label>
              <Input id="video_url" type="url" placeholder="https://www.tiktok.com/..." value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required />
            </div>
            <button type="submit" disabled={loading} className="w-full h-11 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi...</> : "Soumettre pour validation"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}