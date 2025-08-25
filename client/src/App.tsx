import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "./context/hooks.ts";
// import { useEffect } from "react";
// import { loadUser } from "./context/user/userSlice";
import Home from "./pages/home.tsx";
import Product from "./pages/product.tsx";
import Products from "./pages/products.tsx";
import Login from "./pages/login.tsx";
import Signup from "./pages/signup.tsx";
import ProtectedRoute from "./comp/common/ProtectedRoute.tsx";
import CreateProduct from "./pages/admin/createProduct.tsx";
import Profile from "./pages/profile.tsx";
import CartPage from "./pages/cart.tsx";
import AdminHome from "./pages/admin/admin.tsx";
// import { loadUser } from "./context/user/userSlice.ts";
import EditProduct from "./pages/admin/eProduct.tsx";

import ForgotPasswordPage from "./pages/rPassword.tsx";
import PaymentC from "./comp/payment/Payment.tsx";
import ScrollToTop from "./comp/common/ScrollToTop.tsx";
import ProductsByTag from "./pages/tagProduct.tsx";

function App(): JSX.Element {
  // const dispatch = useAppDispatch();
  // const { isAuthenticated } = useAppSelector((state) => state.user);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(loadUser());
  //   }
  // }, [dispatch]);

  return (
    <Router>
       <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/products/tag/:tag" element={<ProductsByTag />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/payment" element={<PaymentC/>}/>
         <Route path="/reset-password" element={<ForgotPasswordPage/>}/>
        {/* admin routes */}
        <Route path="/admin/product/create" element={<ProtectedRoute element={<CreateProduct/>}  adminOnly={true}/>}/>
        <Route path="/admin" element={<ProtectedRoute element={<AdminHome/>} adminOnly={true}/>}/>
        <Route path="/admin/product/edit/:id" element={<ProtectedRoute element={<EditProduct/>} adminOnly={true}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
