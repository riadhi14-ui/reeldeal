import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Comment démarrer sur ReelDeal ?",
    a: "Crée simplement un compte gratuit, parcours les campagnes actives et choisis celle qui correspond à ton style. Une fois le brief lu, crée ta vidéo, publie-la sur tes réseaux et soumets le lien pour validation. C'est tout — tu commences à gagner dès que les vues arrivent.",
  },
  {
    q: "Quand et comment suis-je payé ?",
    a: "Tes gains s'accumulent en temps réel en fonction des vues générées par ton contenu. Tu peux retirer ton solde à tout moment directement sur ton compte bancaire. La plupart des paiements sont traités sous 2 à 3 jours ouvrés.",
  },
  {
    q: "Faut-il beaucoup d'abonnés pour participer ?",
    a: "Pas du tout ! Il n'y a aucun minimum d'abonnés sur ReelDeal. Ce qui compte, c'est la qualité et la performance de ton contenu. Beaucoup de nos meilleurs créateurs ont commencé avec moins de 5 000 abonnés.",
  },
  {
    q: "Quels types de campagnes sont disponibles ?",
    a: "Nous proposons des campagnes dans le gaming, la mode, la beauté, la tech, l'éducation, le fitness et bien plus. De nouvelles campagnes de grandes marques sont ajoutées chaque semaine, chacune avec son taux de rémunération et son brief créatif.",
  },
  {
    q: "Combien de temps prend la validation ?",
    a: "La plupart des soumissions sont examinées sous 24 à 48 heures. Une fois validée, ta vidéo commence immédiatement à générer des gains en fonction de ses vues.",
  },
  {
    q: "Puis-je travailler avec plusieurs marques à la fois ?",
    a: "Absolument. Tu peux rejoindre autant de campagnes que tu le souhaites en même temps. Beaucoup de créateurs mènent 3 à 5 campagnes actives en parallèle pour maximiser leurs gains.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-32 bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-bold text-[#DC2626] uppercase tracking-widest mb-3">Questions & Réponses</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Des questions ?</h2>
          <p className="mt-4 text-lg text-slate-500">Tout ce que tu dois savoir pour bien démarrer.</p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-2xl px-6 ring-1 ring-slate-100 border-none shadow-sm">
              <AccordionTrigger className="text-left font-bold text-slate-900 hover:no-underline py-5">{f.q}</AccordionTrigger>
              <AccordionContent className="text-slate-500 leading-relaxed pb-5">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <a
            href="mailto:support@reeldeal.sh"
            className="inline-flex items-center h-12 px-7 rounded-full border-2 border-slate-200 hover:border-[#EF4444] hover:text-[#DC2626] font-bold text-slate-700 transition-colors"
          >
            Contacter le support
          </a>
        </div>
      </div>
    </section>
  );
}