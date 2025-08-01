import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import CartCard from "./CartCard";
import { useEffect } from "react";
import { loadCartItems } from "../../context/cart/cartSlice";

const CartC: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  
  // Initialize variables with default values
  let totalCost: number = 0;
  let totalItem: number = 0;

  // Calculate totals
  cartItems.forEach((item) => {
    totalCost += Number(item.price) * Number(item.quantity);
    totalItem += Number(item.quantity);
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      dispatch(loadCartItems());
    }
  }, [dispatch, cartItems.length]);

  const cardClicked = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          Your cart is empty.
        </div>
      ) : (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
          {/* Cart Items Section */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                onClick={() => cardClicked(item.id)}
                className="cursor-pointer hover:scale-[1.01] transition-transform"
              >
                <CartCard item={item} />
              </div>
            ))}
          </div>

          {/* Cart Summary Section */}
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
      )}
    </div>
  );
};

export default CartC;