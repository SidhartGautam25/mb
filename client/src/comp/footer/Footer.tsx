import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white px-4 md:px-10 pt-10 pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-center sm:text-left">
        {/* Grocery/Subscribe */}
        <div>
          <h2 className="text-base font-bold mb-2">Grocery</h2>
          <p className="mb-3 text-gray-300">Subscribe</p>
          <p className="mb-3 text-gray-400">Get 10% off your first order</p>
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch border border-gray-400 rounded-md overflow-hidden max-w-xs mx-auto sm:mx-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent px-3 py-2 text-white placeholder-gray-400 focus:outline-none w-full"
            />
            <button className="bg-white text-black px-3 flex items-center justify-center w-full sm:w-auto">
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-base font-bold mb-2">Support</h2>
          <p className="mb-2 text-gray-400">
            1st Floor Captain Complex, Naka 5, Near Kotwali Thana,
            Darbhanga, PO Lalbagh, PS Laheria Sarai,
            Dist Darbhanga, Bihar 846004
          </p>
          <p className="mb-2 text-gray-400">snapbharat@support</p>
          <p className="text-gray-400">9508247637</p>
        </div>

        {/* Account */}
        <div>
          <h2 className="text-base font-bold mb-2">Account</h2>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#">My Account</a>
            </li>
            <li>
              <a href="#">Login / Register</a>
            </li>
            <li>
              <a href="#">Cart</a>
            </li>
            <li>
              <a href="#">Wishlist</a>
            </li>
            <li>
              <a href="#">Shop</a>
            </li>
          </ul>
        </div>

        {/* Quick Link */}
        <div>
          <h2 className="text-base font-bold mb-2">Quick Link</h2>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms Of Use</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center text-xs text-gray-500 mt-10 border-t border-gray-700 pt-4">
        © Copyright 2025. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
