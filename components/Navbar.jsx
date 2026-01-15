"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Find Work");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Find Work", href: "#hero" },
    { name: "Categories", href: "#categories" },
    { name: "Featured", href: "#featured" },
    { name: "CTA", href: "#cta" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Center detection for centered scrolling

      // Check each section
      for (const link of navLinks) {
        const section = document.querySelector(link.href);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveLink(link.name);
            break; // Found the active section, stop checking
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount to set initial active state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array as navLinks is constant for our purpose here

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      setActiveLink(navLinks.find((link) => link.href === href)?.name);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1dbf73]">
            <span className="text-xl font-bold text-white">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            SkillVerse
          </span>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-gray-100/50 border border-gray-200/50 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeLink === link.name
                  ? "bg-white text-[#1dbf73] shadow-sm ring-1 ring-gray-200"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Auth Buttons & Hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center">
            <Link href="/signup">
              <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300">
                Sign Up
              </button>
            </Link>
            <Link href="/login">
              <button className="relative px-5 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-[#1dbf73]/40 hover:-translate-y-0.5">
                <span className="bg-[#1dbf73] px-5 py-2 rounded-xl">
                  Log In
                </span>
              </button>
            </Link>
          </div>

          {/* Hamburger Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2 animate-fade-in-up">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                activeLink === link.name
                  ? "bg-gray-100 text-[#1dbf73]"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
            <Link href="/signup" className="w-full">
              <button className="w-full px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 text-left">
                Sign Up
              </button>
            </Link>
            <Link href="/login" className="w-full">
              <button className="relative w-full px-5 py-3 text-sm font-semibold text-white rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-[#1dbf73]/40">
                <div className="absolute inset-0 bg-[#1dbf73] transition-all duration-300 group-hover:scale-105"></div>
                <span className="relative z-10 flex justify-center">
                  Log In
                </span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
