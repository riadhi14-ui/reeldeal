import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, CheckCircle2, Phone, Mail } from "lucide-react";

const EMPTY = {
  company: "", contact_name: "", email: "", phone: "", website: "",
  content_type: "", description: "", payment_model: "par_1000_vues",
  payment_amount: "", budget: "", best_time_to_call: "",
};

const Field = ({ label, hint, children }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-bold text-slate-800">{label}</label>
    {hint && <p className="text-xs text-slate-400">{hint}</p>}
    {children}
  </div>
);

const inputClass = "w-full h-11 px-4 rounded-xl bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-[#EF4444] outline-none text-sm";

export default function BrandRequestForm({ onSent }) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const set = (key) => (e) => setForm((c) => ({ ...c, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.company.trim() || !form.contact_name.trim() || !form.email.trim()) {
      return setError("Renseigne au moins ta société, ton nom et ton email.");
    }
    setLoading(true);
    try {
      await base44.entities.BrandRequest.create(form);
      setSent(true);
    } catch (err) {
      setError(err.message || "Une erreur est survenue, réessaie.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-10 text-center max-w-2xl mx-auto">
        <span className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7" />
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900">Demande envoyée !</h2>
        <p className="text-sm text-slate-500 mt-2">Merci {form.contact_name.split(" ")[0]} — nous te recontactons rapidement au sujet de ta campagne UGC.</p>
        <button onClick={() => { setForm(EMPTY); setSent(false); }} className="mt-6 h-11 px-6 rounded-full bg-slate-100 text-slate-700 text-sm font-bold">
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">Décris ta campagne UGC</h2>
        <p className="text-sm text-slate-500 mt-1">Remplis ce formulaire, on te recontacte pour lancer ta campagne.</p>
      </div>

      {error && <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm">{error}</div>}

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Société *"><input className={inputClass} value={form.company} onChange={set("company")} placeholder="Nom de ta marque" /></Field>
        <Field label="Nom du contact *"><input className={inputClass} value={form.contact_name} onChange={set("contact_name")} placeholder="Ton nom" /></Field>
        <Field label="Email *"><input type="email" className={inputClass} value={form.email} onChange={set("email")} placeholder="toi@marque.fr" /></Field>
        <Field label="Téléphone"><input className={inputClass} value={form.phone} onChange={set("phone")} placeholder="Pour te rappeler" /></Field>
        <Field label="Site web"><input className={inputClass} value={form.website} onChange={set("website")} placeholder="https://..." /></Field>
        <Field label="Meilleur moment pour t'appeler"><input className={inputClass} value={form.best_time_to_call} onChange={set("best_time_to_call")} placeholder="Ex : en semaine 14h-18h" /></Field>
      </div>

      <Field label="Type de contenu à promouvoir" hint="Produit, service, application, marque...">
        <input className={inputClass} value={form.content_type} onChange={set("content_type")} placeholder="Ex : appli mobile, produit cosmétique..." />
      </Field>

      <Field label="Détaille ta demande" hint="Ce que tu veux mettre en avant, le style de vidéos, les plateformes visées...">
        <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-[#EF4444] outline-none text-sm resize-none" value={form.description} onChange={set("description")} placeholder="Décris ton projet..." />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Mode de rémunération des UGC">
          <select className={inputClass} value={form.payment_model} onChange={set("payment_model")}>
            <option value="par_1000_vues">Paiement par 1000 vues</option>
            <option value="fixe_par_video">Montant fixe par vidéo</option>
          </select>
        </Field>
        <Field label={form.payment_model === "par_1000_vues" ? "Montant par 1000 vues" : "Montant fixe par vidéo"}>
          <input className={inputClass} value={form.payment_amount} onChange={set("payment_amount")} placeholder="Ex : 2€ / 50€" />
        </Field>
      </div>

      <Field label="Budget total prévu" hint="Optionnel">
        <input className={inputClass} value={form.budget} onChange={set("budget")} placeholder="Ex : 1000€" />
      </Field>

      <button type="submit" disabled={loading} className="w-full h-12 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 disabled:opacity-60">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi...</> : <><Phone className="w-4 h-4" /> Envoyer ma demande</>}
      </button>
      <p className="text-xs text-slate-400 text-center">On te recontacte par email ou téléphone pour finaliser ta campagne.</p>

      <div className="flex items-center gap-2 justify-center pt-2 border-t border-slate-100 text-sm text-slate-500">
        <Mail className="w-4 h-4 text-[#DC2626]" />
        <span>Tu préfères écrire directement ? <a href="mailto:contact@reeldeal.fr" className="font-bold text-[#DC2626] hover:underline">contact@reeldeal.fr</a></span>
      </div>
    </form>
  );
}