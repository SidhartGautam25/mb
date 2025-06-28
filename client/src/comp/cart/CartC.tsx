import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import CartCard from "./CartCard";
import { useEffect } from "react";
import { loadCartItems } from "../../context/cart/cartSlice";

const CartC: React.FC = () => {
  //   const { cartItems } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();

  const { cartItems, loading, error } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("you ran useEffcet of cart compoent");
    if (cartItems.length === 0) {
      dispatch(loadCartItems());
    }
  }, [dispatch, cartItems.length]);

  const cardClicked = (id: string) => {
    const url = `/product/${id}`;
    navigate(url);
  };

  return (
    <div className=" bg-gray-100 p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h1>
      {cartItems.map((item) => (
        <div onClick={() => cardClicked(item.id)}>
          <CartCard key={item.id} item={item} />
        </div>
      ))}
    </div>
  );
};

export default CartC;
