import React, { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

const PROMOTE_RATE = 2.0;
const platforms = [
  { name: "TikTok Creator Fund", rate: 0.6 },
  { name: "YouTube Shorts", rate: 0.1 },
  { name: "Instagram Reels", rate: 0.2 },
];

const fmt = (n) => Math.round(n).toLocaleString("fr-FR") + " €";
const fmtViews = (n) => (n >= 1000000 ? (n / 1000000).toFixed(1) + "M" : n >= 1000 ? Math.round(n / 1000) + "K" : n);

export default function Estimator() {
  const [views, setViews] = useState(50000);
  const monthly = (views / 1000) * PROMOTE_RATE;

  return (
    <section className="py-32 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold text-[#DC2626] uppercase tracking-widest mb-3">Simulateur de gains</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Combien peux-tu gagner ?</h2>
          <p className="mt-4 text-lg text-slate-500">Fais glisser le curseur pour estimer tes gains selon les performances de ton contenu.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Panneau curseur */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm ring-1 ring-slate-100"
          >
            <div className="flex justify-between items-baseline mb-6">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Vues mensuelles</p>
              <p className="text-3xl font-extrabold text-slate-900 font-mono">{views.toLocaleString("fr-FR")}</p>
            </div>
            <Slider value={[views]} min={1000} max={500000} step={1000} onValueChange={([v]) => setViews(v)} className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:border-[#EF4444]" />
            <div className="flex justify-between text-xs text-slate-400 font-mono mt-3">
              <span>1K</span><span>250K</span><span>500K</span>
            </div>

            <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#F87171] to-[#DC2626] text-white p-8 text-center">
              <p className="text-sm font-semibold opacity-80">Gains mensuels estimés</p>
              <p className="text-5xl font-extrabold mt-2">{fmt(monthly)}<span className="text-lg font-semibold opacity-80">/mois</span></p>
              <p className="mt-2 text-sm opacity-80">{fmt(monthly * 12)}/an</p>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">*Basé sur les taux moyens des campagnes. Les gains réels peuvent varier.</p>
          </motion.div>

          {/* Panneau comparaison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm ring-1 ring-slate-100"
          >
            <h3 className="text-xl font-extrabold text-slate-900">Comparaison des plateformes</h3>
            <p className="text-sm text-slate-500 mb-8">Découvre pourquoi les créateurs choisissent ReelDeal</p>

            <div className="space-y-5">
              <div className="rounded-2xl bg-red-50 ring-2 ring-[#EF4444] p-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">ReelDeal</p>
                  <p className="text-xs text-[#DC2626] font-mono">{PROMOTE_RATE.toFixed(2)} €/1K vues</p>
                </div>
                <p className="text-2xl font-extrabold text-[#DC2626] font-mono">{fmt(monthly)}<span className="text-xs font-semibold text-slate-400">/mois</span></p>
              </div>
              {platforms.map((p) => (
                <div key={p.name} className="rounded-2xl bg-slate-50 p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-600">{p.name}</p>
                    <p className="text-xs text-slate-400 font-mono">{p.rate.toFixed(2)} €/1K vues</p>
                  </div>
                  <p className="text-xl font-bold text-slate-400 font-mono">{fmt((views / 1000) * p.rate)}<span className="text-xs">/mois</span></p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-4xl font-extrabold text-slate-900">{Math.round(PROMOTE_RATE / platforms[0].rate)}x <span className="text-lg font-semibold text-slate-400">de plus que</span></p>
              <p className="text-sm font-semibold text-slate-500">le TikTok Fund — {fmtViews(views)} vues mensuelles</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}