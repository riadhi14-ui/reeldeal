import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { goToMySpace } from "@/lib/accountType";
import ProfileButton from "@/components/landing/ProfileButton";
import { useLang } from "@/i18n/LanguageContext";

export default function Navbar({ mode = "creator", setMode = () => {} }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLang();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    base44.auth.isAuthenticated().then(setAuthed).catch(() => setAuthed(false));
  }, []);

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
          <img src="https://media.base44.com/images/public/6a4bcc3db03674ee37b93254/eb851557b_generated_image.png" alt="Logo ReelDeal" className="w-8 h-8 rounded-lg" />
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Reel<span className="text-[#DC2626]">Deal</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button onClick={() => scrollTo("how-it-works")} className="hover:text-slate-900 transition-colors">{t("navbar_how")}</button>
          <button onClick={() => scrollTo("campaigns")} className="hover:text-slate-900 transition-colors">{t("navbar_campaigns")}</button>
          <button onClick={() => scrollTo("faq")} className="hover:text-slate-900 transition-colors">{t("navbar_faq")}</button>
        </nav>

        <div className="flex items-center gap-4">
          {!authed && (
            <div className="hidden sm:flex items-center gap-1.5 text-sm font-semibold">
              <button
                onClick={() => setMode("creator")}
                className={`pb-0.5 border-b-2 transition-colors ${mode === "creator" ? "text-[#DC2626] border-[#DC2626]" : "text-slate-400 border-transparent hover:text-slate-600"}`}
              >
                {t("role_creator")}
              </button>
              <span className="text-slate-300">/</span>
              <button
                onClick={() => setMode("brand")}
                className={`pb-0.5 border-b-2 transition-colors ${mode === "brand" ? "text-[#DC2626] border-[#DC2626]" : "text-slate-400 border-transparent hover:text-slate-600"}`}
              >
                {t("role_brand")}
              </button>
            </div>
          )}
          {authed ? (
            <>
              <button
                onClick={goToMySpace}
                className="hidden sm:flex h-10 px-5 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold shadow-lg shadow-red-500/25 transition-all items-center gap-1.5"
              >
                {t("navbar_my_space")} <span aria-hidden>→</span>
              </button>
              <ProfileButton />
            </>
          ) : (
            <button
              onClick={() => navigate("/register")}
              className="h-10 px-5 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold shadow-lg shadow-red-500/25 transition-all flex items-center gap-1.5"
            >
              {mode === "creator" ? t("navbar_start_earning") : t("navbar_launch_campaign")} <span aria-hidden>→</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}