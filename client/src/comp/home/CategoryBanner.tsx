

const CategoryBanner = () => {
  return (
    <div className="bg-white w-full  ">
      {/* Mobile Layout - Stack vertically */}
      <div className="block md:hidden w-full px-4 py-0">
        {/* First row - One div */}
        <div className="w-full h-32 mb-2 bg-blue-500 border-2 border-gray-800 rounded-sm"></div>
        
        {/* Second row - Two divs */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="h-32 bg-green-500 border-2 border-gray-800 rounded-sm"></div>
          <div className="h-32 bg-purple-500 border-2 border-gray-800 rounded-sm"></div>
        </div>
        
        {/* Third row - Remaining divs */}
        <div className="grid grid-cols-4 gap-2">
          <div className="h-24 bg-orange-500 border-2 border-gray-800 rounded-sm"></div>
          <div className="h-24 bg-red-500 border-2 border-gray-800 rounded-sm"></div>
          <div className="h-24 bg-teal-500 border-2 border-gray-800 rounded-sm"></div>
          <div className="h-24 bg-indigo-500 border-2 border-gray-800 rounded-sm"></div>
        </div>
      </div>

      {/* Desktop Layout - Original grid */}
      <div className="hidden md:block w-full h-[70vh]">
        <div className="w-full h-full grid grid-cols-12 grid-rows-6 gap-2 px-4 lg:px-8">
          {/* Large left section */}
          <div className="col-span-4 row-span-6 bg-blue-500 border-2 border-gray-800 rounded-sm"></div>
          
          {/* Top center section */}
          <div className="col-span-5 row-span-3 bg-green-500 border-2 border-gray-800 rounded-sm"></div>
          
          {/* Top right section */}
          <div className="col-span-3 row-span-3 bg-purple-500 border-2 border-gray-800 rounded-sm"></div>
          
          {/* Bottom left of right side */}
          <div className="col-span-3 row-span-3 bg-orange-500 border-2 border-gray-800 rounded-sm"></div>
          
          {/* Bottom center of right side */}
          <div className="col-span-3 row-span-3 bg-red-500 border-2 border-gray-800 rounded-sm"></div>
          
         
          {/* Bottom right bottom */}
          <div className="col-span-2 row-span-2 bg-indigo-500 border-2 border-gray-800 rounded-sm"></div>
           {/* Bottom right top */}
          <div className="col-span-2 row-span-1 bg-teal-500 border-2 border-gray-800 rounded-sm"></div>
          
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;