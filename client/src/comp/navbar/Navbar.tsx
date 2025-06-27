import React, { useEffect, useRef, useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaUserCircle,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { logout } from "../../context/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../../context/cart/cartSlice";
// import { AppDispatch } from "../../context/store";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      console.log("Attempting to logout user...");

      // Dispatch logout action and wait for it to complete
      await dispatch(logout()).unwrap();

      // Clear cart data on successful logout
      dispatch(clearCart());

      // Close dropdown
      setIsDropdownOpen(false);

      // Show success message
      toast.success("You have been successfully logged out!", {
        position: "top-center",
        autoClose: 3000,
      });

      // Navigate to home page
      navigate("/");
    } catch (error: any) {
      console.error("Logout failed:", error);

      // Show error message
      toast.error(error.message || "Logout failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };
  const GoToProfile = () => {
    navigate("/profile");
  };
  useEffect(() => {
    if (!isAuthenticated) {
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    // <header className="w-full px-4 md:px-10 py-4 flex justify-between items-center shadow-sm">
    //   {/* Logo */}
    //   <a href="/"><div className="text-xl font-bold">Mithila Bazar</div></a>

    //   {/* Nav links
    //   <nav className="hidden md:flex space-x-6 text-sm text-gray-800">
    //     <a href="/" className="hover:text-black">
    //       Home
    //     </a>
    //     <a href="#" className="hover:text-black">
    //       Contact
    //     </a>
    //     <a href="#" className="hover:text-black">
    //       About
    //     </a>
    //     <a href="/signup" className="hover:text-black">
    //       Sign Up
    //     </a>
    //   </nav> */}

    //   {/* Right-side: search + icons - Adjusted spacing and icon sizes */}
    //   <div className="flex items-center space-x-6 ml-8">
    //     {" "}
    //     {/* Increased space-x and added ml-8 */}
    //     {/* Search bar - moved left */}
    //     <div className="relative hidden md:block mr-4">
    //       {" "}
    //       {/* Added mr-4 */}
    //       <input
    //         type="text"
    //         placeholder="What are you looking for?"
    //         className="pl-4 pr-8 py-1 text-sm bg-gray-100 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
    //       />
    //       <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
    //     </div>
    //     {/* Icons - larger size */}
    //     <button className="p-1 hover:bg-gray-100 rounded-full">
    //       <FaHeart className="text-xl text-gray-700" />{" "}
    //       {/* text-xl instead of text-lg */}
    //     </button>
    //     <button className="p-1 hover:bg-gray-100 rounded-full">
    //       <FaShoppingCart className="text-xl text-gray-700" />
    //     </button>
    //     <button className="p-1 hover:bg-gray-100 rounded-full">
    //       <FaUser className="text-xl text-gray-700" />
    //     </button>
    //   </div>
    // </header>
    <header className="w-full px-4 md:px-10 py-4 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <a href="/">
        <div className="text-xl font-bold">Mithila Bazar</div>
      </a>

      {/* Right-side: search + icons */}
      <div className="flex items-center space-x-6 ml-8">
        {/* Search bar - moved left */}
        <div className="relative hidden md:block mr-4">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="pl-4 pr-8 py-1 text-sm bg-gray-100 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
        </div>

        {/* Icons */}
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <FaHeart className="text-xl text-gray-700" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <a href="/cart">
            <FaShoppingCart className="text-xl text-gray-700" />
          </a>
        </button>

        {/* User Icon with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          {isAuthenticated ? (
            <button
              onClick={toggleDropdown}
              className="p-1 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <FaUser className="text-xl text-gray-700" />
            </button>
          ) : (
            <button
              onClick={() => goToLogin()}
              className="
    inline-flex items-center justify-center
    px-4 py-2 
    bg-blue-600 hover:bg-blue-700 
    text-white font-medium text-xs
    border border-transparent rounded-lg
    transition-all duration-200 ease-in-out
    transform hover:scale-105 active:scale-95
    shadow-sm hover:shadow-md
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  "
            >
              <svg
                className="w-3.5 h-3.5 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Login
            </button>
          )}

          {/* Dropdown Menu */}
          {isDropdownOpen && isAuthenticated && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {/* Profile */}
              <button
                onClick={() => GoToProfile()}
                className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-150"
              >
                <FaUserCircle className="mr-3 text-lg text-gray-600" />
                <span className="font-medium">Profile</span>
              </button>

              {/* Divider */}
              <div className="border-t border-gray-100"></div>

              {/* Help */}
              <button
                // onClick={() => handleMenuItemClick('help')}
                className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-150"
              >
                <FaQuestionCircle className="mr-3 text-lg text-gray-600" />
                <span className="font-medium">Help</span>
              </button>

              {/* Divider */}
              <div className="border-t border-gray-100"></div>

              {/* Logout */}
              <button
                // onClick={() => handleMenuItemClick('logout')}
                className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors duration-150"
              >
                <FaSignOutAlt className="mr-3 text-lg text-gray-600" />
                <span className="font-medium" onClick={Logout}>
                  Logout
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar (appears below on small screens) */}
      <div className="absolute top-full left-0 right-0 px-4 py-2 bg-white shadow-sm md:hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full pl-4 pr-8 py-2 text-sm bg-gray-100 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
