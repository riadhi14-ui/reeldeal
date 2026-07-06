import React from "react";
import { motion } from "framer-motion";

const stories = [
  {
    name: "Sarah C.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
    quote: "« Je me suis inscrite sans grande attente et j'ai décroché ma première campagne en une semaine. Tout est simple : filmer, publier, être payée. »",
    earned: "840 $ le premier mois",
  },
  {
    name: "Marcus J.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    quote: "« En seulement 30 jours, j'ai gagné 1 250 $ de bénéfices sans aucun processus compliqué ni négociation. »",
    earned: "1 250 $ nets en 30 jours",
  },
  {
    name: "Emma R.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
    quote: "« L'absence de minimum d'abonnés m'a convaincue. J'ai commencé avec 2K abonnés et j'ai quand même été acceptée. Un vrai game changer. »",
    earned: "620 $ gagnés depuis l'inscription",
  },
];

export default function Testimonials() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold text-[#DC2626] uppercase tracking-widest mb-3">Témoignages</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">La parole à notre communauté</h2>
          <p className="mt-4 text-lg text-slate-500">De vrais créateurs, de vrais résultats. Découvre ce qui est possible avec ReelDeal.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group rounded-3xl overflow-hidden bg-white ring-1 ring-slate-100 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="h-64 overflow-hidden">
                <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-7">
                <h3 className="text-xl font-extrabold text-slate-900">{s.name}</h3>
                <p className="mt-3 text-slate-500 leading-relaxed">{s.quote}</p>
                <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Gains :</span>
                  <span className="text-sm font-extrabold text-[#DC2626] font-mono">{s.earned}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}