import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CampaignBasicsFields({ form, setField }) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 p-4">
      <div><h3 className="font-bold text-slate-900">Informations principales</h3><p className="text-xs text-slate-500">Présente clairement la campagne et sa rémunération.</p></div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2"><Label htmlFor="c_name">Nom de la campagne</Label><Input id="c_name" value={form.name} onChange={setField("name")} required placeholder="Summer Drop 2026" /></div>
        <div className="space-y-2"><Label htmlFor="c_brand">Marque</Label><Input id="c_brand" value={form.brand} onChange={setField("brand")} required placeholder="Ma Marque" /></div>
        <div className="space-y-2"><Label htmlFor="c_category">Catégorie</Label><Input id="c_category" value={form.category} onChange={setField("category")} placeholder="Mode, Tech, Gaming..." /></div>
        <div className="space-y-2"><Label htmlFor="c_rate">Taux ($ / 1K vues)</Label><Input id="c_rate" type="number" step="0.01" min="0.01" value={form.rate} onChange={setField("rate")} required placeholder="0.50" /></div>
        <div className="space-y-2"><Label htmlFor="c_budget">Budget total</Label><Input id="c_budget" value={form.budget} onChange={setField("budget")} required placeholder="10 000 $" /></div>
        <div className="space-y-2"><Label htmlFor="c_max">Maximum par vidéo</Label><Input id="c_max" value={form.maxPerVideo} onChange={setField("maxPerVideo")} required placeholder="500 $" /></div>
      </div>
      <div className="space-y-2"><Label htmlFor="c_desc">Description de la campagne</Label><Textarea id="c_desc" value={form.description} onChange={setField("description")} required rows={4} placeholder="Explique l'objectif, le produit et le type de contenu attendu..." /></div>
    </section>
  );
}