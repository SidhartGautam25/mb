import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { categories } from "../../utils/categories";

const Left: React.FC = () => {
  return (
    <div className="w-full md:w-1/4 lg:w-1/5 border-r border-gray-200 pl-4 pr-6 py-6 flex flex-col h-[460px]">
      <h3 className="text-lg font-semibold mb-5 text-gray-900">Categories</h3>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <ul className="space-y-4 text-base text-gray-700">
          {categories.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center cursor-pointer hover:text-black hover:font-medium transition-all"
            >
              <a href={`/products/${item.str}`}>
                <span className="flex-1">{item.name}</span>
              </a>
              <FaChevronRight className="text-sm ml-2" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Left;