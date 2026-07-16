import React from "react";
import { Wallet, Clock, Eye, Video } from "lucide-react";

export default function StatsCards({ stats }) {
  const cards = [
    { icon: Wallet, label: "Gains totaux", value: stats.total.toLocaleString("fr-FR") + " €", accent: true },
    { icon: Clock, label: "En attente", value: stats.pending.toLocaleString("fr-FR") + " $" },
    { icon: Eye, label: "Vues totales", value: stats.views.toLocaleString("fr-FR") },
    { icon: Video, label: "Vidéos soumises", value: stats.videos },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ icon: Icon, label, value, accent }) => (
        <div
          key={label}
          className={`rounded-3xl p-6 ring-1 ${accent ? "bg-gradient-to-br from-[#F87171] to-[#DC2626] text-white ring-transparent shadow-lg shadow-red-500/25" : "bg-white ring-slate-100 shadow-sm"}`}
        >
          <Icon className={`w-5 h-5 mb-3 ${accent ? "text-white/80" : "text-[#DC2626]"}`} />
          <p className={`text-2xl font-extrabold font-mono ${accent ? "" : "text-slate-900"}`}>{value}</p>
          <p className={`text-xs mt-1 font-semibold ${accent ? "text-white/70" : "text-slate-400"}`}>{label}</p>
        </div>
      ))}
    </div>
  );
}