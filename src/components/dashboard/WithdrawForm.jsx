import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Banknote } from "lucide-react";

const METHODS = [
  { value: "Virement Bancaire", label: "Virement Bancaire (24h - SEPA)", placeholder: "IBAN (FR76...)" },
  { value: "PayPal", label: "PayPal (instantané)", placeholder: "Adresse e-mail PayPal" },
  { value: "Wise", label: "Wise (1-2 jours)", placeholder: "Adresse e-mail Wise" },
];

export default function WithdrawForm({ available, onWithdrawn }) {
  const [method, setMethod] = useState("Virement Bancaire");
  const [amount, setAmount] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const current = METHODS.find((m) => m.value === method);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const value = parseFloat(amount);
    if (!value || value <= 0) return setError("Saisis un montant valide.");
    if (value > available) return setError(`Montant supérieur au solde disponible ($${available.toFixed(2)}).`);
    if (!destination.trim()) return setError("Renseigne une adresse de destination.");

    setLoading(true);
    try {
      await base44.entities.Withdrawal.create({ amount: value, method, destination: destination.trim(), status: "pending" });
      setAmount(""); setDestination("");
      onWithdrawn();
    } catch (err) {
      setError(err.message || "Échec de la demande.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-6">
      <h2 className="text-lg font-extrabold text-slate-900">Effectuer un retrait de gains</h2>
      <p className="text-sm text-slate-500 mt-1 mb-5">Choisis ta méthode de paiement et l'adresse de destination pour retirer tout ou partie de tes gains cumulés.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>}

        <div className="space-y-2">
          <Label>Méthode de retrait</Label>
          <Select value={method} onValueChange={(v) => { setMethod(v); setDestination(""); }}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {METHODS.map((m) => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Montant ($ USD)</Label>
          <Input id="amount" type="number" min="1" step="0.01" placeholder="100" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <p className="text-xs text-slate-400">Solde max disponible : ${available.toFixed(2)}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination">Adresse de destination ou de compte</Label>
          <Input id="destination" placeholder={current.placeholder} value={destination} onChange={(e) => setDestination(e.target.value)} />
        </div>

        <button type="submit" disabled={loading || available <= 0} className="w-full h-12 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-bold shadow-lg shadow-amber-500/25 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Traitement...</> : <><Banknote className="w-4 h-4" /> Demander le retrait{amount ? ` ($${parseFloat(amount || 0).toFixed(2)} USD)` : ""}</>}
        </button>
      </form>
    </div>
  );
}