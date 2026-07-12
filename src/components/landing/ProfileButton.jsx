import React, { useState, useEffect } from "react";
import { LogOut, User as UserIcon, ChevronDown } from "lucide-react";
import { base44 } from "@/api/base44Client";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { getAvatarEmoji, getAvatarImageUrl } from "@/lib/avatar";

export default function ProfileButton() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const name = user?.display_name || user?.full_name || user?.email?.split("@")[0] || "Mon compte";
  const roleLabel = user?.account_type === "brand" ? "Marque" : "Créateur";
  const avatar = getAvatarImageUrl(user);
  const emoji = getAvatarEmoji(user);
  const initial = name.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 h-10 pl-1.5 pr-3 rounded-full bg-white ring-1 ring-slate-200 hover:ring-slate-300 transition-all">
          <span className="w-7 h-7 rounded-full bg-[#EF4444] text-white flex items-center justify-center text-sm font-bold overflow-hidden shrink-0">
            {avatar ? <img src={avatar} alt={name} className="w-full h-full object-cover" /> : emoji ? <span className="text-base leading-none">{emoji}</span> : initial}
          </span>
          <span className="hidden sm:flex flex-col items-start leading-tight">
            <span className="text-xs font-bold text-slate-900 max-w-[100px] truncate">{name}</span>
            <span className="text-[10px] text-slate-400 font-semibold">{roleLabel}</span>
          </span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center gap-3 px-2 py-2.5">
          <span className="w-9 h-9 rounded-full bg-[#EF4444] text-white flex items-center justify-center font-bold overflow-hidden shrink-0">
            {avatar ? <img src={avatar} alt={name} className="w-full h-full object-cover" /> : emoji ? <span className="text-xl leading-none">{emoji}</span> : initial}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">{name}</p>
            <p className="text-xs text-slate-400">{roleLabel}</p>
          </div>
        </div>
        <DropdownMenuItem onClick={() => (window.location.href = "/profile")} className="cursor-pointer gap-2">
          <UserIcon className="w-4 h-4" /> Mon profil
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => base44.auth.logout("/")} className="cursor-pointer gap-2 text-[#DC2626] focus:text-[#DC2626]">
          <LogOut className="w-4 h-4" /> Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}