import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Prêt à transformer tes vues en revenus ?</h2>
          <button
            onClick={() => navigate("/campaigns")}
            className="mt-8 h-14 px-8 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold shadow-xl shadow-red-500/30 transition-all hover:scale-[1.03]"
          >
            Commencer à gagner →
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm text-slate-400">
          <p className="flex items-center gap-2 font-extrabold text-white text-lg">
            <img src="https://media.base44.com/images/public/6a4bcc3db03674ee37b93254/eb851557b_generated_image.png" alt="ReelDeal logo" className="w-7 h-7 rounded-lg" />
            <span>Reel<span className="text-[#F87171]">Deal</span></span>
          </p>
          <nav className="flex items-center gap-6 font-semibold">
            <button onClick={() => scrollTo("how-it-works")} className="hover:text-white transition-colors">Comment ça marche</button>
            <button onClick={() => scrollTo("campaigns")} className="hover:text-white transition-colors">Campagnes</button>
            <button onClick={() => scrollTo("faq")} className="hover:text-white transition-colors">FAQ</button>
            <a href="mailto:contact@reeldeal.fr" className="hover:text-white transition-colors">contact@reeldeal.fr</a>
          </nav>
          <p>© {new Date().getFullYear()} ReelDeal. Tous droits réservés.</p>
        </div>
      </div>

      <p aria-hidden className="mt-16 text-center font-extrabold text-[18vw] leading-[0.8] tracking-tighter text-transparent select-none" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.08)" }}>
        REELDEAL
      </p>
    </footer>
  );
}