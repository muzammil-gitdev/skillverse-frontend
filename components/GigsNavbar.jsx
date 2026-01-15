"use client";

import Link from "next/link";
import { useState } from "react";

export default function GigsNavbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

                {/* Center: Search Bar */}
                <div className="flex-1 max-w-2xl mx-4">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400 group-focus-within:text-[#1dbf73] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1dbf73]/20 focus:border-[#1dbf73] transition-all duration-300 sm:text-sm"
                            placeholder="Find services or freelancers..."
                        />
                    </div>
                </div>

                {/* Right: Profile & Menu */}
                <div className="flex items-center gap-4 flex-shrink-0 relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="relative flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-colors focus:outline-none"
                    >
                        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-100 hover:border-[#1dbf73] transition-all">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="User profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 transform transition-all duration-200 origin-top-right ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                            <div className="px-4 py-3 border-b border-gray-50">
                                <p className="text-sm font-semibold text-gray-900">John Doe</p>
                                <p className="text-xs text-gray-500 truncate">john@example.com</p>
                            </div>
                            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1dbf73] transition-colors">
                                View Profile
                            </Link>
                            <Link href="/" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                Log Out
                            </Link>
                        </div>
                    </button>
                </div>
            </div>
        </nav>
    );
}
