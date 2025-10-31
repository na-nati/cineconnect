import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Film, Menu, X, Heart, User, Home, Users } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Movies", path: "/movies", icon: Film },
    { name: "Community", path: "/community", icon: Users },
    { name: "Favorites", path: "/favorites", icon: Heart },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-700 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Film className="w-8 h-8 text-red-500 transition-transform group-hover:scale-110" />
            <span className="text-2xl font-bold bg-linear-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
              CineConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 transition-all relative group ${
                    isActive(link.path)
                      ? "text-red-500"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{link.name}</span>
                  {isActive(link.path) && (
                    <span className="absolute -bottom-5 left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_10px_rgb(239,68,68)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/auth">
              <button className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-300 hover:text-white hover:bg-red-700/20 transition-all">
                <User className="w-4 h-4" />
                Login
              </button>
            </Link>
            <Link to="/auth">
              <button className="px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-200 hover:text-red-500 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-slide-in bg-black/95 border-t border-red-700">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                      isActive(link.path)
                        ? "bg-red-600/20 text-red-500"
                        : "text-gray-300 hover:bg-red-700/20 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 px-4 pt-4 border-t border-red-800">
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-gray-300 hover:text-white hover:bg-red-700/20 transition-all">
                    <User className="w-4 h-4" />
                    Login
                  </button>
                </Link>
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
