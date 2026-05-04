"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminLogin } from "../../services/adminApi";

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      router.push("/admin");
    }
  }, [router]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await adminLogin(form);

      localStorage.setItem("adminToken", res.token);

      router.push("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] relative">
      <Link
        href="/"
        className="link-back flex items-center gap-1 absolute top-4 left-4 text-gray-500 hover:text-[#1dbf73] transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </Link>

      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1dbf73] to-emerald-600"></div>
        
        <div className="text-center mb-8 mt-4">
          <div className="h-16 w-16 bg-[#1dbf73]/10 text-[#1dbf73] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Admin Portal
          </h2>
          <p className="mt-2 text-gray-500">Secure access to SkillVerse control panel</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              placeholder="admin@skillverse.com"
              className="input-field w-full p-3 border border-gray-300 rounded-xl focus:border-[#1dbf73] focus:ring-[#1dbf73] focus:outline-none transition-colors"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Secure Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input-field w-full p-3 border border-gray-300 rounded-xl focus:border-[#1dbf73] focus:ring-[#1dbf73] focus:outline-none transition-colors"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn-primary w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#1dbf73] hover:bg-[#19a463] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1dbf73] shadow-lg hover:shadow-xl hover:shadow-[#1dbf73]/30 transition-all duration-300 cursor-pointer mt-4"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </span>
            ) : "Access Dashboard"}
          </button>
        </div>
      </div>
    </div>
  );
}
