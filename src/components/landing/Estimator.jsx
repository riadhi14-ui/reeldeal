import React, { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

const PROMOTE_RATE = 2.0;
const platforms = [
  { name: "TikTok Creator Fund", rate: 0.6 },
  { name: "YouTube Shorts", rate: 0.1 },
  { name: "Instagram Reels", rate: 0.2 },
];

const fmt = (n) => "$" + Math.round(n).toLocaleString("en-US");
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
          <p className="text-sm font-bold text-[#0084CC] uppercase tracking-widest mb-3">Earnings Estimator</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">How Much Can You Earn?</h2>
          <p className="mt-4 text-lg text-slate-500">Slide to see your potential earnings based on your content performance.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Slider panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm ring-1 ring-slate-100"
          >
            <div className="flex justify-between items-baseline mb-6">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Monthly Views</p>
              <p className="text-3xl font-extrabold text-slate-900 font-mono">{views.toLocaleString("en-US")}</p>
            </div>
            <Slider value={[views]} min={1000} max={500000} step={1000} onValueChange={([v]) => setViews(v)} className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:border-[#00A3E0]" />
            <div className="flex justify-between text-xs text-slate-400 font-mono mt-3">
              <span>1K</span><span>250K</span><span>500K</span>
            </div>

            <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#00C2FF] to-[#0084CC] text-white p-8 text-center">
              <p className="text-sm font-semibold opacity-80">Estimated Monthly Earnings</p>
              <p className="text-5xl font-extrabold mt-2">{fmt(monthly)}<span className="text-lg font-semibold opacity-80">/month</span></p>
              <p className="mt-2 text-sm opacity-80">{fmt(monthly * 12)}/year</p>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">*Based on average campaign rates. Actual earnings may vary.</p>
          </motion.div>

          {/* Comparison panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm ring-1 ring-slate-100"
          >
            <h3 className="text-xl font-extrabold text-slate-900">Platform Comparison</h3>
            <p className="text-sm text-slate-500 mb-8">See why creators choose Promote</p>

            <div className="space-y-5">
              <div className="rounded-2xl bg-cyan-50 ring-2 ring-[#00A3E0] p-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Promote</p>
                  <p className="text-xs text-[#0084CC] font-mono">${PROMOTE_RATE.toFixed(2)}/1K views</p>
                </div>
                <p className="text-2xl font-extrabold text-[#0084CC] font-mono">{fmt(monthly)}<span className="text-xs font-semibold text-slate-400">/mo</span></p>
              </div>
              {platforms.map((p) => (
                <div key={p.name} className="rounded-2xl bg-slate-50 p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-600">{p.name}</p>
                    <p className="text-xs text-slate-400 font-mono">${p.rate.toFixed(2)}/1K views</p>
                  </div>
                  <p className="text-xl font-bold text-slate-400 font-mono">{fmt((views / 1000) * p.rate)}<span className="text-xs">/mo</span></p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-4xl font-extrabold text-slate-900">{Math.round(PROMOTE_RATE / platforms[0].rate)}x <span className="text-lg font-semibold text-slate-400">more than</span></p>
              <p className="text-sm font-semibold text-slate-500">TikTok Fund — {fmtViews(views)} monthly views</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}