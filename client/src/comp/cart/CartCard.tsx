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
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4 w-full">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="flex flex-col flex-1 w-full">
        <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
        <p className="text-gray-600 text-sm">Price: ₹{item.price}</p>
        <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
      </div>
    </div>
  );
};


export default CartCard;
