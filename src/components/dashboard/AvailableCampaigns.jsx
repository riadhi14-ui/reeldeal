import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { campaigns } from "@/lib/campaignsData";

export default function AvailableCampaigns({ participations }) {
  const joinedIds = new Set(participations.map((p) => p.campaign_id));
  const available = campaigns.filter((c) => !joinedIds.has(c.id));

  if (available.length === 0) {
    return (
      <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-8 text-center">
        <p className="text-sm text-slate-500">Tu as rejoint toutes les campagnes disponibles 🎉</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {available.map((c) => (
        <Link
          key={c.id}
          to={`/campaign/${c.id}`}
          className="group flex items-center gap-4 rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm hover:shadow-lg hover:shadow-red-500/10 transition-all p-4"
        >
          <img src={c.img} alt={c.name} className="w-16 h-16 rounded-2xl object-cover" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900 truncate">{c.name}</p>
            <p className="text-xs text-slate-400">{c.brand}</p>
            <p className="mt-1 text-xs font-extrabold text-[#DC2626] font-mono">{c.rate?.toFixed(2)} $/1K vues</p>
          </div>
          <span className="shrink-0 w-9 h-9 rounded-full bg-red-50 text-[#DC2626] flex items-center justify-center group-hover:bg-[#EF4444] group-hover:text-white transition-colors">
            <Plus className="w-4 h-4" />
          </span>
        </Link>
      ))}
    </div>
  );
}