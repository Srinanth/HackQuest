import React, { useState } from 'react';
import { Search, Bell, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Messages', path: '/messages' },
    { name: 'Files', path: '/files' },
    { name: 'Calendar', path: '/calendar' },
  ];

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left Side: Logo & Links */}
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="text-xl font-black text-slate-900 tracking-tighter">
              StudioConnect
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-1 py-5 text-sm font-bold transition-colors ${
                      isActive ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-3 md:gap-5">
            <button className="hidden sm:flex bg-slate-900 hover:bg-emerald-600 text-white px-5 py-2 rounded-full text-xs font-black transition-all active:scale-95 shadow-lg shadow-slate-200">
              New Chat
            </button>
            
            <div className="flex items-center gap-1">
              <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all">
                <Search size={20} />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full"></span>
              </button>
            </div>

            {/* Profile Avatar */}
            <button className="w-9 h-9 bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-full flex items-center justify-center text-xs font-black hover:bg-emerald-200 transition-colors">
              JV
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-50 p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-sm font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all"
            >
              {link.name}
            </Link>
          ))}
          <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-black text-sm mt-4">
            New Chat
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;