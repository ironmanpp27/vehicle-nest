
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Vehicles", path: "/vehicles" },
    { name: "Register", path: "/register" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrollPosition > 20
      ? "py-3 bg-white/80 backdrop-blur-lg shadow-soft"
      : "py-5 bg-transparent"
  }`;

  return (
    <>
      <header className={navbarClasses}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-display font-semibold text-xl">VehicleNest</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="button-hover">
                Sign In
              </Button>
              <Button className="button-hover">
                Get Started
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background animate-fade-in pt-20">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xl font-medium py-2 transition-colors ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-border/50 my-2" />
            <Button variant="ghost" size="lg" className="justify-start px-0 button-hover">
              Sign In
            </Button>
            <Button size="lg" className="button-hover">
              Get Started
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-20" />
    </>
  );
};
