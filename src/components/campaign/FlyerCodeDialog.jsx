import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Ticket, Check, Copy, ExternalLink, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

const AFFILIATE_LINK = "https://flyercash.io/ugc";
const SIGNUP_LINK = "https://flyercash.io/ugc";

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={copy}
      className="shrink-0 inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-colors"
    >
      {copied ? <><Check className="w-4 h-4" /> Copié</> : <><Copy className="w-4 h-4" /> Copier</>}
    </button>
  );
}

export default function FlyerCodeDialog() {
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [existingCode, setExistingCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [noAccount, setNoAccount] = useState(false);

  useEffect(() => {
    base44.auth.me()
      .then((me) => { if (me?.flyer_code) setExistingCode(me.flyer_code); })
      .catch(() => {});
  }, []);

  const generate = async () => {
    const clean = name.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!clean) return;
    const newCode = `FLYER-${clean}-2026`;
    setSaving(true);
    setError("");
    setNoAccount(false);
    try {
      const res = await base44.functions.invoke("syncToFlyercash", { nom: name.trim(), code_unique: newCode });
      if (res?.data?.no_account) {
        setNoAccount(true);
        return;
      }
      await base44.auth.updateMe({ flyer_code: newCode });
      setCode(newCode);
      setExistingCode(newCode);
    } catch (err) {
      if (err?.response?.data?.no_account || err?.data?.no_account) {
        setNoAccount(true);
      } else {
        setError("Une erreur est survenue lors de la création du code. Réessaie dans un instant.");
      }
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setAccepted(false);
    setName("");
    setCode("");
    setSaving(false);
    setError("");
    setNoAccount(false);
  };

  // Code shown in the result view: either just-generated or the one saved on the account.
  const shownCode = code || existingCode;
  const hasCode = !!existingCode;

  return (
    <>
      <button
        onClick={() => { if (hasCode) setCode(existingCode); setOpen(true); }}
        className="mt-4 inline-flex h-14 px-10 items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-xl transition-all hover:scale-[1.03]"
      >
        <Ticket className="w-5 h-5" /> {hasCode ? "Voir mon code unique" : "Créer mon code unique"}
      </button>

      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold">{shownCode ? "Mon code unique" : "Créer mon code unique"}</DialogTitle>
          </DialogHeader>

          {!shownCode ? (
            <div className="space-y-5">
              <button
                onClick={() => setAccepted((a) => !a)}
                className="w-full flex items-start gap-3 text-left rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 hover:bg-slate-100 transition-colors"
              >
                <span className={`mt-0.5 w-6 h-6 shrink-0 rounded-lg flex items-center justify-center transition-colors ${accepted ? "bg-emerald-500 text-white" : "bg-white ring-1 ring-slate-300"}`}>
                  {accepted && <Check className="w-4 h-4" />}
                </span>
                <span className="text-sm text-slate-600 font-medium">
                  J'ai bien compris les conditions et j'ai regardé la vidéo avant de générer mon code.
                </span>
              </button>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Ton prénom</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Paul"
                  className="w-full h-12 px-4 rounded-2xl bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-[#EF4444] outline-none text-slate-900 font-semibold"
                />
              </div>

              {noAccount && (
                <div className="rounded-2xl bg-red-50 ring-1 ring-[#EF4444]/30 p-4 space-y-3">
                  <p className="text-sm font-semibold text-[#DC2626]">
                    Tu dois d'abord créer ton compte Flyercash avant de pouvoir générer ton code unique.
                  </p>
                  <a
                    href={SIGNUP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Créer mon compte Flyercash
                  </a>
                </div>
              )}

              {error && <p className="text-sm font-semibold text-[#DC2626]">{error}</p>}

              <button
                onClick={generate}
                disabled={!accepted || !name.trim() || saving}
                className="w-full h-12 rounded-2xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Création...</> : "Générer mon code"}
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Ton code unique</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-12 px-4 rounded-2xl bg-red-50 ring-1 ring-[#EF4444] flex items-center font-mono font-extrabold text-lg text-[#DC2626] truncate">
                    {shownCode}
                  </div>
                  <CopyButton value={shownCode} />
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Rends-toi sur ce lien</p>
                <div className="flex items-center gap-3">
                  <a
                    href={AFFILIATE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-12 px-4 rounded-2xl bg-slate-50 ring-1 ring-slate-200 flex items-center gap-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors truncate"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0 text-slate-400" />
                    <span className="truncate">{AFFILIATE_LINK}</span>
                  </a>
                  <CopyButton value={AFFILIATE_LINK} />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}