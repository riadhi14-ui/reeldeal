import React, { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

const REELDEAL_RATE = 2.0; // $ / 1K vues
const alternatives = [
  { name: "Publicité classique (CPM)", rate: 8.0 },
  { name: "Influenceur au forfait", rate: 15.0 },
  { name: "Agence UGC", rate: 12.0 },
];

const fmt = (n) => Math.round(n).toLocaleString("fr-FR");
const fmtViews = (n) => (n >= 1000000 ? (n / 1000000).toFixed(1).replace(".", ",") + "M" : Math.round(n / 1000) + "K");

export default function EstimatorBrand() {
  const [budget, setBudget] = useState(5000);
  const views = (budget / REELDEAL_RATE) * 1000;
  const videos = Math.max(Math.round(budget / 120), 1);

  return (
    <section className="py-32 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold text-[#DC2626] uppercase tracking-widest mb-3">Simulateur de campagne</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Que peut faire votre budget ?</h2>
          <p className="mt-4 text-lg text-slate-500">Faites glisser le curseur pour estimer la portée de votre campagne UGC.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Panneau budget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm ring-1 ring-slate-100"
          >
            <div className="flex justify-between items-baseline mb-6">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Budget de campagne</p>
              <p className="text-3xl font-extrabold text-slate-900 font-mono">{fmt(budget)} €</p>
            </div>
            <Slider value={[budget]} min={500} max={50000} step={500} onValueChange={([v]) => setBudget(v)} className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:border-[#EF4444]" />
            <div className="flex justify-between text-xs text-slate-400 font-mono mt-3">
              <span>500 €</span><span>25K €</span><span>50K €</span>
            </div>

            <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#F87171] to-[#DC2626] text-white p-8 text-center">
              <p className="text-sm font-semibold opacity-80">Vues estimées</p>
              <p className="text-5xl font-extrabold mt-2">{fmtViews(views)}</p>
              <p className="mt-2 text-sm opacity-80">≈ {videos} vidéos de créateurs</p>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">*Basé sur un taux moyen de {REELDEAL_RATE.toFixed(2)} €/1K vues. Les résultats réels peuvent varier.</p>
          </motion.div>

          {/* Panneau comparaison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm ring-1 ring-slate-100"
          >
            <h3 className="text-xl font-extrabold text-slate-900">Comparaison des coûts</h3>
            <p className="text-sm text-slate-500 mb-8">Le même budget, comparé aux canaux traditionnels</p>

            <div className="space-y-5">
              <div className="rounded-2xl bg-red-50 ring-2 ring-[#EF4444] p-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">ReelDeal</p>
                  <p className="text-xs text-[#DC2626] font-mono">{REELDEAL_RATE.toFixed(2)} €/1K vues</p>
                </div>
                <p className="text-2xl font-extrabold text-[#DC2626] font-mono">{fmtViews(views)}<span className="text-xs font-semibold text-slate-400"> vues</span></p>
              </div>
              {alternatives.map((p) => (
                <div key={p.name} className="rounded-2xl bg-slate-50 p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-600">{p.name}</p>
                    <p className="text-xs text-slate-400 font-mono">{p.rate.toFixed(2)} €/1K vues</p>
                  </div>
                  <p className="text-xl font-bold text-slate-400 font-mono">{fmtViews((budget / p.rate) * 1000)}<span className="text-xs"> vues</span></p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-4xl font-extrabold text-slate-900">{Math.round(alternatives[0].rate / REELDEAL_RATE)}x <span className="text-lg font-semibold text-slate-400">plus de vues</span></p>
              <p className="text-sm font-semibold text-slate-500">qu'une publicité classique — à budget égal</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}