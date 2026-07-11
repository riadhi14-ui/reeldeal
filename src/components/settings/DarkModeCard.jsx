import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Moon } from "lucide-react";

export default function DarkModeCard() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  const toggle = (checked) => {
    setDark(checked);
    document.documentElement.classList.toggle("dark", checked);
    localStorage.setItem("theme", checked ? "dark" : "light");
  };

  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <span className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
          <Moon className="w-5 h-5" />
        </span>
        <div>
          <p className="font-bold text-slate-900">Mode sombre</p>
          <p className="text-xs text-slate-400 mt-0.5">Interface plus douce pour les yeux le soir</p>
        </div>
      </div>
      <Switch checked={dark} onCheckedChange={toggle} />
    </div>
  );
}