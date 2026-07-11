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
          className={`relative overflow-hidden rounded-3xl p-6 ring-1 transition-all ${accent ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white ring-transparent shadow-lg" : "bg-white ring-slate-100 shadow-sm hover:shadow-md"}`}
        >
          {accent && <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-[#EF4444]/20 blur-2xl" />}
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${accent ? "bg-white/10" : "bg-red-50"}`}>
            <Icon className={`w-5 h-5 ${accent ? "text-[#F87171]" : "text-[#DC2626]"}`} />
          </div>
          <p className={`text-3xl font-extrabold font-mono leading-none ${accent ? "" : "text-slate-900"}`}>{value}</p>
          <p className={`text-xs mt-2 font-semibold ${accent ? "text-white/60" : "text-slate-400"}`}>{label}</p>
        </div>
      ))}
    </div>
  );
}