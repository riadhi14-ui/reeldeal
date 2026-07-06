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
          <p className="text-sm font-bold text-[#DC2626] uppercase tracking-widest mb-3">Comment ça marche</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Trois étapes vers ton premier gain</h2>
          <p className="mt-4 text-lg text-slate-500">Pas de processus compliqué. Crée, soumets et gagne.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Étape 1 */}
          <motion.div {...fadeUp} className="bg-white rounded-3xl p-8 shadow-sm ring-1 ring-slate-100 flex flex-col">
            <div className="space-y-3 mb-8">
              {[
                { img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop", name: "Game Launch Hype", brand: "Riot Games", price: "80,00 $" },
                { img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop", name: "Streetwear Season", brand: "Supreme", price: "65,00 $" },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 hover:bg-red-50 transition-colors">
                  <img src={c.img} alt={c.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-[#DC2626]">{c.price}</p>
                    <p className="text-[10px] text-slate-400">/vidéo</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <p className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-2">Étape 1</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Choisis une campagne</h3>
              <p className="text-slate-500 leading-relaxed">Parcours des centaines de campagnes actives de marques que tu aimes. Filtre par catégorie, taux de rémunération et plus encore.</p>
            </div>
          </motion.div>

          {/* Étape 2 */}
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="bg-white rounded-3xl p-8 shadow-sm ring-1 ring-slate-100 flex flex-col">
            <div className="mb-8">
              <div className="relative rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=400&h=260&fit=crop" alt="Aperçu de la soumission" className="w-full h-40 object-cover" />
                <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded">0:24</span>
                <span className="absolute inset-0 flex items-center justify-center"><span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg"><Play className="w-5 h-5 text-slate-900 ml-0.5" /></span></span>
              </div>
              <div className="mt-3 h-11 rounded-xl bg-[#EF4444] text-white text-sm font-bold flex items-center justify-center">Soumettre pour validation</div>
            </div>
            <div className="mt-auto">
              <p className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-2">Étape 2</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Crée & soumets</h3>
              <p className="text-slate-500 leading-relaxed">Crée du contenu authentique qui respecte le brief. Soumets ta vidéo pour validation par la marque.</p>
            </div>
          </motion.div>

          {/* Étape 3 */}
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white rounded-3xl p-8 shadow-sm ring-1 ring-slate-100 flex flex-col">
            <div className="mb-8 rounded-2xl bg-slate-900 p-5 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs opacity-60">ReelDeal</p>
                  <p className="text-xl font-extrabold mt-1">12 480,00 $ <span className="text-xs font-normal opacity-60">gagnés</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] opacity-60">En attente</p>
                  <p className="text-sm font-bold text-[#F87171]">482,50 $</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 text-xs opacity-70 font-mono">
                <span>•••• 4829</span><span>Sarah C.</span>
              </div>
              <p className="text-3xl font-extrabold mt-3 text-[#F87171]">7 496 $</p>
              <div className="mt-3 h-10 rounded-xl bg-[#EF4444] text-white text-sm font-bold flex items-center justify-center">Retirer mes gains</div>
            </div>
            <div className="mt-auto">
              <p className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-2">Étape 3</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Encaisse</h3>
              <p className="text-slate-500 leading-relaxed">Gagne de l'argent pour chaque vue de ton contenu. Retire tes gains à tout moment sur ton compte bancaire.</p>
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeUp} className="text-center mt-14">
          <button onClick={() => scrollTo("campaigns")} className="h-14 px-8 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold shadow-xl shadow-red-500/30 transition-all hover:scale-[1.03]">
            Commencer à créer →
          </button>
        </motion.div>
      </div>
    </section>
  );
}