import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do I get started with ReelDeal?",
    a: "Simply create a free account, browse the active campaigns, and pick one that fits your style. Once you've read the brief, create your video, post it on your social channels, and submit the link for approval. That's it — you start earning as soon as your views come in.",
  },
  {
    q: "When and how do I get paid?",
    a: "Your earnings accumulate in real time based on the views your content generates. You can withdraw your balance anytime directly to your bank account. Most payouts are processed within 2-3 business days.",
  },
  {
    q: "Do I need a huge following to join?",
    a: "Not at all! There is no follower minimum on ReelDeal. What matters is the quality and performance of your content. Many of our top earners started with fewer than 5,000 followers.",
  },
  {
    q: "What types of campaigns are available?",
    a: "We host campaigns across gaming, fashion, beauty, tech, education, fitness, and more. New campaigns from top brands are added every week, each with its own payout rate and creative brief.",
  },
  {
    q: "How long does approval take?",
    a: "Most submissions are reviewed within 24-48 hours. Once approved, your video immediately starts earning based on the views it generates.",
  },
  {
    q: "Can I work with multiple brands at once?",
    a: "Absolutely. You can join as many campaigns as you like simultaneously. Many creators run 3-5 active campaigns at a time to maximize their earnings.",
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
          <p className="text-sm font-bold text-[#0084CC] uppercase tracking-widest mb-3">Questions & Answers</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Got Questions?</h2>
          <p className="mt-4 text-lg text-slate-500">Everything you need to know about getting started.</p>
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
            className="inline-flex items-center h-12 px-7 rounded-full border-2 border-slate-200 hover:border-[#00A3E0] hover:text-[#0084CC] font-bold text-slate-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}