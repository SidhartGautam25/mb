import React, { useRef } from "react";
import { MdPhoneIphone, MdComputer, MdWatch, MdCameraAlt, MdHeadset, MdGames } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const categories = [
  { label: "Phones", icon: <MdPhoneIphone size={24} className="text-gray-700" /> },
  { label: "Computers", icon: <MdComputer size={24} className="text-gray-700" /> },
  { label: "SmartWatch", icon: <MdWatch size={24} className="text-gray-700" /> },
  { label: "Camera", icon: <MdCameraAlt size={24} className="text-gray-700" /> },
  { label: "Headphones", icon: <MdHeadset size={24} className="text-gray-700" /> },
  { label: "Gaming", icon: <MdGames size={24} className="text-gray-700" /> },
    { label: "Phones", icon: <MdPhoneIphone size={24} className="text-gray-700" /> },
  { label: "Computers", icon: <MdComputer size={24} className="text-gray-700" /> },
  { label: "SmartWatch", icon: <MdWatch size={24} className="text-gray-700" /> },
  { label: "Camera", icon: <MdCameraAlt size={24} className="text-gray-700" /> },
  { label: "Headphones", icon: <MdHeadset size={24} className="text-gray-700" /> },
  { label: "Gaming", icon: <MdGames size={24} className="text-gray-700" /> },
];

const CategorySection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -240 : 240,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full px-4 md:px-8 py-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Browse By Category</h2>
          <div className="w-12 h-1 bg-blue-500 mt-2 rounded-full"></div>
        </div>
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white shadow hover:bg-gray-100 border rounded-full z-10 flex items-center justify-center"
          >
            <FaArrowLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white shadow hover:bg-gray-100 border rounded-full z-10 flex items-center justify-center"
          >
            <FaArrowRight size={16} />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide py-4"
          >
            {categories.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-28 h-28 md:w-32 md:h-32 bg-gray-50 hover:bg-gray-100 rounded-lg flex flex-col items-center justify-center border transition cursor-pointer"
              >
                <div className="mb-2 p-2 bg-white rounded-full shadow">{item.icon}</div>
                <span className="text-xs md:text-sm font-medium text-gray-700 text-center">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
