import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus } from "lucide-react";

const PLATFORMS = ["TikTok", "Instagram Reels", "YouTube Shorts"];
const DEFAULT_IMG = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=800&fit=crop";

export default function CreateCampaignDialog({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", brand: "", category: "", rate: "", budget: "", maxPerVideo: "", description: "", brief: "", img: "",
  });
  const [platforms, setPlatforms] = useState(["TikTok"]);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const togglePlatform = (p) =>
    setPlatforms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (platforms.length === 0) {
      setError("Choisis au moins une plateforme.");
      return;
    }
    setLoading(true);
    try {
      await base44.entities.Campaign.create({
        name: form.name,
        brand: form.brand,
        category: form.category || "Autre",
        rate: Number(form.rate),
        budget: form.budget,
        maxPerVideo: form.maxPerVideo,
        platforms,
        description: form.description,
        brief: form.brief.split("\n").map((l) => l.trim()).filter(Boolean),
        img: form.img || DEFAULT_IMG,
        status: "active",
      });
      setOpen(false);
      setForm({ name: "", brand: "", category: "", rate: "", budget: "", maxPerVideo: "", description: "", brief: "", img: "" });
      setPlatforms(["TikTok"]);
      onCreated();
    } catch (err) {
      setError(err.message || "Échec de la création");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="h-11 px-6 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold shadow-lg shadow-red-500/25 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Créer une campagne
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer une campagne</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="c_name">Nom de la campagne</Label>
              <Input id="c_name" value={form.name} onChange={set("name")} required placeholder="Summer Drop 2026" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c_brand">Marque</Label>
              <Input id="c_brand" value={form.brand} onChange={set("brand")} required placeholder="Ma Marque" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c_category">Catégorie</Label>
              <Input id="c_category" value={form.category} onChange={set("category")} placeholder="Mode, Tech, Gaming..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c_rate">Taux ($ / 1K vues)</Label>
              <Input id="c_rate" type="number" step="0.01" min="0.01" value={form.rate} onChange={set("rate")} required placeholder="0.50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c_budget">Budget total</Label>
              <Input id="c_budget" value={form.budget} onChange={set("budget")} required placeholder="10 000 $" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c_max">Max par vidéo</Label>
              <Input id="c_max" value={form.maxPerVideo} onChange={set("maxPerVideo")} required placeholder="500 $" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Plateformes</Label>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlatform(p)}
                  className={`h-9 px-4 rounded-full text-xs font-bold transition-colors ${platforms.includes(p) ? "bg-[#EF4444] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="c_desc">Description</Label>
            <Textarea id="c_desc" value={form.description} onChange={set("description")} required rows={3} placeholder="Décris ce que les créateurs doivent produire..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c_brief">Brief (une consigne par ligne)</Label>
            <Textarea id="c_brief" value={form.brief} onChange={set("brief")} rows={4} placeholder={"Format vertical 9:16\nMentionne la marque à l'oral\nDurée 20 à 60 secondes"} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c_img">Image (URL, optionnel)</Label>
            <Input id="c_img" type="url" value={form.img} onChange={set("img")} placeholder="https://..." />
          </div>
          <button type="submit" disabled={loading} className="w-full h-11 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Création...</> : "Publier la campagne"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}