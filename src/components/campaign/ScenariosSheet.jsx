import React, { useState } from "react";
import { ChevronRight, ArrowLeft, Copy, Check, User } from "lucide-react";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";

const FALLBACK_SCENARIOS = [
  { handle: "@ugc_eka", views: "248K", earnings: "0,21 $", script: "J'ai enregistré cette vidéo il y a quelques jours et je gagne déjà de l'argent avec l'app. Voici comment je fais pour transformer mes vues en revenus, étape par étape." },
  { handle: "@eloiljf", views: "18K", earnings: "18,25 $", script: "Non mais dites-moi que je suis pas le seul à gagner de l'argent avec ça ? Je poste une vidéo, elle fait des vues, et je suis payé. C'est aussi simple que ça." },
  { handle: "@gagnant", views: "13K", earnings: "7,42 $", script: "Le rugissement du V8 HEMI 6,2... mais le vrai bruit c'est celui de mon compte en banque quand mes vidéos décollent grâce à l'app." },
  { handle: "@nikhil", views: "13K", earnings: "13,03 $", script: "Tu vas gagner trente mille dollars ? Peut-être pas d'un coup, mais chaque vidéo publiée te rapporte, et ça s'accumule vite." },
  { handle: "@wildern", views: "6,2K", earnings: "0,78 $", script: "Toi, tu es chante, ça fait combien de temps que tu cherches un moyen simple de monétiser ton contenu ? La réponse est là." },
  { handle: "@rayon", views: "2,2K", earnings: "2,17 $", script: "Tu postes du contenu, mais tu ne gagnes rien ? Rejoins une campagne, publie ta vidéo, et sois payé pour chaque vue." },
];

export default function ScenariosSheet({ open, onOpenChange, campaign }) {
  const scenarios = campaign?.scenarios?.length ? campaign.scenarios : FALLBACK_SCENARIOS;
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);

  const copyScript = async () => {
    await navigator.clipboard.writeText(selected.script);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const close = (v) => { onOpenChange(v); if (!v) { setSelected(null); setCopied(false); } };

  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        {!selected ? (
          <>
            <SheetHeader className="p-6 pb-4 text-left">
              <SheetTitle className="text-2xl font-extrabold">Scénarios</SheetTitle>
              <SheetDescription>Choisis un script à recréer</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {scenarios.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(s)}
                  className="w-full flex items-center gap-3 px-6 py-3.5 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                    {s.avatar ? <img src={s.avatar} alt={s.handle} className="w-full h-full object-cover" /> : <User className="w-5 h-5 text-slate-400" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm text-slate-900 truncate">{s.handle}</p>
                    <p className="text-xs text-slate-500 truncate">{s.script}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold text-slate-500">{s.views}</p>
                    <p className="text-xs font-bold text-green-600">{s.earnings}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full">
            <div className="p-6 pb-4 border-b border-slate-100">
              <button onClick={() => setSelected(null)} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-4">
                <ArrowLeft className="w-4 h-4" /> Tous les scénarios
              </button>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                  {selected.avatar ? <img src={selected.avatar} alt={selected.handle} className="w-full h-full object-cover" /> : <User className="w-5 h-5 text-slate-400" />}
                </div>
                <div>
                  <p className="font-extrabold text-slate-900">{selected.handle}</p>
                  <p className="text-xs text-slate-500">{selected.views} vues · <span className="text-green-600 font-bold">{selected.earnings}</span></p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">Script</p>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{selected.script}</p>
            </div>
            <div className="p-6 border-t border-slate-100">
              <button
                onClick={copyScript}
                className="w-full h-12 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold shadow-lg shadow-red-500/25 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? <><Check className="w-4 h-4" /> Copié</> : <><Copy className="w-4 h-4" /> Copier le script</>}
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}