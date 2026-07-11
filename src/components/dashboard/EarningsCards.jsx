import React from "react";
import { Wallet, CheckCircle2, Clock, Eye } from "lucide-react";

export default function EarningsCards({ available, withdrawn, pending, views }) {
  const cards = [
    { icon: Wallet, label: "Solde retirable", value: `$${available.toFixed(2)}`, hint: "Paiement instantané", accent: true },
    { icon: CheckCircle2, label: "Déjà retiré", value: `$${withdrawn.toFixed(2)}`, hint: "Transferts réussis" },
    { icon: Clock, label: "En attente", value: `$${pending.toFixed(2)}`, hint: "En cours de validation" },
    { icon: Eye, label: "Vues totales générées", value: views.toLocaleString("fr-FR"), hint: "Mise à jour en direct" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ icon: Icon, label, value, hint, accent }) => (
        <div
          key={label}
          className={`rounded-3xl p-6 ring-1 ${accent ? "bg-gradient-to-br from-[#F87171] to-[#DC2626] text-white ring-transparent shadow-lg shadow-red-500/25" : "bg-white ring-slate-100 shadow-sm"}`}
        >
          <p className={`text-[11px] font-bold uppercase tracking-widest mb-2 ${accent ? "text-white/70" : "text-slate-400"}`}>{label}</p>
          <p className={`text-3xl font-extrabold font-mono ${accent ? "" : "text-slate-900"}`}>{value}</p>
          <div className={`flex items-center gap-1.5 mt-3 text-xs font-semibold ${accent ? "text-white/80" : "text-slate-500"}`}>
            <Icon className="w-3.5 h-3.5" /> {hint}
          </div>
        </div>
      ))}
    </div>
  );
}