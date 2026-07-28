import React, { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import PayoutRow from "@/components/brand/PayoutRow";

// Regroupe les vidéos approuvées par (campagne + créateur), cumule les vues
// et calcule ce qui a déjà été payé (PaymentLog) pour éviter tout double paiement.
export default function PayoutTracker({ submissions, campaignsById }) {
  const [payments, setPayments] = useState([]);
  const [payingKey, setPayingKey] = useState(null);

  const load = useCallback(async () => {
    const me = await base44.auth.me();
    const logs = await base44.entities.PaymentLog.filter({ created_by_id: me.id }, "-created_date").catch(() => []);
    setPayments(logs);
  }, []);

  useEffect(() => { load(); }, [load]);

  const groups = {};
  submissions.filter((s) => s.status === "approved").forEach((s) => {
    const key = `${s.campaign_id}|${s.created_by_id}`;
    if (!groups[key]) groups[key] = { key, campaign_id: s.campaign_id, campaign_name: s.campaign_name, creator_id: s.created_by_id, creator_name: s.creator_name || "", views: 0, videos: 0 };
    groups[key].views += s.views || 0;
    groups[key].videos += 1;
    if (s.creator_name) groups[key].creator_name = s.creator_name;
  });

  const paidByKey = {};
  payments.forEach((p) => {
    const key = `${p.campaign_id}|${p.creator_id}`;
    if (!paidByKey[key]) paidByKey[key] = { views: 0, amount: 0 };
    paidByKey[key].views += p.views_paid || 0;
    paidByKey[key].amount += p.amount || 0;
  });

  const rows = Object.values(groups).map((g) => {
    const rate = campaignsById[g.campaign_id]?.rate || 0;
    const paid = paidByKey[g.key] || { views: 0, amount: 0 };
    const dueViews = Math.max(g.views - paid.views, 0);
    // On ne paie que par palier complet de 1000 vues.
    const payableViews = Math.floor(dueViews / 1000) * 1000;
    const amountDue = Math.round((payableViews / 1000) * rate * 100) / 100;
    return { ...g, rate, paidViews: paid.views, paidAmount: paid.amount, dueViews, payableViews, amountDue };
  });

  const pay = async (row) => {
    setPayingKey(row.key);
    await base44.entities.PaymentLog.create({
      campaign_id: row.campaign_id,
      campaign_name: row.campaign_name,
      creator_id: row.creator_id,
      creator_name: row.creator_name,
      views_paid: row.payableViews,
      amount: row.amountDue,
      rate: row.rate,
    });
    await load();
    setPayingKey(null);
  };

  if (rows.length === 0) {
    return (
      <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-8 text-center text-sm text-slate-400">
        Aucune vidéo approuvée pour le moment. Le suivi des paiements par créateur apparaîtra ici.
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm divide-y divide-slate-100 overflow-hidden">
      {rows.map((row) => (
        <PayoutRow key={row.key} row={row} paying={payingKey === row.key} onPay={() => pay(row)} />
      ))}
    </div>
  );
}