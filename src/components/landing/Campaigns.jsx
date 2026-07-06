import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { campaigns as allCampaigns } from "@/lib/campaignsData";

const campaigns = allCampaigns.slice(0, 4);

export default function Campaigns() {
  return (
    <section id="campaigns" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold text-[#DC2626] uppercase tracking-widest mb-3">Les mieux payées du moment</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Les campagnes qui paient le plus</h2>
          <p className="mt-4 text-lg text-slate-500">Des opportunités en direct classées par rémunération. Premier arrivé, premier servi.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {campaigns.map((c, i) => (
            <motion.div
              key={c.rank}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={`/campaign/${c.id}`}
                className="group block relative rounded-3xl overflow-hidden ring-1 ring-slate-100 shadow-sm hover:shadow-xl hover:shadow-red-500/10 transition-all hover:-translate-y-1 bg-white"
              >
                <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded-full shadow">#{c.rank}</span>
                <div className="aspect-square overflow-hidden">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <p className="font-bold text-slate-900 truncate">{c.name}</p>
                  <p className="text-sm text-slate-400 mt-0.5">{c.brand}</p>
                  <div className="mt-3 inline-flex items-baseline gap-1.5 bg-red-50 text-[#DC2626] rounded-full px-3 py-1.5">
                    <span className="font-extrabold font-mono">${c.rate.toFixed(2)}</span>
                    <span className="text-[10px] font-semibold">/1K vues</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            to="/campaigns"
            className="inline-flex items-center h-12 px-7 rounded-full border-2 border-slate-200 hover:border-[#EF4444] hover:text-[#DC2626] font-bold text-slate-700 transition-colors"
          >
            Voir toutes les campagnes
          </Link>
        </div>
      </div>
    </section>
  );
}