import React from "react";
import { motion } from "framer-motion";

const stories = [
  {
    name: "Sarah C.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
    quote: "\"I signed up not expecting much but got my first campaign within a week. The whole process is simple — film, post, get paid.\"",
    earned: "$840 in first month",
  },
  {
    name: "Marcus J.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    quote: "\"In just 30 days, I earned $1,250 in profit without any complicated process or negotiations.\"",
    earned: "$1,250 net profit in 30 days",
  },
  {
    name: "Emma R.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
    quote: "\"No follower minimum is what got me in. I started with 2K followers and still got accepted. A complete game changer.\"",
    earned: "$620 earned since joining",
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
          <p className="text-sm font-bold text-[#0084CC] uppercase tracking-widest mb-3">Success Stories</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Hear From Our Community</h2>
          <p className="mt-4 text-lg text-slate-500">Real creators, real results. See what's possible with ReelDeal.</p>
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
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Earned:</span>
                  <span className="text-sm font-extrabold text-[#0084CC] font-mono">{s.earned}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}