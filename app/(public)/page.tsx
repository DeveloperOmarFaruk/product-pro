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
      {/* -------------------------
          Navigation Bar at the top
         ------------------------- */}
      <LandingNavbar />

      {/* -------------------------
          Main content of the page
         ------------------------- */}
      <main>
        {/* Hero / Banner Section */}
        <HeroSection />

        {/* Key Features Section */}
        <FeaturesSection />

        {/* Products / Offerings Section */}
        <ProductsSection />

        {/* Customer Testimonials Section */}
        <TestimonialsSection />

        {/* Pricing / Plans Section */}
        <PricingSection />

        {/* About / Company Info Section */}
        <AboutSection />
      </main>

      {/* -------------------------
          Footer at the bottom
         ------------------------- */}
      <Footer />
    </>
  );
}
