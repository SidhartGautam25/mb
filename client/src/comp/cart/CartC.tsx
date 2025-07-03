import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import CartCard from "./CartCard";
import { useEffect } from "react";
import { loadCartItems } from "../../context/cart/cartSlice";

const CartC: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  let totalCost: number = 0;
  let totalItem: number = 0;

  cartItems.forEach((item) => {
    totalCost += item.price * item.quantity; // Multiply price by quantity
    totalItem += item.quantity;
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      dispatch(loadCartItems());
    }
  }, [dispatch, cartItems.length]);

  const cardClicked = (id: string) => {
    navigate(`/product/${id}`);
  };

  // Total quantity and amount
 

  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
        Your Cart
      </h1>

      {/* Container for items and details */}
      {/* <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8"> */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">

        {/* Cart Items Section */}
        <div className="flex-1 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} onClick={() => cardClicked(item.id)}>
              <CartCard item={item} />
            </div>
          ))}
        </div>

        {/* Cart Details Section */}
        {/* <div className="w-full lg:w-80 bg-white rounded-xl shadow p-6"> */}
        <div className="w-full lg:w-80 bg-white rounded-xl shadow p-6 lg:sticky top-24">

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Cart Summary
          </h2>
          <div className="text-gray-700 space-y-2">
            <p className="flex justify-between">
              <span>Total Items:</span>
              <span className="font-medium">{totalItem}</span>
            </p>
            <p className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-medium">₹{totalCost.toFixed(2)}</span>
            </p>
          </div>
          <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartC;
