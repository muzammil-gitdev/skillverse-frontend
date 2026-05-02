"use client";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AccountContext } from "@/app/context/accountProvider";
export default function GigsNavbar() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setAccount, setUserId } = useContext(AccountContext);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  // Handle search submit — navigates to /gigs?search=query
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const trimmed = searchQuery.trim();
      if (trimmed) {
        router.push(`/gigs?search=${encodeURIComponent(trimmed)}`);
      } else {
        router.push("/gigs");
      }
    }
  };

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

        {/* Middle: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl px-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for skills, services, or freelancers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#1dbf73]/10 focus:border-[#1dbf73] transition-all shadow-sm"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Right: Profile */}
        <div className="flex items-center gap-4 flex-shrink-0 relative">
          {/**drop down wallet */}
          <div className="relative">
            {/* 💼 Wallet Button */}
            <button
              onClick={() => setIsWalletOpen(!isWalletOpen)}
              className="hidden md:flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#1dbf73] border border-[#1dbf73] rounded-full hover:bg-[#19a463] transition-colors shadow-sm"
            >
              Wallet
            </button>

            {/* 🔽 Dropdown */}
            <div
              className={`absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 transition-all ${
                isWalletOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {/* Title */}
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">Wallet</p>
              </div>

              {/* Balances */}
              {/* Balances */}
              <div className="px-4 py-3 text-sm border-b border-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 uppercase font-medium">
                    Available
                  </span>
                  <span className="font-bold text-green-600">
                    ${Number(user?.availableBalance || 0).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500 uppercase font-medium">
                    Pending
                  </span>
                  <span className="font-bold text-amber-600">
                    {/* Note the Capital 'P' to match your schema */}$
                    {Number(user?.PendingBalance || 0).toFixed(2)}
                  </span>
                </div>
              </div>
              {/* Withdraw */}
              <div className="px-4 pb-2">
                <Link
                  href="/withdraw"
                  className="block w-full text-center px-3 py-2 rounded-lg text-sm font-medium bg-[#1dbf73] text-white hover:bg-[#19a463] transition"
                >
                  Withdraw Funds
                </Link>
              </div>
            </div>
          </div>
          {/**order button  */}
          <Link
            href="/orders"
            className="hidden md:flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
          >
            Orders
          </Link>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-colors focus:outline-none"
          >
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-100 hover:border-[#1dbf73] transition-all">
              <img
                src={
                  user?.profilePic ||
                  "https://res.cloudinary.com/dkr5ewnfu/image/upload/v1772314700/avatar_nzve1u.png"
                } // fallback
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
