import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneMockup from "./PhoneMockup";
import BrandMockup from "./BrandMockup";

export default function Hero({ mode, setMode }) {
  const isCreator = mode === "creator";
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Decorative curves */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
        <path d="M-100 200 Q 400 50 900 300" stroke="#E0F4FF" strokeWidth="1.5" />
        <path d="M-100 700 Q 500 550 700 950" stroke="#E0F4FF" strokeWidth="1.5" />
        <path d="M900 950 Q 1200 750 1600 850" stroke="#E0F4FF" strokeWidth="1.5" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center py-20">
        <div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-700 leading-[1.05]">
            {isCreator ? (
              <>Create. Post. <span className="text-slate-800">Earn.</span></>
            ) : (
              <>Target. Launch. <span className="text-slate-800">Scale.</span></>
            )}
          </h1>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => setMode(isCreator ? "brand" : "creator")}
              aria-label="Switch mode"
              className={`relative w-24 h-12 rounded-full p-1.5 transition-colors ring-4 ring-slate-100 ${isCreator ? "bg-[#00A3E0]" : "bg-slate-800"}`}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className={`block w-9 h-9 rounded-full bg-white shadow ${isCreator ? "" : "ml-auto"}`}
              />
            </button>
            <AnimatePresence mode="wait">
              <motion.span
                key={mode}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#00A3E0]"
              >
                {isCreator ? "Creator" : "Brand"}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="mt-8 text-lg text-slate-500 max-w-md leading-relaxed">
            {isCreator
              ? "Join campaigns from top brands, create authentic videos, and get paid for every view your content generates."
              : "Launch UGC campaigns, tap into thousands of creators, and pay only for the views your campaign generates."}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <button
              onClick={() => scrollTo("campaigns")}
              className="h-14 px-8 rounded-full bg-[#00A3E0] hover:bg-[#0084CC] text-white font-bold shadow-xl shadow-cyan-500/30 transition-all hover:scale-[1.03] flex items-center gap-2"
            >
              {isCreator ? "Start Earning Now" : "Launch a Campaign"} <span aria-hidden>→</span>
            </button>
            <button onClick={() => scrollTo("campaigns")} className="font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              Browse Campaigns
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -m-10 rounded-full bg-gradient-to-br from-cyan-50 via-white to-blue-50 blur-2xl" />
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -60, filter: "blur(8px)" }}
              transition={{ duration: 0.35 }}
              className="relative"
            >
              {isCreator ? <PhoneMockup /> : <BrandMockup />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}