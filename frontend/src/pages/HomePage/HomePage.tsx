import React from "react";

import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import Roles from "../../components/Roles/Roles";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";
//import Navbar from "../../components/Navbar/Navbar";

const HomePage = () => {
  return (
    <>
      
      <Hero />
      <Features />
      <Roles />
      <CTA />
      <Footer />
    </>
  );
};

export default HomePage;