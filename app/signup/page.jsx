"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupStep1 } from "../services/api";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const res = await signupStep1(formData);

      if (res.success) {
        const queryParams = new URLSearchParams(formData).toString();
        router.push(`/signup/details?${queryParams}`);
      } else {
        alert(res.message || "Signup failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-8 bg-white order-2 md:order-1 relative">
        <Link href="/" className="link-back">
          ← Back to Home
        </Link>

        <div className="w-full max-w-md mt-8 md:mt-0">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-500">Join FreelanceHub today</p>
          </div>

          <form className="space-y-6" onSubmit={handleNext}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="h-4 w-4 text-[#1dbf73] cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700">
                I agree to the <span className="link-primary">Terms</span> and{" "}
                <span className="link-primary">Privacy Policy</span>
              </span>
            </div>

            <button type="submit" className="btn-primary w-full">
              Next
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or sign up with
                </span>
              </div>
            </div>

            <a
              href="http://localhost:1001/auth/google"
              className="flex justify-center border rounded-xl py-2.5 hover:bg-gray-50"
            >
              Sign up with Google
            </a>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-center bg-[#1dbf73] text-white p-12 order-1 md:order-2">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">New Here?</h1>
          <p className="text-lg text-green-100">
            Sign up and discover a vast world of opportunities!
          </p>
        </div>
      </div>
    </div>
  );
}
