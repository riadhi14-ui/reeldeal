import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserRound } from "lucide-react";

export default function PersonalCard({ form, set, email }) {
  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <UserRound className="w-5 h-5 text-[#DC2626]" />
        <h2 className="font-extrabold text-slate-900">Infos personnelles</h2>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={email} disabled className="bg-slate-50" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="display_name">Nom d'affichage</Label>
          <Input id="display_name" value={form.display_name} onChange={set("display_name")} placeholder="Ton nom de créateur" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" value={form.bio} onChange={set("bio")} rows={3} placeholder="Parle-nous de toi et de ton contenu..." />
        </div>
      </div>
    </div>
  );
}