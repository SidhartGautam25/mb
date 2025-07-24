import React from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartCard: React.FC<{ item: CartItem }> = ({ item }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full border border-gray-200 hover:shadow-md transition">
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-32 h-32 object-cover rounded-md border border-gray-100"
      />

      {/* Product Details */}
      <div className="flex flex-col flex-1 w-full text-center sm:text-left">
        <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.name}</h3>

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
          <p className="text-gray-600 text-sm">
            Price: <span className="font-medium text-gray-800">₹{item.price}</span>
          </p>
          <p className="text-gray-600 text-sm">
            Quantity: <span className="font-medium text-gray-800">{item.quantity}</span>
          </p>
        </div>
      </div>

      {/* Actions (Optional Future Enhancements) */}
      {/* <div className="flex items-center space-x-2">
        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
          Remove
        </button>
      </div> */}
    </div>
  );
};

export default CartCard;
