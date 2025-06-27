import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { useParams } from "react-router-dom";
import { addItemsToCart, removeMessage } from "../../context/cart/cartSlice";
import { toast } from "react-toastify";
import {
  getProductDetails,
  removeErrors,
} from "../../context/product/productSlice";



interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}


const ProductInfo: React.FC = () => {
  // const [qty, setQty] = useState(1);
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [isQuantityInitialized, setIsQuantityInitialized] = useState(false);

  const { loading, error, product } = useAppSelector((state) => state.product);
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const {
    loading: cartLoading,
    error: cartError,
    success,
    message,
    cartItems,
  } = useAppSelector((state) => state.cart);
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const cartItem = useMemo(() => {
    if (!id) {
      return null;
    }
    return cartItems.find((item) => item.id === id) || null;
  }, [cartItems, id]);

  const isInCart = useMemo(() => !!cartItem, [cartItem]);

  // IMPROVEMENT: Initialize quantity from cart item on component mount
  useEffect(() => {
    if (cartItem && !isQuantityInitialized) {
      setQuantity(cartItem.quantity);
      setIsQuantityInitialized(true);
    } else if (!cartItem && !isQuantityInitialized) {
      setQuantity(1);
      setIsQuantityInitialized(true);
    }
  }, [cartItem, isQuantityInitialized]);

  // const addToCart = () => {
  //   console.log("add to cart function");
  //   if (isAuthenticated) {
  //     console.log("your are authenticated");
  //     const productId = id ?? "1";
  //     const item = {
  //       id: productId,
  //       name: product?.name,
  //       image: product?.image,
  //       price: product?.price,
  //       quantity: quantity,
  //     };
  //     dispatch(addItemsToCart(item));
  //   } else {
  //     console.log("sorry you are logged out");
  //     toast.error("Please login first to add items to cart", {
  //       position: "top-center",
  //       autoClose: 3000,
  //     });
  //   }
  // };

  const addToCart = useCallback(() => {
    if (!isAuthenticated) {
      toast.error("Please Login First to add items to cart", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    if(!id || !product){
       toast.error("Product information is not available", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
     if (quantity > (product.stock || 0)) {
      toast.error(`Only ${product.stock} items available in stock`, {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    const item: CartItem = {
      id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: quantity,
    };

    dispatch(addItemsToCart(item));
  },[isAuthenticated,id,product,quantity,dispatch]);

  useEffect(() => {
    if (!id) {
      toast.error("Error while loading Product", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      dispatch(getProductDetails(id));
    }
  }, [id,dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Error while loading Product", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
    if (cartError) {
      toast.error(cartError, { position: "top-center", autoClose: 3000 });
    }
  }, [dispatch, error, cartError]);

  useEffect(() => {
    if (success) {
      toast.success(message, { position: "top-center", autoClose: 3000 });
      dispatch(removeMessage());
    }
  }, [dispatch, success, message]);

  // const decreaseQuantity = () => {
  //   if (quantity <= 1) {
  //     toast.error("Quantity cannot be less than 1", {
  //       position: "top-center",
  //       autoClose: 3000,
  //     });
  //     dispatch(removeErrors());
  //     return;
  //   }
  //   setQuantity((qty) => qty - 1);
  // };

  const decreaseQuantity=useCallback(()=>{
    if(quantity==1){
       toast.error("Quantity cannot be less than 1", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    const newQuantity=quantity-1;
    setQuantity(newQuantity);

    if(cartItem){
     // dispatch action for updating quantity of the item
    }

  },[quantity,cartItem,id,dispatch]);
  // const increaseQuantity = () => {
  //   if (product?.stock <= quantity) {
  //     toast.error("Cannot exceed available Stock!", {
  //       position: "top-center",
  //       autoClose: 3000,
  //     });
  //     dispatch(removeErrors());
  //     return;
  //   }
  //   setQuantity((qty) => qty + 1);
  // };

  const increaseQuantity=useCallback(()=>{
    const newQuantity=quantity+1;
    setQuantity(newQuantity);
    if(cartItem){
      // dispatch action for updating quantity of the item
    }
  },[quantity,cartItem,id,dispatch])


   if (!id) {
    return (
      <div className="w-full md:w-1/2 px-4 py-6">
        <div className="text-center text-red-500">Invalid product ID</div>
      </div>
    );
  }

   if (loading) {
    return (
      <div className="w-full md:w-1/2 px-4 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-16 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

    if (!product) {
    return (
      <div className="w-full md:w-1/2 px-4 py-6">
        <div className="text-center text-red-500">Product not found</div>
      </div>
    );
  }


  return (
    <>
      {loading ? (
        <div>Laoding Details</div>
      ) : (
        <div className="w-full md:w-1/2 px-4 py-6 space-y-4">
          <h1 className="text-xl font-semibold">{product?.name || "Product Name"}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>⭐⭐⭐⭐☆</span>
            <span>(150 Reviews)</span>
            <span className="text-green-600 ml-2">In Stock</span>
          </div>

          <div className="text-xl font-bold">Rs {product?.price || "Price not available"}</div>
          <p className="text-sm text-gray-600">{product?.description || "description not available"}</p>

          <hr />

          {/* Colours */}
          <div className="flex items-center gap-2">
            <span>Colours:</span>
            <button className="w-4 h-4 rounded-full bg-red-500 border" />
            <button className="w-4 h-4 rounded-full bg-blue-600 border" />
          </div>

          {/* Size */}
          <div className="flex items-center gap-2">
            <span>Size:</span>
            {sizes.map((size) => (
              <button
                key={size}
                className={`px-3 py-1 border rounded ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "text-black border-gray-300"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quantity and Actions */}
          <div className="flex items-center gap-2">
            <button onClick={decreaseQuantity} className="px-3 py-1 border">
              −
            </button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity} className="px-3 py-1 border">
              +
            </button>

            {/* {ind == -1 ? (
              <button
                className="ml-4 bg-red-500 text-white px-5 py-2 rounded"
                onClick={() => addToCart()}
              >
                Add To Cart
              </button>
            ) : (
              <button className="ml-4 bg-green-500 text-white px-5 py-2 rounded">
                Added to cart
              </button>
            )} */}

            {!isInCart ?(
               <button
            className={`ml-4 px-5 py-2 rounded transition-colors ${
              cartLoading || product.stock === 0
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
            onClick={addToCart}
            disabled={cartLoading || product.stock === 0}
          >
            {cartLoading ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add To Cart"}
          </button>
            ):( <div className="ml-4 flex items-center gap-2">
            <button className="bg-green-500 text-white px-5 py-2 rounded">
              ✓ In Cart ({cartItem?.quantity})
            </button>
            {/* IMPROVEMENT: Added option to remove from cart */}
            <button 
              className="text-red-500 text-sm underline hover:text-red-700"
              onClick={() => {
                // This would need a removeFromCart action
                // dispatch(removeFromCart(id));
              }}
            >
              Remove
            </button>
          </div>)}

            <button className="ml-2 border p-2 rounded">
              <AiOutlineHeart size={20} />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border mt-4 divide-y">
            <div className="px-4 py-2 text-sm">
              <strong>Free Delivery</strong>
              <div className="text-gray-600 text-xs">
                Enter your postal code for Delivery Availability
              </div>
            </div>
            <div className="px-4 py-2 text-sm">
              <strong>Return Delivery</strong>
              <div className="text-gray-600 text-xs">
                Free 30 Days Delivery Returns. Details
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductInfo;
