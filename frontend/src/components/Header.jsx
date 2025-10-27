import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-purple-600">
            BALALAIKA TV
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm">
            <a href="#" className="text-gray-700 hover:text-purple-600">Home</a>
            <a href="#" className="text-gray-700 hover:text-purple-600">Browse Contacts</a>
            <a href="#" className="text-gray-700 hover:text-purple-600">Download</a>
            <a href="#" className="text-gray-700 hover:text-purple-600">Privacy</a>
            <a href="#" className="text-purple-600 font-medium">Affiliate Program</a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={toggleMenu}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className="w-full h-0.5 bg-gray-600"></span>
              <span className="w-full h-0.5 bg-gray-600"></span>
              <span className="w-full h-0.5 bg-gray-600"></span>
            </div>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-gray-700 hover:text-purple-600 py-2">Home</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 py-2">Browse Contacts</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 py-2">Download</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 py-2">Privacy</a>
              <a href="#" className="text-purple-600 font-medium py-2">Affiliate Program</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;