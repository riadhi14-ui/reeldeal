import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, XCircle } from "lucide-react";

export default function CampaignGuidelinesFields({ form, setField }) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 p-4">
      <div><h3 className="font-bold text-slate-900">Consignes de création</h3><p className="text-xs text-slate-500">Écris une consigne par ligne pour éviter toute ambiguïté.</p></div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="c_dos" className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="w-4 h-4" /> À faire</Label>
          <Textarea id="c_dos" value={form.dos} onChange={setField("dos")} rows={6} placeholder={"Montrer le produit dès le début\nFilmer au format vertical 9:16\nMentionner la marque à l'oral"} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c_donts" className="flex items-center gap-2 text-red-600"><XCircle className="w-4 h-4" /> À ne pas faire</Label>
          <Textarea id="c_donts" value={form.donts} onChange={setField("donts")} rows={6} placeholder={"Ne pas dénigrer la marque\nNe pas montrer de concurrent\nNe pas faire de fausse promesse"} />
        </div>
      </div>
    </section>
  );
}