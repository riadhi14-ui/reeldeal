import React from "react";
import { useNavigate } from "react-router-dom";
import { Video, MessageCircle, Briefcase, ArrowRight } from "lucide-react";

export default function BrandQuickActions({ pendingCount, campaignCount }) {
  const navigate = useNavigate();
  const actions = [
    { icon: Video, label: "Valider les vidéos", hint: `${pendingCount} en attente`, to: "/brand/submissions" },
    { icon: Briefcase, label: "Mes campagnes", hint: `${campaignCount} au total`, to: "/brand/campaigns" },
    { icon: MessageCircle, label: "Répondre aux créateurs", hint: "Messagerie", to: "/brand/messages" },
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {actions.map(({ icon: Icon, label, hint, to }) => (
        <button
          key={to}
          onClick={() => navigate(to)}
          className="group flex items-center gap-3 rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm hover:shadow-md hover:ring-[#EF4444]/30 transition-all p-4 text-left"
        >
          <span className="w-10 h-10 rounded-2xl bg-red-50 text-[#DC2626] flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900 truncate">{label}</p>
            <p className="text-xs text-slate-400">{hint}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#DC2626] group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>
      ))}
    </div>
  );
}