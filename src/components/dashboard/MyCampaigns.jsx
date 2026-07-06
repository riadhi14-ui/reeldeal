import React from "react";
import { Link } from "react-router-dom";

export default function MyCampaigns({ participations }) {
  if (participations.length === 0) {
    return (
      <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-10 text-center">
        <p className="font-bold text-slate-900">Tu n'as encore rejoint aucune campagne</p>
        <p className="text-sm text-slate-500 mt-1">Parcours les campagnes actives et rejoins celle qui te correspond.</p>
        <Link to="/campaigns" className="inline-flex mt-6 h-11 px-6 items-center rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold shadow-lg shadow-red-500/25 transition-colors">
          Parcourir les campagnes
        </Link>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {participations.map((p) => (
        <Link
          key={p.id}
          to={`/campaign/${p.campaign_id}`}
          className="group flex items-center gap-4 rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm hover:shadow-lg hover:shadow-red-500/10 transition-all p-4"
        >
          <img src={p.img} alt={p.campaign_name} className="w-16 h-16 rounded-2xl object-cover" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900 truncate">{p.campaign_name}</p>
            <p className="text-xs text-slate-400">{p.brand}</p>
            <p className="mt-1 text-xs font-extrabold text-[#DC2626] font-mono">{p.rate?.toFixed(2)} $/1K vues</p>
          </div>
        </Link>
      ))}
    </div>
  );
}