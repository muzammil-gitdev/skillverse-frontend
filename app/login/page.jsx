"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();

  const router = useRouter();
  useEffect(() => {
    // .get() retrieves the value of the 'error' key from the URL
    const errorMsg = searchParams.get("error");
    const successMsg = searchParams.get("success");
    if (errorMsg) setError(errorMsg);
    if (successMsg) setSuccess(successMsg);
  }, [searchParams]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:1001/login/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const response = await res.json();

      if (response.success && response.data) {
        setSuccess("Login successful!");

        const user = response.data;
        console.log(user);

        // Store user info in localStorage
        localStorage.setItem("user_id", user._id);
        localStorage.setItem(
          "profilePic",
          user.profilePic || "/default-avatar.png",
        );
        localStorage.setItem("user_name", user.fullName || "");
        localStorage.setItem("user_email", user.email || "");
        localStorage.setItem("user_data", JSON.stringify(user));

        // Redirect to gigs page
        router.push("/gigs");
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side - Hero/Image */}
      <div className="hidden md:flex relative flex-col justify-center items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Login background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Theme color overlay */}
        <div className="absolute inset-0 bg-[#1dbf73] bg-opacity-80 mix-blend-multiply"></div>

        <div className="relative z-10 text-center text-white p-12">
          <h2 className="text-4xl font-bold mb-4 drop-shadow-md">SkillVerse</h2>
          <p className="text-lg text-green-50 drop-shadow-sm max-w-sm mx-auto">
            Connect with top talent and discover your next big opportunity.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-8 bg-white relative">
        <Link
          href="/"
          className="link-back flex items-center gap-1 absolute top-4 left-4"
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

        <div className="w-full max-w-md mt-8 md:mt-0">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Sign In to SkillVerse
            </h2>
            <p className="mt-2 text-gray-500">Enter your details to proceed</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
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
                  className="input-field w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-sm font-medium text-[#1dbf73] hover:text-[#19a463]">
                    Forgot Password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <button type="submit" className="btn-primary w-full py-3 mt-4">
              Sign In
            </button>

            <p className="mt-6 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="link-primary">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
