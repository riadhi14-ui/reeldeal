import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Check } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

export default function HowItWorksBrand() {
  const navigate = useNavigate();
  const start = async () => {
    const authed = await base44.auth.isAuthenticated();
    navigate(authed ? "/brand" : "/register");
  };

  return (
    <section id="how-it-works" className="py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="text-center mb-20">
          <p className="text-sm font-bold text-[#DC2626] uppercase tracking-widest mb-3">Comment ça marche</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Trois étapes vers des vidéos qui vendent</h2>
          <p className="mt-4 text-lg text-slate-500">Lancez une campagne, laissez les créateurs produire, payez uniquement aux résultats.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Étape 1 : créer la campagne */}
          <motion.div {...fadeUp} className="bg-white rounded-3xl p-8 shadow-sm ring-1 ring-slate-100 flex flex-col">
            <div className="mb-8 rounded-2xl bg-slate-50 p-5 space-y-3">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nom de la campagne</p>
                <div className="h-9 rounded-xl bg-white ring-1 ring-slate-200 px-3 flex items-center text-sm font-semibold text-slate-700">Lancement été 2026</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Budget</p>
                  <div className="h-9 rounded-xl bg-white ring-1 ring-slate-200 px-3 flex items-center text-sm font-bold text-slate-900 font-mono">5 000 $</div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Taux /1K vues</p>
                  <div className="h-9 rounded-xl bg-white ring-1 ring-slate-200 px-3 flex items-center text-sm font-bold text-[#DC2626] font-mono">2,00 $</div>
                </div>
              </div>
              <div className="h-10 rounded-xl bg-[#EF4444] text-white text-sm font-bold flex items-center justify-center">Publier la campagne</div>
            </div>
            <div className="mt-auto">
              <p className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-2">Étape 1</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Créez votre campagne</h3>
              <p className="text-slate-500 leading-relaxed">Définissez votre brief, votre budget et le taux par 1 000 vues. Votre campagne est visible par des milliers de créateurs en quelques minutes.</p>
            </div>
          </motion.div>

          {/* Étape 2 : les créateurs produisent */}
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="bg-white rounded-3xl p-8 shadow-sm ring-1 ring-slate-100 flex flex-col">
            <div className="space-y-3 mb-8">
              {[
                { img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", name: "Sarah C.", meta: "TikTok · 128K vues" },
                { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", name: "Marcus J.", meta: "Reels · 86K vues" },
                { img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", name: "Emma R.", meta: "Shorts · 64K vues" },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                  <img src={c.img} alt={c.name} className="w-11 h-11 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.meta}</p>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">Soumis</span>
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <p className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-2">Étape 2</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Les créateurs produisent</h3>
              <p className="text-slate-500 leading-relaxed">Des créateurs authentiques rejoignent votre campagne et publient des vidéos UGC sur TikTok, Reels et Shorts — sans négociation individuelle.</p>
            </div>
          </motion.div>

          {/* Étape 3 : valider & payer aux vues */}
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white rounded-3xl p-8 shadow-sm ring-1 ring-slate-100 flex flex-col">
            <div className="mb-8 rounded-2xl bg-slate-900 p-5 text-white">
              <p className="text-xs opacity-60">Performance de la campagne</p>
              <p className="text-3xl font-extrabold mt-2 text-[#F87171]">1,2M <span className="text-sm font-semibold opacity-60">vues générées</span></p>
              <div className="mt-4 space-y-2">
                {["Vidéo validée · 128K vues · 256 $", "Vidéo validée · 86K vues · 172 $"].map((line) => (
                  <div key={line} className="flex items-center gap-2 text-xs opacity-80">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {line}
                  </div>
                ))}
              </div>
              <div className="mt-4 h-10 rounded-xl bg-white/10 text-sm font-bold flex items-center justify-center">Vous ne payez que les vues réelles</div>
            </div>
            <div className="mt-auto">
              <p className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-2">Étape 3</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Validez & payez aux résultats</h3>
              <p className="text-slate-500 leading-relaxed">Validez chaque vidéo avant paiement. Vous payez uniquement les vues réellement générées — zéro coût fixe, zéro risque.</p>
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeUp} className="text-center mt-14">
          <button onClick={start} className="h-14 px-8 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold shadow-xl shadow-red-500/30 transition-all hover:scale-[1.03]">
            Lancer une campagne →
          </button>
        </motion.div>
      </div>
    </section>
  );
}