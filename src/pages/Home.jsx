import React, { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import HowItWorksBrand from "@/components/landing/HowItWorksBrand";
import Campaigns from "@/components/landing/Campaigns";
import Estimator from "@/components/landing/Estimator";
import EstimatorBrand from "@/components/landing/EstimatorBrand";
import Testimonials from "@/components/landing/Testimonials";
import LiveMetrics from "@/components/landing/LiveMetrics";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Home() {
  const [mode, setMode] = useState("creator");

  return (
    <div className="bg-white text-slate-900 font-body">
      <Navbar mode={mode} setMode={setMode} />
      <Hero mode={mode} setMode={setMode} />
      {mode === "brand" ? <HowItWorksBrand /> : <HowItWorks />}
      <Campaigns mode={mode} />
      {mode === "brand" ? <EstimatorBrand /> : <Estimator />}
      <Testimonials mode={mode} />
      <LiveMetrics />
      <FAQ mode={mode} />
      <Footer />
    </div>
  );
}