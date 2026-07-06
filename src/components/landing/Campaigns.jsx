import React from "react";
import { motion } from "framer-motion";

const campaigns = [
  { rank: 1, name: "Promote It - UGC Facecam", brand: "Promote Support", rate: "$1.00", img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=400&fit=crop" },
  { rank: 2, name: "Game Launch Hype", brand: "Riot Games", rate: "$0.80", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop" },
  { rank: 3, name: "Streetwear Season", brand: "Supreme", rate: "$0.65", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop" },
  { rank: 4, name: "Glow Up Routine", brand: "Glossier", rate: "$0.55", img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop" },
];

export default function Campaigns() {
  return (
    <section id="campaigns" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold text-[#0084CC] uppercase tracking-widest mb-3">Top Paying Right Now</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Campaigns Paying The Most</h2>
          <p className="mt-4 text-lg text-slate-500">Live opportunities ranked by payout. First come, first served.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {campaigns.map((c, i) => (
            <motion.div
              key={c.rank}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative rounded-3xl overflow-hidden ring-1 ring-slate-100 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 transition-all hover:-translate-y-1 bg-white cursor-pointer"
            >
              <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded-full shadow">#{c.rank}</span>
              <div className="aspect-square overflow-hidden">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <p className="font-bold text-slate-900 truncate">{c.name}</p>
                <p className="text-sm text-slate-400 mt-0.5">{c.brand}</p>
                <div className="mt-3 inline-flex items-baseline gap-1.5 bg-cyan-50 text-[#0084CC] rounded-full px-3 py-1.5">
                  <span className="font-extrabold font-mono">{c.rate}</span>
                  <span className="text-[10px] font-semibold">/1K views</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <button
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
            className="h-12 px-7 rounded-full border-2 border-slate-200 hover:border-[#00A3E0] hover:text-[#0084CC] font-bold text-slate-700 transition-colors"
          >
            View All Campaigns
          </button>
        </div>
      </div>
    </section>
  );
}