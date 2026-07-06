import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { campaigns } from "@/lib/campaignsData";

const categories = ["All", ...new Set(campaigns.map((c) => c.category))];

export default function Campaigns() {
  const [mode, setMode] = useState("creator");
  const [category, setCategory] = useState("All");
  const filtered = category === "All" ? campaigns : campaigns.filter((c) => c.category === category);

  return (
    <div className="bg-white text-slate-900 font-body min-h-screen">
      <Navbar mode={mode} setMode={setMode} />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-[#DC2626] uppercase tracking-widest mb-3">Live Opportunities</p>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900">All Campaigns</h1>
            <p className="mt-4 text-lg text-slate-500">Ranked by payout. First come, first served.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`h-10 px-5 rounded-full text-sm font-bold transition-colors ${
                  category === cat ? "bg-[#EF4444] text-white shadow-lg shadow-red-500/25" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <Link
                  to={`/campaign/${c.id}`}
                  className="group block relative rounded-3xl overflow-hidden ring-1 ring-slate-100 shadow-sm hover:shadow-xl hover:shadow-red-500/10 transition-all hover:-translate-y-1 bg-white"
                >
                  <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded-full shadow">#{c.rank}</span>
                  <span className="absolute top-4 right-4 z-10 bg-slate-900/70 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{c.category}</span>
                  <div className="aspect-square overflow-hidden">
                    <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <p className="font-bold text-slate-900 truncate">{c.name}</p>
                    <p className="text-sm text-slate-400 mt-0.5">{c.brand}</p>
                    <div className="mt-3 inline-flex items-baseline gap-1.5 bg-red-50 text-[#DC2626] rounded-full px-3 py-1.5">
                      <span className="font-extrabold font-mono">${c.rate.toFixed(2)}</span>
                      <span className="text-[10px] font-semibold">/1K views</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}