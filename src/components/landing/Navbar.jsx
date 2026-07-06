import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ mode = "creator", setMode = () => {} }) {
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

  const goHome = () => {
    if (location.pathname !== "/") navigate("/");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={goHome} className="flex items-center gap-2">
          <img src="https://media.base44.com/images/public/6a4bcc3db03674ee37b93254/813d2de75_generated_image.png" alt="ReelDeal logo" className="w-8 h-8 rounded-lg" />
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Reel<span className="text-[#0084CC]">Deal</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button onClick={() => scrollTo("how-it-works")} className="hover:text-slate-900 transition-colors">How It Works</button>
          <button onClick={() => scrollTo("campaigns")} className="hover:text-slate-900 transition-colors">Campaigns</button>
          <button onClick={() => scrollTo("faq")} className="hover:text-slate-900 transition-colors">FAQ</button>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-sm font-semibold">
            <button
              onClick={() => setMode("creator")}
              className={`pb-0.5 border-b-2 transition-colors ${mode === "creator" ? "text-[#0084CC] border-[#0084CC]" : "text-slate-400 border-transparent hover:text-slate-600"}`}
            >
              Creator
            </button>
            <span className="text-slate-300">/</span>
            <button
              onClick={() => setMode("brand")}
              className={`pb-0.5 border-b-2 transition-colors ${mode === "brand" ? "text-[#0084CC] border-[#0084CC]" : "text-slate-400 border-transparent hover:text-slate-600"}`}
            >
              Brand
            </button>
          </div>
          <button
            onClick={() => navigate("/campaigns")}
            className="h-10 px-5 rounded-full bg-[#00A3E0] hover:bg-[#0084CC] text-white text-sm font-bold shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-1.5"
          >
            {mode === "creator" ? "Start Earning" : "Launch Campaign"} <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </header>
  );
}