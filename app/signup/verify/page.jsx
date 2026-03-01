"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

function VerifyOTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [loading, setLoading] = useState(false);

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return alert("Please enter a 6-digit code.");

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:1001/verify-otp", {
        email,
        otp,
      });

      if (res.data.success) {
        const currentParams = searchParams.toString();
        router.push(`/signup/details?${currentParams}`);
      }
    } catch (err) {
      alert(
        err.response?.data?.message || "Verification failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      // Optional: Call your step1 endpoint again to resend the email
      // await axios.post("http://localhost:1001/signup/step1", { email, ... });
      setTimeLeft(180);
      setOtp("");
      alert("A new code has been sent to your email.");
    } catch (err) {
      alert("Failed to resend code.");
    }
  };

  return (
    <div className="w-full max-w-md mt-8 md:mt-0">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Check your email</h2>
        <p className="mt-2 text-gray-500">
          We sent a 6-digit code to{" "}
          <span className="font-semibold text-gray-700">{email}</span>
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleVerify}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
            Verification Code
          </label>
          <input
            type="text"
            maxLength={6}
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="input-field text-center text-2xl tracking-[10px] font-mono font-bold"
            placeholder="000000"
          />
        </div>

        <div className="text-center text-sm font-medium text-gray-600">
          {timeLeft > 0 ? (
            <p>
              Code expires in:{" "}
              <span className="text-[#1dbf73]">{formatTime(timeLeft)}</span>
            </p>
          ) : (
            <p className="text-red-500">
              Code has expired.{" "}
              <button
                type="button"
                className="text-[#1dbf73] font-bold hover:underline"
                onClick={handleResend}
              >
                Resend Code
              </button>
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={timeLeft === 0 || otp.length !== 6 || loading}
        >
          {loading ? "Verifying..." : "Verify & Continue"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-8">
        Didn't receive the email? Check your spam folder or{" "}
        <button
          onClick={handleResend}
          className="text-[#1dbf73] hover:underline"
        >
          try again
        </button>
      </p>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side: Form */}
      <div className="flex items-center justify-center p-8 bg-white order-2 md:order-1 relative">
        <Link
          href="/signup"
          className="link-back absolute top-8 left-8 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to Signup
        </Link>

        <Suspense
          fallback={
            <div className="text-gray-500">Loading verification...</div>
          }
        >
          <VerifyOTPForm />
        </Suspense>
      </div>

      {/* Right Side: Hero Styling */}
      <div className="hidden md:flex flex-col justify-center items-center bg-[#1dbf73] p-12 relative overflow-hidden order-1 md:order-2">
        {/* Decorative Circles (matching your signup details page) */}
        <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] rounded-full border-[40px] border-white/10 z-0"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] rounded-full border-[40px] border-white/10 z-0"></div>

        <div className="relative z-10 text-center text-white space-y-6 max-w-lg">
          <h1 className="text-4xl font-bold">Secure Your Account</h1>
          <p className="text-lg text-green-50">
            At SkillVerse, your security is our priority. Verifying your email
            ensures that your professional profile remains safe.
          </p>
        </div>
      </div>
    </div>
  );
}
