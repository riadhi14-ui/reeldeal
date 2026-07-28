import React from "react";
import { Video, Eye, BadgeCheck, Hourglass } from "lucide-react";

export default function SubmissionsSummary({ submissions, payments, pendingValue }) {
  const totalViews = submissions.reduce((sum, s) => sum + (s.views || 0), 0);
  const paidViews = payments.reduce((sum, p) => sum + (p.views_paid || 0), 0);
  const cards = [
    { icon: Video, label: "Vidéos envoyées", value: String(submissions.length) },
    { icon: Eye, label: "Vues cumulées", value: totalViews.toLocaleString("fr-FR") },
    { icon: BadgeCheck, label: "Vues rémunérées", value: paidViews.toLocaleString("fr-FR") },
    { icon: Hourglass, label: "En attente de paiement", value: `${pendingValue.toFixed(2)} €` },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map(({ icon: Icon, label, value }) => (
        <div key={label} className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-5">
          <Icon className="w-4 h-4 text-[#DC2626] mb-2" />
          <p className="text-xl font-extrabold text-slate-900 font-mono">{value}</p>
          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}