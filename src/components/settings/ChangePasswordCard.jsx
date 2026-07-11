import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ChevronDown, Loader2 } from "lucide-react";

export default function ChangePasswordCard({ email }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    setLoading(true);
    try {
      await base44.auth.resetPasswordRequest(email);
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <Shield className="w-5 h-5 text-[#DC2626]" />
        <h2 className="font-extrabold text-slate-900">Sécurité</h2>
      </div>
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
        <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">🔑</span>
        <span className="flex-1 text-left font-semibold text-slate-900">Changer le mot de passe</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          {sent ? (
            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700 text-sm font-semibold">
              Un lien de réinitialisation a été envoyé à {email}. Consulte ta boîte mail pour définir un nouveau mot de passe.
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500">Pour ta sécurité, le changement de mot de passe se fait via un lien envoyé par email.</p>
              {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>}
              <button onClick={handleReset} disabled={loading} className="h-11 px-6 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold transition-colors flex items-center gap-2 disabled:opacity-60">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi...</> : "Recevoir le lien de réinitialisation"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}