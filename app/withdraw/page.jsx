"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function WithdrawPage() {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("stripe");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const availableBalance = user?.availableBalance || 0;

  const handleWithdrawRequest = () => {
    const value = parseFloat(amount);

    if (!value) return setError("Enter amount");
    if (value < 5) return setError("Minimum withdraw is $5");
    if (value > availableBalance) return setError("Insufficient balance");

    setError("");

    alert(
      `Withdraw request sent!\nAmount: $${value}\nMethod: ${method.toUpperCase()}`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-800">
            Withdraw Funds
          </h2>

          {/* 🏠 Back Button */}
          <Link href="/gigs" className="text-sm text-[#1dbf73] hover:underline">
            ← Back to Home
          </Link>
        </div>

        {/* Balance Card */}
        <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-5">
          <p className="text-sm text-gray-500">Available Balance</p>
          <p className="text-2xl font-bold text-green-600">
            ${availableBalance.toFixed(2)}
          </p>
        </div>

        {/* Amount Input */}
        <input
          type="number"
          placeholder="Enter amount to withdraw"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#1dbf73]"
        />

        {/* Payment Method */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Payment Method</p>

          <button
            onClick={() => setMethod("stripe")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition ${
              method === "stripe"
                ? "border-[#1dbf73] bg-green-50"
                : "border-gray-200"
            }`}
          >
            <span className="font-medium">Stripe</span>
            <span className="text-xs text-gray-500">Fast & Secure</span>
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

        {/* Button */}
        <button
          onClick={handleWithdrawRequest}
          disabled={
            !amount ||
            parseFloat(amount) < 5 ||
            parseFloat(amount) > availableBalance
          }
          className={`w-full py-3 rounded-lg text-white font-medium transition ${
            !amount ||
            parseFloat(amount) < 5 ||
            parseFloat(amount) > availableBalance
              ? "bg-[#1dbf73]/40 cursor-not-allowed"
              : "bg-[#1dbf73] hover:bg-[#19a463]"
          }`}
        >
          Request Withdraw
        </button>

        {/* Footer Note */}
        <p className="text-xs text-gray-400 mt-4 text-center">
          Minimum withdrawal is $5 • Processed via Stripe
        </p>
      </div>
    </div>
  );
}
