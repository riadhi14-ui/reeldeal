import React from "react";
import { TrendingUp, Users, Eye, PlayCircle } from "lucide-react";

export default function BrandMockup() {
  return (
    <div className="relative w-full max-w-[440px] mx-auto">
      <div className="rounded-3xl bg-white shadow-2xl shadow-slate-900/15 ring-1 ring-slate-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm font-bold text-slate-900">Tableau de bord</p>
            <p className="text-xs text-slate-400">Game Launch Hype</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">● En ligne</span>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { icon: Eye, label: "Vues", value: "2,4M" },
            { icon: PlayCircle, label: "Vidéos", value: "184" },
            { icon: Users, label: "Créateurs", value: "67" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl bg-slate-50 p-3">
              <Icon className="w-4 h-4 text-[#DC2626] mb-1.5" />
              <p className="text-lg font-extrabold text-slate-900 leading-none">{value}</p>
              <p className="text-[10px] text-slate-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-slate-900 p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] opacity-60">Portée totale cette semaine</p>
              <p className="text-2xl font-extrabold">+412K</p>
            </div>
            <TrendingUp className="w-8 h-8 text-[#F87171]" />
          </div>
          <div className="flex items-end gap-1.5 h-14 mt-3">
            {[30, 45, 38, 60, 52, 78, 100].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-[#DC2626] to-[#F87171]" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -right-3 -top-4 rounded-2xl bg-gradient-to-br from-[#F87171] to-[#DC2626] text-white px-4 py-3 shadow-xl shadow-red-500/40 rotate-[6deg]">
        <p className="text-[9px] opacity-80">CPM moyen</p>
        <p className="text-xl font-extrabold">$1.20</p>
      </div>
    </div>
  );
}