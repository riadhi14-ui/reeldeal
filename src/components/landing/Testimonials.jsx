import React from "react";
import { motion } from "framer-motion";

const stories = [
  {
    name: "Sarah C.",
    img: "https://media.base44.com/images/public/6a4bcc3db03674ee37b93254/c0370ab7d_qMQpayhN.jpg",
    quote: "« Je me suis inscrite sans grande attente et j'ai décroché ma première campagne en une semaine. Tout est simple : filmer, publier, être payée. »",
    earned: "840 € le premier mois",
  },
  {
    name: "Marcus J.",
    img: "https://media.base44.com/images/public/6a4bcc3db03674ee37b93254/c6225d075_images.jpeg",
    quote: "« En seulement 30 jours, j'ai gagné 1 250 € de bénéfices sans aucun processus compliqué ni négociation. »",
    earned: "1 250 € nets en 30 jours",
  },
  {
    name: "Emma R.",
    img: "https://media.base44.com/images/public/6a4bcc3db03674ee37b93254/a0e3db778_66b751218e70c-0-5880ea21-ba41-42ee-89f8-307fac285b72.jpeg",
    quote: "« L'absence de minimum d'abonnés m'a convaincue. J'ai commencé avec 2K abonnés et j'ai quand même été acceptée. Un vrai game changer. »",
    earned: "620 € gagnés depuis l'inscription",
  },
];

const brandStories = [
  {
    name: "Léa M. — DNVB Cosmétique",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face",
    quote: "« En un mois, 43 créateurs ont produit du contenu pour nous. On a généré plus de vues qu'avec 6 mois de publicité classique, pour un tiers du budget. »",
    earned: "2,1M de vues générées",
  },
  {
    name: "Thomas B. — App mobile",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
    quote: "« Le paiement aux vues change tout : on ne paie que ce qui performe. Notre coût d'acquisition a été divisé par deux. »",
    earned: "CAC divisé par 2",
  },
  {
    name: "Inès K. — Marque food",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face",
    quote: "« Zéro négociation, zéro brief interminable. On publie la campagne, on valide les vidéos, c'est tout. L'UGC n'a jamais été aussi simple. »",
    earned: "180 vidéos en 3 mois",
  },
];

export default function Testimonials({ mode = "creator" }) {
  const isBrand = mode === "brand";
  const items = isBrand ? brandStories : stories;
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold text-[#DC2626] uppercase tracking-widest mb-3">Témoignages</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">{isBrand ? "Les marques en parlent" : "La parole à notre communauté"}</h2>
          <p className="mt-4 text-lg text-slate-500">{isBrand ? "De vraies marques, de vrais résultats. Découvrez ce que l'UGC peut faire pour vous." : "De vrais créateurs, de vrais résultats. Découvre ce qui est possible avec ReelDeal."}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((s, i) => (
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
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{isBrand ? "Résultat :" : "Gains :"}</span>
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