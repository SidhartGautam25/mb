import React from "react";
import Left from "./Left";
import Right from "./Right";

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row w-full max-w-7xl mx-auto my-8 bg-white h-[450px]">
      <Left />
      <div className="border-l border-gray-200"></div>
      <Right />
    </section>
  );
};

export default Hero;
