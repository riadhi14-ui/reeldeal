import React from "react";
import { ArrowLeft, User, ExternalLink, Heart, MessageCircle, Eye, FileText, Video } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const DEFAULT_CHART = [
  { day: "7 juil.", views: 5000 },
  { day: "8 juil.", views: 42000 },
  { day: "9 juil.", views: 138000 },
  { day: "10 juil.", views: 210000 },
  { day: "11 juil.", views: 248100 },
];

export default function ScenarioDetail({ scenario, onBack }) {
  const chart = scenario.chart?.length ? scenario.chart : DEFAULT_CHART;
  const likes = scenario.likes || "2,6K";
  const comments = scenario.comments || "111";
  const viewsFull = scenario.viewsFull || scenario.views;

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 pb-4 border-b border-slate-100 shrink-0">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-4">
          <ArrowLeft className="w-4 h-4" /> Tous les scénarios
        </button>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
            {scenario.avatar ? <img src={scenario.avatar} alt={scenario.handle} className="w-full h-full object-cover" /> : <User className="w-4 h-4 text-slate-400" />}
          </div>
          <p className="font-extrabold text-slate-900">{scenario.handle.replace("@", "")}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Vidéo + stats */}
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-[9/16]">
          {scenario.videoUrl ? (
            <video src={scenario.videoUrl} controls poster={scenario.thumb} className="w-full h-full object-cover" />
          ) : (
            <>
              <img src={scenario.thumb || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=80"} alt={scenario.handle} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <Video className="w-6 h-6 text-[#DC2626]" />
                </span>
              </div>
            </>
          )}
          <div className="absolute right-3 bottom-4 flex flex-col items-center gap-3 text-white">
            <div className="flex flex-col items-center">
              <Heart className="w-6 h-6 fill-white" />
              <span className="text-xs font-bold mt-0.5">{likes}</span>
            </div>
            <div className="flex flex-col items-center">
              <MessageCircle className="w-6 h-6 fill-white" />
              <span className="text-xs font-bold mt-0.5">{comments}</span>
            </div>
            <div className="flex flex-col items-center">
              <Eye className="w-6 h-6" />
              <span className="text-xs font-bold mt-0.5">{viewsFull}</span>
            </div>
          </div>
        </div>

        {scenario.socialUrl && (
          <a href={scenario.socialUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-sm font-semibold text-[#DC2626] hover:underline">
            <ExternalLink className="w-4 h-4" /> Ouvrir la publication
          </a>
        )}

        {/* Script */}
        <div className="rounded-2xl ring-1 ring-slate-100 p-5">
          <p className="flex items-center gap-2 font-bold text-slate-900 mb-3"><FileText className="w-4 h-4 text-[#DC2626]" /> Scénario</p>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{scenario.script}</p>
        </div>

        {/* Statistiques */}
        <div className="rounded-2xl ring-1 ring-slate-100 p-5">
          <div className="flex items-center justify-between mb-4 text-xs">
            <div className="text-center">
              <p className="text-slate-400">Vues</p>
              <p className="font-extrabold text-slate-900">{viewsFull}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400">tr/min</p>
              <p className="font-extrabold text-slate-900">1,00 $</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400">Total</p>
              <p className="font-extrabold text-green-600">{scenario.earnings}</p>
            </div>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(v) => [`${v.toLocaleString()} vues`, ""]} />
                <Area type="monotone" dataKey="views" stroke="#EF4444" strokeWidth={2} fill="url(#viewsGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-5 mt-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600"><Eye className="w-4 h-4 text-[#DC2626]" /> <b>{viewsFull}</b> vues</span>
            <span className="flex items-center gap-1.5 text-slate-600"><Heart className="w-4 h-4 text-[#DC2626]" /> <b>{likes}</b> likes</span>
            <span className="flex items-center gap-1.5 text-slate-600"><MessageCircle className="w-4 h-4 text-[#DC2626]" /> <b>{comments}</b></span>
          </div>
        </div>
      </div>

      <div className="p-5 border-t border-slate-100 shrink-0">
        <a
          href={scenario.contentUrl || "https://www.tiktok.com/upload"}
          target="_blank"
          rel="noreferrer"
          className="w-full h-12 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold shadow-lg shadow-red-500/25 transition-colors flex items-center justify-center gap-2"
        >
          <Video className="w-4 h-4" /> Refaire cette vidéo
        </a>
      </div>
    </div>
  );
}