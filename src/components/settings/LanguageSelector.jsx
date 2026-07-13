import React from "react";
import { Check } from "lucide-react";

const LANGUAGES = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export default function LanguageSelector({ value, onChange }) {
  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-2">
      {LANGUAGES.map((lang) => {
        const active = value === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => onChange(lang.code)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-colors ${active ? "bg-red-50 text-[#DC2626] ring-1 ring-[#EF4444]" : "text-slate-700 hover:bg-slate-50"}`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="flex-1 text-left">{lang.label}</span>
            {active && <Check className="w-4 h-4" />}
          </button>
        );
      })}
    </div>
  );
}