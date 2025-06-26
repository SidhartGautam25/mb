import React from "react";
import UserInfo from "../comp/profile/UserInfo";
import OrderHistory from "../comp/profile/OrderHistory";
import CartSection from "../comp/profile/CartSection";
import AdditionalDetails from "../comp/profile/AdditionalDetails";
import ProfilePic from "../comp/profile/ProfilePic";
import Navbar from "../comp/navbar/Navbar";
import Footer from "../comp/footer/Footer";

// --- Types ---
interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
}

interface CartItem {
  name: string;
  price: string;
  quantity: number;
}



const Profile: React.FC = () => {
  const dummyOrders: Order[] = [
    { id: "12345", date: "2025-06-24", status: "Delivered", total: "₹1200" },
    { id: "12346", date: "2025-06-15", status: "Shipped", total: "₹890" },
     { id: "12345", date: "2025-06-24", status: "Delivered", total: "₹1200" },
      { id: "12345", date: "2025-06-24", status: "Delivered", total: "₹1200" },
  ];

  const dummyCart: CartItem[] = [
    { name: "Wireless Mouse", price: "₹499", quantity: 1 },
    { name: "Keyboard", price: "₹999", quantity: 2 },
  ];

  return (
    <>
    <Navbar/>
    <div className=" bg-gray-100 p-4 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <div className="md:col-span-1 space-y-6">
        <ProfilePic />
        <UserInfo />
      </div>
      <div className="md:col-span-2 space-y-6">
        <OrderHistory orders={dummyOrders} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CartSection items={dummyCart} />
          <AdditionalDetails />
        </div>
      </div>
    </div>
    <Footer/>
    </>
   
  );
};

export default Profile;
