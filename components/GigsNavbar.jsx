"use client";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { AccountContext } from "@/app/context/accountProvider";
export default function GigsNavbar() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setAccount, setUserId } = useContext(AccountContext);
  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    console.log(storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link href="/gigs" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1dbf73] shadow-inner">
            <span className="text-xl font-bold text-white">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 hidden md:block">
            SkillVerse
          </span>
        </Link>

        {/* Right: Profile */}
        <div className="flex items-center gap-4 flex-shrink-0 relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-colors focus:outline-none"
          >
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-100 hover:border-[#1dbf73] transition-all">
              <img
                src={user?.profilePic || "/default-avatar.png"} // fallback
                alt="User profile"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Dropdown */}
            <div
              className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 transform transition-all duration-200 origin-top-right ${
                isDropdownOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "email@example.com"}
                </p>
              </div>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1dbf73] transition-colors"
              >
                View Profile
              </Link>
              <Link
                href="/chat"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1dbf73] transition-colors"
              >
                Messages
              </Link>
              <Link
                href="/"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                onClick={() => {
                  localStorage.removeItem("user_data");
                  localStorage.removeItem("user_id");
                  setUserId(null);
                  setAccount(null);
                }} // logout
              >
                Log Out
              </Link>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
