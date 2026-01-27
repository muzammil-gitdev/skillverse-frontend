"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:1001/api/signup/step1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      // If backend is successful, move to next page
      const queryParams = new URLSearchParams(formData).toString();
      router.push(`/signup/details?${queryParams}`);
    } catch (err) {
      console.error("Error sending data:", err);
      alert("Server not responding");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Form Section */}
      <div className="flex items-center justify-center p-8 bg-white order-2 md:order-1 relative">
        <Link href="/" className="link-back">
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

        {/* Form Container */}
        <div className="w-full max-w-md mt-8 md:mt-0">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-500">Join FreelanceHub today</p>
          </div>

          <form className="space-y-6" onSubmit={handleNext}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="name@example.com"
                />
              </div>

              {/* Date of Birth Selection */}
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date of Birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-[#1dbf73] focus:ring-[#1dbf73] border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{" "}
                <a href="#" className="link-primary">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="link-primary">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button type="submit" className="btn-primary">
              Next
            </button>

            {/* Social Login */}
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

            <div className="flex justify-center">
              <a
                href="http://localhost:1001/auth/google"
                className="flex items-center justify-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </a>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section - Right Side */}
      <div className="hidden md:flex flex-col justify-center items-center bg-[#1dbf73] p-12 relative overflow-hidden order-1 md:order-2 group">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=80")',
          }}
        ></div>
        <div className="absolute inset-0 z-0 bg-[#1dbf73]/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-bl from-[#1dbf73]/95 to-teal-900/80"></div>

        {/* Decorative Circles */}
        <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] rounded-full border-[40px] border-white/10 z-0"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] rounded-full border-[40px] border-white/10 z-0"></div>

        <div className="relative z-10 text-center text-white space-y-6 max-w-lg">
          <h1 className="text-4xl font-bold">New Here?</h1>
          <p className="text-lg text-green-50">
            Sign up and discover a vast world of opportunities!
          </p>
        </div>
      </div>
    </div>
  );
}
