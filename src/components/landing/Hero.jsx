import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { goToMySpace } from "@/lib/accountType";
import PhoneMockup from "./PhoneMockup";
import BrandMockup from "./BrandMockup";

export default function Hero({ mode, setMode }) {
  const isCreator = mode === "creator";
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handlePrimary = async () => {
    const authed = await base44.auth.isAuthenticated().catch(() => false);
    if (!authed) { window.location.href = "/register"; return; }
    goToMySpace();
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Decorative curves */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
        <path d="M-100 200 Q 400 50 900 300" stroke="#FEE2E2" strokeWidth="1.5" />
        <path d="M-100 700 Q 500 550 700 950" stroke="#FEE2E2" strokeWidth="1.5" />
        <path d="M900 950 Q 1200 750 1600 850" stroke="#FEE2E2" strokeWidth="1.5" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center py-20">
        <div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-700 leading-[1.05]">
            {isCreator ? (
              <>Crée. Publie. <span className="text-slate-800">Gagne.</span></>
            ) : (
              <>Cible. Lance. <span className="text-slate-800">Décolle.</span></>
            )}
          </h1>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => setMode(isCreator ? "brand" : "creator")}
              aria-label="Switch mode"
              className={`relative w-24 h-12 rounded-full p-1.5 transition-colors ring-4 ring-slate-100 ${isCreator ? "bg-[#EF4444]" : "bg-slate-800"}`}
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
                className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#EF4444]"
              >
                {isCreator ? "Créateur" : "Marque"}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="mt-8 text-lg text-slate-500 max-w-md leading-relaxed">
            {isCreator
              ? "Rejoins des campagnes de grandes marques, crée des vidéos authentiques et sois payé pour chaque vue générée par ton contenu."
              : "Lance des campagnes UGC, accède à des milliers de créateurs et ne paie que pour les vues générées par ta campagne."}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <button
              onClick={handlePrimary}
              className="h-14 px-8 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold shadow-xl shadow-red-500/30 transition-all hover:scale-[1.03] flex items-center gap-2"
            >
              {isCreator ? "Commencer à gagner" : "Lancer une campagne"} <span aria-hidden>→</span>
            </button>
            <button onClick={() => scrollTo("campaigns")} className="font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              Parcourir les campagnes
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -m-10 rounded-full bg-gradient-to-br from-red-50 via-white to-rose-50 blur-2xl" />
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