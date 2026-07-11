import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sparkles, Bell } from "lucide-react";

export default function ProfilePrefsCard({ form, set, toggle }) {
  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-5 h-5 text-[#DC2626]" />
        <h2 className="font-extrabold text-slate-900">Profil créateur</h2>
      </div>
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="content_type">Type de contenu</Label>
            <Input id="content_type" value={form.content_type} onChange={set("content_type")} placeholder="Ex : Lifestyle, Tech..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="niche">Niche</Label>
            <Input id="niche" value={form.niche} onChange={set("niche")} placeholder="Ex : Beauté, Gaming..." />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Notifications</p>
              <p className="text-xs text-slate-400">Recevoir les alertes de campagnes et paiements</p>
            </div>
          </div>
          <Switch checked={form.notifications} onCheckedChange={() => toggle("notifications")} />
        </div>
      </div>
    </div>
  );
}