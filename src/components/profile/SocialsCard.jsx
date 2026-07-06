import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2 } from "lucide-react";

export default function SocialsCard({ form, set }) {
  const fields = [
    { key: "tiktok", label: "TikTok", placeholder: "@tonpseudo" },
    { key: "instagram", label: "Instagram", placeholder: "@tonpseudo" },
    { key: "youtube", label: "YouTube", placeholder: "@tachaine" },
  ];

  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <Share2 className="w-5 h-5 text-[#DC2626]" />
        <h2 className="font-extrabold text-slate-900">Réseaux sociaux</h2>
      </div>
      <div className="space-y-4">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{label}</Label>
            <Input id={key} value={form[key]} onChange={set(key)} placeholder={placeholder} />
          </div>
        ))}
      </div>
    </div>
  );
}