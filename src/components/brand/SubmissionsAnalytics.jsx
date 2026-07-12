import React from "react";
import { Eye, Video, DollarSign, TrendingUp } from "lucide-react";

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-5">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${accent}`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-2xl font-extrabold text-slate-900 font-mono">{value}</p>
      <p className="text-xs text-slate-400 mt-0.5">{label}</p>
    </div>
  );
}

export default function SubmissionsAnalytics({ submissions }) {
  const approved = submissions.filter((s) => s.status === "approved");
  const totalViews = approved.reduce((sum, s) => sum + (s.views || 0), 0);
  const totalSpent = approved.reduce((sum, s) => sum + (s.earnings || 0), 0);
  const avgViews = approved.length ? Math.round(totalViews / approved.length) : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard icon={Eye} label="Vues totales" value={totalViews.toLocaleString("fr-FR")} accent="bg-blue-50 text-blue-600" />
      <StatCard icon={Video} label="Vidéos validées" value={approved.length} accent="bg-red-50 text-[#DC2626]" />
      <StatCard icon={TrendingUp} label="Vues moy. / vidéo" value={avgViews.toLocaleString("fr-FR")} accent="bg-amber-50 text-amber-600" />
      <StatCard icon={DollarSign} label="Budget dépensé" value={`$${totalSpent.toLocaleString("fr-FR")}`} accent="bg-emerald-50 text-emerald-600" />
    </div>
  );
}