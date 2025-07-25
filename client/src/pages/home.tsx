import React from "react";
import Navbar from "../comp/navbar/Navbar";
import Footer from "../comp/footer/Footer";
import Hero from "../comp/hero/Hero";
import CategorySection from "../comp/home/Category";
import FlashSale from "../comp/home/flashsale/Flashsale";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FlashSale />
        <CategorySection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
