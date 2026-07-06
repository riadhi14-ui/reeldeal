import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

export default function HowItWorks() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="how-it-works" className="py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="text-center mb-20">
          <p className="text-sm font-bold text-[#0084CC] uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Three Steps to Your Payday</h2>
          <p className="mt-4 text-lg text-slate-500">No complicated process. Just create, submit, and earn.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <motion.div {...fadeUp} className="bg-white rounded-3xl p-8 shadow-sm ring-1 ring-slate-100 flex flex-col">
            <div className="space-y-3 mb-8">
              {[
                { img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop", name: "Game Launch Hype", brand: "Riot Games", price: "$80.00" },
                { img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop", name: "Streetwear Season", brand: "Supreme", price: "$65.00" },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 hover:bg-cyan-50 transition-colors">
                  <img src={c.img} alt={c.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-[#0084CC]">{c.price}</p>
                    <p className="text-[10px] text-slate-400">/video</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <p className="text-xs font-bold text-[#0084CC] uppercase tracking-widest mb-2">Step 1</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Pick a Campaign</h3>
              <p className="text-slate-500 leading-relaxed">Browse hundreds of active campaigns from brands you love. Filter by category, payout rate, and more.</p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="bg-white rounded-3xl p-8 shadow-sm ring-1 ring-slate-100 flex flex-col">
            <div className="mb-8">
              <div className="relative rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=400&h=260&fit=crop" alt="Submission preview" className="w-full h-40 object-cover" />
                <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded">0:24</span>
                <span className="absolute inset-0 flex items-center justify-center"><span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg"><Play className="w-5 h-5 text-slate-900 ml-0.5" /></span></span>
              </div>
              <div className="mt-3 h-11 rounded-xl bg-[#00A3E0] text-white text-sm font-bold flex items-center justify-center">Submit for Review</div>
            </div>
            <div className="mt-auto">
              <p className="text-xs font-bold text-[#0084CC] uppercase tracking-widest mb-2">Step 2</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Create & Submit</h3>
              <p className="text-slate-500 leading-relaxed">Make authentic content that fits the brief. Submit your video for brand approval.</p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white rounded-3xl p-8 shadow-sm ring-1 ring-slate-100 flex flex-col">
            <div className="mb-8 rounded-2xl bg-slate-900 p-5 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs opacity-60">ReelDeal</p>
                  <p className="text-xl font-extrabold mt-1">$12,480.00 <span className="text-xs font-normal opacity-60">earned</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] opacity-60">Pending</p>
                  <p className="text-sm font-bold text-[#00D1FF]">$482.50</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 text-xs opacity-70 font-mono">
                <span>•••• 4829</span><span>Sarah C.</span>
              </div>
              <p className="text-3xl font-extrabold mt-3 text-[#00D1FF]">$7,496</p>
              <div className="mt-3 h-10 rounded-xl bg-[#00A3E0] text-white text-sm font-bold flex items-center justify-center">Withdraw Funds</div>
            </div>
            <div className="mt-auto">
              <p className="text-xs font-bold text-[#0084CC] uppercase tracking-widest mb-2">Step 3</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Cash Out</h3>
              <p className="text-slate-500 leading-relaxed">Earn for every view your content gets. Withdraw your earnings anytime to your bank.</p>
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeUp} className="text-center mt-14">
          <button onClick={() => scrollTo("campaigns")} className="h-14 px-8 rounded-full bg-[#00A3E0] hover:bg-[#0084CC] text-white font-bold shadow-xl shadow-cyan-500/30 transition-all hover:scale-[1.03]">
            Start Creating →
          </button>
        </motion.div>
      </div>
    </section>
  );
}