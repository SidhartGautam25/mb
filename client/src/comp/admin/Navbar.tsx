import React from "react";


const Navbar: React.FC = () => {
  return (
    <header className="w-full px-4 md:px-10 py-4 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <div className="text-xl font-bold">Admin Panel</div>

     
      <nav className="hidden md:flex space-x-6 text-sm text-gray-800">
        <a href="/" className="hover:text-black">
         Dashboard
        </a>
        <a href="#" className="hover:text-black">
          Create Product
        </a>
        <a href="#" className="hover:text-black">
          Orders
        </a>
        <a href="/signup" className="hover:text-black">
          Categories
        </a>
      </nav> 

      {/* Right-side: search + icons - Adjusted spacing and icon sizes */}
      
    </header>
  );
};

export default Navbar;
