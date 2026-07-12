import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import BrandRequestForm from "@/components/brand/BrandRequestForm";

export default function RequestCampaignDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="h-11 px-6 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold shadow-lg shadow-red-500/25 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Demander une campagne
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl rounded-3xl max-h-[90vh] overflow-y-auto p-0 border-0 bg-transparent shadow-none">
        <DialogHeader className="sr-only"><DialogTitle>Demander une campagne</DialogTitle></DialogHeader>
        <BrandRequestForm onSent={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}