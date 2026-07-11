import React from "react";
import { useBrand } from "@/components/brand/BrandLayout";
import BrandMessages from "@/components/brand/BrandMessages";

export default function BrandMessagesPage() {
  const { campaigns } = useBrand();

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-8">Messages</h1>
      <BrandMessages campaigns={campaigns} />
    </div>
  );
}