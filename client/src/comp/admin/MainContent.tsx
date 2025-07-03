// components/dashboard/MainContent.tsx
import React from "react";
import UsersComponent from "./hero/Users";
import OrdersComponent from "./hero/Orders";
import ProductsComponent from "./hero/Products";
// import CreatesComponent from "./hero/CreateProduct";
import CProductC from "./CProduct";
interface MainContentProps {
  activeSection: string;
}

const MainContent: React.FC<MainContentProps> = ({ activeSection }) => {
  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
      {activeSection === "Users" && <UsersComponent />}
      {activeSection === "Orders" && <OrdersComponent />}
      {activeSection === "Create" && <CProductC />}
      {activeSection === "Products" && <ProductsComponent />}
    </div>
  );
};

export default MainContent;
