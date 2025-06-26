import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./context/hooks.ts";
import { useEffect } from "react";
import { loadUser } from "./context/user/userSlice";
import Home from "./pages/home.tsx";
import Product from "./pages/product.tsx";
import Products from "./pages/products.tsx";
import Login from "./pages/login.tsx";
import Signup from "./pages/signup.tsx";
import ProtectedRoute from "./comp/common/ProtectedRoute.tsx";
import CreateProduct from "./pages/admin/createProduct.tsx";
import Profile from "./pages/profile.tsx";

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile/>}/>
        {/* admin routes */}
        <Route path="/admin/product/create" element={<ProtectedRoute element={<CreateProduct/>} />}/>
      </Routes>
    </Router>
  );
}

export default App;
