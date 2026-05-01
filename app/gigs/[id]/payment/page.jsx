"use client";
import { useState, useContext } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import GigsNavbar from "@/components/GigsNavbar";
import Image from "next/image";
import { AccountContext } from "@/app/context/accountProvider";
import { createOrder } from "../../../services/orderapi";
import React, { Suspense } from "react";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user_id } = useContext(AccountContext);

  const [isProcessing, setIsProcessing] = useState(false);

  // Get order details from URL params
  const total = searchParams.get("totalPrice");
  const gigTitle = searchParams.get("gigTitle");
  const gigImage = searchParams.get("gigImage");
  const packageName = searchParams.get("packageName");
  const gigId = searchParams.get("gigId");
  const sellerId = searchParams.get("sellerId");

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!user_id) {
      alert("Please log in to complete your purchase.");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Prepare Data for Stripe Session
      const orderData = {
        buyerId: user_id,
        sellerId: sellerId,
        gigId: gigId,
        package: packageName, // backend expects "package"
        image: gigImage,
      };

      // 2. Call Backend API to get the Stripe URL
      const response = await createOrder(orderData);

      if (response.success && response.url) {
        // 3. REDIRECT TO STRIPE
        // This is the critical step. User leaves your site to pay securely.
        window.location.href = response.url;
      } else {
        throw new Error(response.message || "Failed to initiate payment");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("There was an error connecting to Stripe. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="page-wrapper bg-[#f5f5f5] min-h-screen">
      <GigsNavbar />
      <main className="pt-32 pb-20 container-main max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Payment Form */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Payment Options
            </h2>

            <div className="space-y-6">
              <div className="border rounded-lg p-4 flex items-center gap-4 bg-gray-50 border-[#1dbf73] relative">
                <div className="w-4 h-4 rounded-full border-[5px] border-[#1dbf73] bg-white"></div>
                <span className="font-bold text-gray-900">
                  Credit or Debit Card (via Stripe)
                </span>
                <div className="ml-auto flex gap-2">
                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-sm text-blue-800">
                  You will be redirected to **Stripe's secure payment page** to
                  complete your transaction.
                </p>
              </div>

              <form onSubmit={handlePayment} className="space-y-4 pt-4">
                {/* 
                   Note: We don't need input fields for Card Number/CVV here 
                   because Stripe Checkout provides its own secure form. 
                */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-4 bg-[#1dbf73] text-white font-bold rounded-lg hover:bg-[#19a563] transition-colors text-lg flex items-center justify-center gap-2 ${
                    isProcessing ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isProcessing
                    ? "Redirecting to Secure Payment..."
                    : `Pay Total: $${total}`}
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  Your payment is processed securely by Stripe. We never store
                  your card details.
                </p>
              </form>
            </div>
          </div>

          {/* Right: Summary Card */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm sticky top-32">
              <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="relative w-24 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                  {gigImage && (
                    <Image
                      src={gigImage}
                      alt="Gig"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug">
                    {gigTitle}
                  </h4>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {packageName} Package
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-gray-900 text-lg">
                  Total to Pay
                </span>
                <span className="font-bold text-gray-900 text-2xl">
                  ${total}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-xs text-gray-500 leading-relaxed">
                By confirming this payment, you agree to SkillVerse's Terms of
                Service and Privacy Policy.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
