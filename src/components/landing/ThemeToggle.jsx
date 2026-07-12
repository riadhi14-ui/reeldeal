import React, { useState, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const controls = useAnimation();

  const swing = useCallback((amp, dur = 1.4) => {
    controls.start({
      rotate: [0, amp, -amp * 0.65, amp * 0.4, -amp * 0.2, amp * 0.08, 0],
      transition: { duration: dur, ease: "easeInOut" },
    });
  }, [controls]);

  // Petit mouvement de temps en temps
  useEffect(() => {
    const id = setInterval(() => swing(5, 1.6), 5000 + Math.random() * 4000);
    return () => clearInterval(id);
  }, [swing]);

  // Rester synchro avec le réglage des paramètres
  useEffect(() => {
    const sync = () => setDark(localStorage.getItem("theme") === "dark");
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    window.dispatchEvent(new Event("themechange"));
    swing(28, 2);
  };

  return (
    <button
      onClick={toggle}
      onMouseEnter={() => swing(7, 1)}
      aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="fixed top-0 right-4 sm:right-8 z-[60] flex flex-col items-center outline-none"
    >
      <motion.div animate={controls} style={{ transformOrigin: "top center" }} className="flex flex-col items-center">
        {/* Fil */}
        <span className={`w-px h-7 ${dark ? "bg-slate-600" : "bg-slate-300"}`} />
        {/* Abat-jour */}
        <span
          className={`w-7 h-4 rounded-t-full transition-colors duration-500 ${dark ? "bg-slate-700" : "bg-slate-800"}`}
          style={{ clipPath: "polygon(20% 100%, 50% 0, 80% 100%, 100% 100%, 0 100%)" }}
        />
        {/* Ampoule */}
        <span
          className={`-mt-0.5 w-4 h-4 rounded-full transition-all duration-500 ${
            dark
              ? "bg-slate-500 shadow-none"
              : "bg-yellow-300 shadow-[0_0_14px_5px_rgba(253,224,71,0.75)]"
          }`}
        />
      </motion.div>
      <span className={`mt-1.5 text-[9px] font-semibold tracking-wide select-none ${dark ? "text-slate-500" : "text-slate-400"}`}>
        {dark ? "Mode clair" : "Mode sombre"}
      </span>
    </button>
  );
}