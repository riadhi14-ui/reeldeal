import React, { useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      className={`relative h-8 w-14 rounded-full transition-colors duration-300 shrink-0 ${dark ? "bg-[#9B1C1C]" : "bg-slate-200"}`}
    >
      <span
        className={`absolute top-1 left-1 h-6 w-6 rounded-full transition-transform duration-300 shadow ${dark ? "translate-x-6 bg-[#1a1a1a]" : "translate-x-0 bg-white"}`}
      />
    </button>
  );
}