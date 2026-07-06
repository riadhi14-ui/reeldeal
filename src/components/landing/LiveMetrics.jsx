import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ target, prefix = "", suffix = "+", duration = 2000 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  const fmt = value >= 1000000 ? (value / 1000000).toFixed(1).replace(/\.0$/, "") + "M" : value.toLocaleString("en-US");
  return <span ref={ref}>{prefix}{fmt}{suffix}</span>;
}

const metrics = [
  { label: "Active Creators", target: 12400 },
  { label: "Paid Out", target: 2100000, prefix: "$" },
  { label: "Videos Created", target: 48000 },
  { label: "Total Views", target: 380000000 },
];

export default function LiveMetrics() {
  return (
    <section className="py-32 bg-slate-900 relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0084CC]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold text-[#00D1FF] uppercase tracking-widest mb-3">Live Metrics</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">Numbers That Speak</h2>
          <p className="mt-4 text-lg text-slate-400">Real-time stats from our growing community of creators and brands.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-8 text-center"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                <Counter target={m.target} prefix={m.prefix || ""} />
              </p>
              <p className="mt-2 text-sm text-slate-400 font-semibold">{m.label}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live data updating in real-time
        </p>
      </div>
    </section>
  );
}