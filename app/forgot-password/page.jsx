"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ForgotPasswordContent() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  
  const router = useRouter();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }
    setError("");
    // Simulate sending OTP
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp !== "1234") {
      setError("Invalid OTP. Hint: use 1234");
      return;
    }
    setError("");
    // Simulate successful password reset flow completion
    router.push("/login?success=Password reset workflow completed successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[#f9fafb] relative">
      <Link
        href="/login"
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
        Back to Login
      </Link>

      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-gray-500">
            {step === 1 ? "Enter your email to receive an OTP" : "Enter the OTP sent to your email"}
          </p>
        </div>

        {step === 1 ? (
          <form className="space-y-6" onSubmit={handleEmailSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full p-3 border border-gray-300 rounded-xl focus:border-[#1dbf73] focus:ring-[#1dbf73] focus:outline-none transition-colors"
                placeholder="name@example.com"
              />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <button type="submit" className="btn-primary w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#1dbf73] hover:bg-[#19a463] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1dbf73] shadow-lg hover:shadow-xl hover:shadow-[#1dbf73]/30 transition-all duration-300 cursor-pointer mt-4">
              Send OTP
            </button>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleOtpSubmit}>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter OTP (Hint: 1234)
              </label>
              <input
                id="otp"
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input-field w-full p-3 border border-gray-300 rounded-xl text-center tracking-widest text-lg font-bold focus:border-[#1dbf73] focus:ring-[#1dbf73] focus:outline-none transition-colors"
                placeholder="0000"
                maxLength={4}
              />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <button type="submit" className="btn-primary w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#1dbf73] hover:bg-[#19a463] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1dbf73] shadow-lg hover:shadow-xl hover:shadow-[#1dbf73]/30 transition-all duration-300 cursor-pointer mt-4">
              Verify & Reset
            </button>
            <button 
              type="button" 
              onClick={() => setStep(1)}
              className="w-full text-sm text-gray-500 hover:text-[#1dbf73] mt-4 transition-colors font-medium cursor-pointer"
            >
              Back to Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
