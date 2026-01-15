"use client";
import Footer from "@/components/footer/Footer";
import AboutSection from "@/components/landing/AboutSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import PricingSection from "@/components/landing/PricingSection";
import ProductsSection from "@/components/landing/ProductsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import LandingNavbar from "@/components/navbar/LandingNavbar";
import React from "react";

export default function HomePage() {
  return (
    <>
      <LandingNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProductsSection />
        <TestimonialsSection />
        <PricingSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
