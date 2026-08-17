import React from "react";
import { Users, ShieldCheck } from "lucide-react";

const avatars = [
  { top: "2%", left: "8%", size: "w-10 h-10", grad: "from-red-300 to-red-500" },
  { top: "0%", left: "42%", size: "w-9 h-9", grad: "from-orange-300 to-pink-400" },
  { top: "10%", left: "78%", size: "w-11 h-11", grad: "from-rose-300 to-red-500" },
  { top: "26%", left: "2%", size: "w-8 h-8", grad: "from-amber-300 to-orange-400" },
  { top: "34%", left: "90%", size: "w-9 h-9", grad: "from-pink-300 to-rose-500" },
  { top: "58%", left: "0%", size: "w-9 h-9", grad: "from-red-400 to-rose-600" },
  { top: "66%", left: "86%", size: "w-10 h-10", grad: "from-orange-300 to-red-400" },
  { top: "82%", left: "14%", size: "w-8 h-8", grad: "from-rose-300 to-pink-500" },
  { top: "88%", left: "58%", size: "w-9 h-9", grad: "from-red-300 to-orange-400" },
  { top: "78%", left: "40%", size: "w-7 h-7", grad: "from-pink-400 to-red-500" },
];

export default function BrandMockup() {
  return (
    <div className="relative w-full max-w-[480px] mx-auto h-[440px]">
      {/* Floating creator avatars */}
      {avatars.map((a, i) => (
        <div
          key={i}
          className={`absolute ${a.size} rounded-full bg-gradient-to-br ${a.grad} ring-4 ring-white shadow-lg`}
          style={{ top: a.top, left: a.left }}
        />
      ))}

      {/* Live campaigns badge */}
      <div className="absolute top-[14%] left-[6%] flex items-center gap-1.5 bg-white rounded-full pl-2 pr-3 py-1.5 shadow-lg ring-1 ring-slate-100 text-[11px] font-bold text-slate-700">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        23 campagnes en direct
      </div>

      {/* Central stat card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-72 rounded-3xl bg-white shadow-2xl shadow-slate-900/15 ring-1 ring-slate-100 p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
              <Users className="w-4 h-4 text-[#DC2626]" />
            </span>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Votre réseau de créateurs</p>
          </div>
          <p className="text-4xl font-extrabold text-slate-900 tracking-tight">7 340+</p>
          <p className="text-xs text-slate-400 mt-1">créateurs prêts à promouvoir votre marque</p>

          <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-slate-100">
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Portée</p>
              <p className="text-sm font-extrabold text-slate-900 mt-0.5">52,8M</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Versé</p>
              <p className="text-sm font-extrabold text-emerald-600 mt-0.5">61 450 €</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Vidéos</p>
              <p className="text-sm font-extrabold text-slate-900 mt-0.5">4 918</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white rounded-2xl px-4 py-2.5 shadow-lg ring-1 ring-slate-100">
        <ShieldCheck className="w-4 h-4 text-[#DC2626] shrink-0" />
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Approuvé par</span>
        <div className="flex items-center -space-x-1.5">
          {["A", "B", "N", "K"].map((l, i) => (
            <span key={i} className="w-5 h-5 rounded-full bg-slate-800 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">{l}</span>
          ))}
        </div>
        <span className="text-[10px] font-bold text-slate-700">+210 marques</span>
      </div>
    </div>
  );
}