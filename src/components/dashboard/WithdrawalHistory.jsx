import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const statusConfig = {
  pending: { label: "En attente", cls: "bg-amber-50 text-amber-600" },
  completed: { label: "Réussi", cls: "bg-emerald-50 text-emerald-600" },
  failed: { label: "Échoué", cls: "bg-red-50 text-red-600" },
};

const maskDestination = (dest = "") => {
  if (dest.includes("@")) return dest;
  if (dest.length > 12) return `${dest.slice(0, 8)} ... ${dest.slice(-4)}`;
  return dest;
};

export default function WithdrawalHistory({ withdrawals }) {
  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-6">
      <h2 className="text-lg font-extrabold text-slate-900 mb-5">Derniers retraits & paiements</h2>

      {withdrawals.length === 0 ? (
        <p className="text-sm text-slate-500 py-6 text-center">Aucun retrait pour le moment. Tes demandes apparaîtront ici.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-left">
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">Méthode</th>
                <th className="pb-3 pr-4">Adresse / Compte</th>
                <th className="pb-3 pr-4">Statut</th>
                <th className="pb-3 text-right">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {withdrawals.map((w) => {
                const st = statusConfig[w.status] || statusConfig.pending;
                return (
                  <tr key={w.id}>
                    <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">{format(new Date(w.created_date), "dd MMM yyyy", { locale: fr })}</td>
                    <td className="py-3 pr-4 font-semibold text-slate-900 whitespace-nowrap">{w.method}</td>
                    <td className="py-3 pr-4 text-slate-500 font-mono text-xs">{maskDestination(w.destination)}</td>
                    <td className="py-3 pr-4"><span className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${st.cls}`}>{st.label}</span></td>
                    <td className="py-3 text-right font-extrabold text-slate-900 font-mono whitespace-nowrap">${w.amount.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}