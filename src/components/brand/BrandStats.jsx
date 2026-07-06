import React from "react";
import { Eye, Video, Users, Wallet } from "lucide-react";

export default function BrandStats({ stats }) {
  const cards = [
    { icon: Eye, label: "Vues totales", value: stats.views.toLocaleString("fr-FR"), accent: true },
    { icon: Video, label: "Vidéos reçues", value: stats.videos },
    { icon: Users, label: "Créateurs", value: stats.creators },
    { icon: Wallet, label: "Dépensé", value: stats.spent.toLocaleString("fr-FR") + " $" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ icon: Icon, label, value, accent }) => (
        <div
          key={label}
          className={`rounded-3xl p-6 ring-1 ${accent ? "bg-slate-900 text-white ring-transparent shadow-lg" : "bg-white ring-slate-100 shadow-sm"}`}
        >
          <Icon className={`w-5 h-5 mb-3 ${accent ? "text-[#F87171]" : "text-[#DC2626]"}`} />
          <p className={`text-2xl font-extrabold font-mono ${accent ? "" : "text-slate-900"}`}>{value}</p>
          <p className={`text-xs mt-1 font-semibold ${accent ? "text-white/60" : "text-slate-400"}`}>{label}</p>
        </div>
      ))}
    </div>
  );
}