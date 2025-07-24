import React, { useState, useEffect, useRef } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { logout } from "../../context/user/userSlice";
import { clearCart } from "../../context/cart/cartSlice";
import { toast } from "react-toastify";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      dispatch(clearCart());
      setIsDropdownOpen(false);
      toast.success("Logged out successfully", { position: "top-center" });
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Logout failed. Please try again.", {
        position: "top-center",
      });
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-gray-800">
          Mithila Bazar
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="pl-4 pr-8 py-2 text-sm bg-gray-100 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Icons */}
          <button className="p-1 hover:bg-gray-100 rounded-full" aria-label="Wishlist">
            <FaHeart className="text-xl text-gray-700" />
          </button>
          <a href="/cart" className="p-1 hover:bg-gray-100 rounded-full" aria-label="Cart">
            <FaShoppingCart className="text-xl text-gray-700" />
          </a>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {isAuthenticated ? (
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-1 hover:bg-gray-100 rounded-full focus:outline-none"
                aria-label="User menu"
              >
                <FaUser className="text-xl text-gray-700" />
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
              >
                Login
              </button>
            )}

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <FaUserCircle className="mr-3 text-lg" />
                  Profile
                </button>
                <div className="border-t border-gray-100"></div>
                <button
                  className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <FaQuestionCircle className="mr-3 text-lg" />
                  Help
                </button>
                <div className="border-t border-gray-100"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <FaSignOutAlt className="mr-3 text-lg" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <FaTimes className="text-2xl text-gray-700" />
          ) : (
            <FaBars className="text-2xl text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-4 pr-8 py-2 text-sm bg-gray-100 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <div className="flex space-x-6">
            <button className="p-1 hover:bg-gray-100 rounded-full" aria-label="Wishlist">
              <FaHeart className="text-xl text-gray-700" />
            </button>
            <a href="/cart" className="p-1 hover:bg-gray-100 rounded-full" aria-label="Cart">
              <FaShoppingCart className="text-xl text-gray-700" />
            </a>
            {isAuthenticated ? (
              <button
                onClick={() => navigate("/profile")}
                className="p-1 hover:bg-gray-100 rounded-full"
                aria-label="Profile"
              >
                <FaUser className="text-xl text-gray-700" />
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition w-full text-center"
              >
                Login
              </button>
            )}
          </div>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <FaSignOutAlt className="mr-3 text-lg" />
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
