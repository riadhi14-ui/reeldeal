import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus, Save } from "lucide-react";
import CampaignBasicsFields from "@/components/brand/CampaignBasicsFields";
import CampaignGuidelinesFields from "@/components/brand/CampaignGuidelinesFields";
import CampaignMediaFields from "@/components/brand/CampaignMediaFields";

const PLATFORMS = ["TikTok", "Instagram Reels", "YouTube Shorts"];
const EMPTY = { name: "", brand: "", category: "", rate: "", budget: "", maxPerVideo: "", description: "", dos: "", donts: "", img: "", exampleVideos: [] };
const lines = (value) => value.split("\n").map((line) => line.trim()).filter(Boolean);

export default function CreateCampaignDialog({ onCreated, campaign = null, open: controlledOpen, onOpenChange }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY);
  const [platforms, setPlatforms] = useState(["TikTok"]);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  useEffect(() => {
    if (!open) return;
    setForm(campaign ? {
      name: campaign.name || "", brand: campaign.brand || "", category: campaign.category || "", rate: campaign.rate ?? "", budget: campaign.budget || "", maxPerVideo: campaign.maxPerVideo || "", description: campaign.description || "",
      dos: (campaign.do_list || campaign.brief || []).join("\n"), donts: (campaign.dont_list || []).join("\n"), img: campaign.img || "", exampleVideos: campaign.example_videos || [],
    } : EMPTY);
    setPlatforms(campaign?.platforms?.length ? campaign.platforms : ["TikTok"]);
    setError("");
  }, [open, campaign]);

  const setField = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const togglePlatform = (platform) => setPlatforms((current) => current.includes(platform) ? current.filter((item) => item !== platform) : [...current, platform]);
  const save = async (status) => {
    setError("");
    if (!form.name.trim()) return setError("Ajoute au moins un nom à la campagne.");
    if (status === "pending" && (!form.brand.trim() || !form.rate || !form.description.trim() || !form.budget.trim() || !form.maxPerVideo.trim() || platforms.length === 0)) return setError("Complète les informations principales et choisis au moins une plateforme avant de publier.");
    setLoading(true);
    const data = { name: form.name, brand: form.brand, category: form.category || "Autre", rate: Number(form.rate) || 0, budget: form.budget, maxPerVideo: form.maxPerVideo, platforms, description: form.description, brief: lines(form.dos), do_list: lines(form.dos), dont_list: lines(form.donts), img: form.img, example_videos: form.exampleVideos, status };
    try {
      if (campaign?.id) await base44.entities.Campaign.update(campaign.id, data);
      else await base44.entities.Campaign.create(data);
      setOpen(false); await onCreated?.();
    } catch (err) { setError(err.message || "Échec de l'enregistrement"); }
    finally { setLoading(false); }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!campaign && <DialogTrigger asChild><button className="h-11 px-6 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold shadow-lg shadow-red-500/25 flex items-center gap-2"><Plus className="w-4 h-4" /> Créer une campagne</button></DialogTrigger>}
      <DialogContent className="sm:max-w-3xl rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{campaign ? "Reprendre le brouillon" : "Créer une campagne"}</DialogTitle></DialogHeader>
        <form onSubmit={(event) => { event.preventDefault(); save(campaign?.status === "active" ? "active" : "pending"); }} className="space-y-5">
          {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>}
          <CampaignBasicsFields form={form} setField={setField} />
          <section className="space-y-3 rounded-2xl border border-slate-200 p-4"><div><h3 className="font-bold text-slate-900">Plateformes de diffusion</h3><p className="text-xs text-slate-500">Sélectionne toutes les plateformes autorisées.</p></div><div className="flex flex-wrap gap-2">{PLATFORMS.map((platform) => <button key={platform} type="button" onClick={() => togglePlatform(platform)} className={`h-9 px-4 rounded-full text-xs font-bold ${platforms.includes(platform) ? "bg-[#EF4444] text-white" : "bg-slate-100 text-slate-600"}`}>{platform}</button>)}</div></section>
          <CampaignGuidelinesFields form={form} setField={setField} />
          <CampaignMediaFields image={form.img} videos={form.exampleVideos} onImage={(img) => setForm((current) => ({ ...current, img }))} onVideos={(exampleVideos) => setForm((current) => ({ ...current, exampleVideos }))} onUploading={setUploading} onError={setError} />
          <div className="sticky bottom-0 flex flex-col sm:flex-row gap-3 bg-white pt-3">
            <button type="button" onClick={() => save("draft")} disabled={loading || uploading} className="flex-1 h-11 rounded-full bg-slate-100 text-slate-700 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60"><Save className="w-4 h-4" /> Enregistrer le brouillon</button>
            <button type="submit" disabled={loading || uploading} className="flex-1 h-11 rounded-full bg-[#EF4444] text-white text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60">{loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Enregistrement...</> : campaign?.status === "active" ? "Enregistrer les modifications" : "Soumettre pour validation"}</button>
          </div>
          {campaign?.status !== "active" && <p className="text-xs text-slate-400 text-center">Ta campagne sera examinée par la plateforme avant d'être mise en ligne.</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}