import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRound, CheckCircle2 } from "lucide-react";

export default function AccountInfoCard({ form, set, email }) {
  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <UserRound className="w-5 h-5 text-[#DC2626]" />
        <h2 className="font-extrabold text-slate-900">Informations</h2>
      </div>
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">Prénom</Label>
            <Input id="first_name" value={form.first_name} onChange={set("first_name")} placeholder="Prénom" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Nom</Label>
            <Input id="last_name" value={form.last_name} onChange={set("last_name")} placeholder="Nom" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Numéro de téléphone</Label>
          <Input id="phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="+33 6 12 34 56 78" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>E-mail</Label>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" /> Vérifié
            </span>
          </div>
          <Input value={email} disabled className="bg-slate-50" />
          <p className="text-xs text-slate-400">Contacte le support pour changer ton email.</p>
        </div>
      </div>
    </div>
  );
}