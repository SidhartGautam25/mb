import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ProductCard from "./Card";

const products = [
  {
    id: 1,
    name: "Baby care product",
    image: "public/product_img/babycare.webp",
    discount: 40,
    price: 120,
    originalPrice: 160,
    rating: 4.5,
    reviews: 88,
  },
  {
    id: 2,
    name: "Dairy Product",
    image:  "public/product_img/dairy.avif",
    discount: 35,
    price: 960,
    originalPrice: 1160,
    rating: 4.3,
    reviews: 75,
  },
  {
    id: 3,
    name: "Vadilal ice-cream",
    image: "public/product_img/icecream.jpg",
    discount: 30,
    price: 370,
    originalPrice: 470,
    rating: 4.4,
    reviews: 99,
  },
  {
    id: 4,
    name: "Fruits & vegetable",
    image: "/product_img/vegetables.jpg",
    discount: 25,
    price: 375,
    originalPrice: 400,
    rating: 4.6,
    reviews: 99,
  },
  {
    id: 5,
    name: "Organic Vegetables",
    image: "/product_img/vegetables oil.jpg",
    discount: 20,
    price: 280,
    originalPrice: 350,
    rating: 4.7,
    reviews: 120,
  },
  {
    id: 6,
    name: "Organic Vegetables",
    image: "/product_img/vegetables.jpg",
    discount: 20,
    price: 280,
    originalPrice: 350,
    rating: 4.7,
    reviews: 120,
  },
  {
    id: 7,
    name: "Organic Vegetables",
    image: "/product_img/vegetables.jpg",
    discount: 20,
    price: 280,
    originalPrice: 350,
    rating: 4.7,
    reviews: 120,
  },
];

const FlashSale: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-gray-100 py-6">
      <div className="flex items-center mb-4 px-4">
        <span className="w-2 h-7 bg-red-500 mr-2 rounded-sm"></span>
        <h2 className="text-xl md:text-2xl font-semibold">Flash Sales</h2>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-4 pb-4 scroll-smooth scrollbar-hide"
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-48 sm:w-56 md:w-60">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {products.length > 3 && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10 hover:bg-gray-100"
            >
              <FaArrowLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10 hover:bg-gray-100"
            >
              <FaArrowRight size={16} />
            </button>
          </>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
          View All Products
        </button>
      </div>
    </section>
  );
};

export default FlashSale;
