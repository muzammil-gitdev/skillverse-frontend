"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { confirmOrder } from "../services/orderapi";
import GigsNavbar from "@/components/GigsNavbar";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      confirmOrder(sessionId)
        .then(() => setLoading(false))
        .catch((err) => {
          console.error(err);
          alert(
            "Payment confirmed but order failed to save. Please contact support.",
          );
        });
    }
  }, [sessionId]);

  if (loading)
    return <div className="p-20 text-center">Verifying payment...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <GigsNavbar />
      <h1 className="text-3xl font-bold text-[#1dbf73]">Payment Successful!</h1>
      <p className="mt-4">Your order is now active.</p>
      <button
        onClick={() => router.push("/orders")}
        className="mt-6 px-6 py-2 bg-[#1dbf73] text-white rounded-lg"
      >
        View My Orders
      </button>
    </div>
  );
}
