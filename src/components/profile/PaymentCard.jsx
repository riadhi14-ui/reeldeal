import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet } from "lucide-react";

export default function PaymentCard({ form, set, setField }) {
  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <Wallet className="w-5 h-5 text-[#DC2626]" />
        <h2 className="font-extrabold text-slate-900">Moyen de paiement</h2>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Méthode</Label>
          <Select value={form.payment_method} onValueChange={(v) => setField("payment_method", v)}>
            <SelectTrigger><SelectValue placeholder="Choisis une méthode" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="bank">Virement bancaire (IBAN)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="payment_detail">{form.payment_method === "bank" ? "IBAN" : "Email PayPal"}</Label>
          <Input
            id="payment_detail"
            value={form.payment_detail}
            onChange={set("payment_detail")}
            placeholder={form.payment_method === "bank" ? "FR76 XXXX XXXX XXXX..." : "ton@email.com"}
          />
        </div>
        <p className="text-xs text-slate-400">Tes gains validés sont versés chaque semaine sur ce compte.</p>
      </div>
    </div>
  );
}