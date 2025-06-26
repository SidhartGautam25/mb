import React, { useState } from "react";
import { useAppSelector } from "../../context/hooks";



const ProductImages: React.FC = () => {
  // const [selected, setSelected] = useState(images[0]);

   const { loading, error, product } = useAppSelector((state) => state.product);
   const images=[product?.image,product?.image,product?.image,product?.image];

  return (
    <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="img"
            // onClick={() => setSelected(img)}
            className={`w-16 h-16 object-cover border cursor-pointer border-gray-200`}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center p-4">
        {/* <img src={selected} alt="img" className="max-h-96 object-contain" /> */} 
        <img src={product?.image} alt="img" className="max-h-96 object-contain" /> 
      </div>
    </div>
  );
};

export default ProductImages;
