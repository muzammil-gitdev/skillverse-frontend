"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import GigsNavbar from "@/components/GigsNavbar";
import { AccountContext } from "@/app/context/accountProvider";
import {
  getBuyerOrders,
  getSellerOrders,
  updateOrderStatus,
} from "../services/orderapi";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("purchased");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedOrderForReview, setSelectedOrderForReview] = useState(null);

  const { user_id } = useContext(AccountContext); // Assuming this is your logged-in user's ID
  const router = useRouter();

  // 1. FETCH REAL DATA FROM BACKEND
  useEffect(() => {
    const fetchAllOrders = async () => {
      if (!user_id) return;
      setLoading(true);
      try {
        // Fetch both roles simultaneously
        const [boughtRes, soldRes] = await Promise.all([
          getBuyerOrders(user_id),
          getSellerOrders(user_id),
        ]);

        // Normalize data to match your UI needs
        const bought = (boughtRes?.data || []).map((o) => ({
          ...o,
          id: o._id,
          role: "buyer",
          otherPartyName: o.sellerId?.fullName || "Seller",
          price: `$${o.totalAmount}`,
          date: new Date(o.createdAt).toLocaleDateString(),
          gigTitle: o.gigId?.title,
        }));

        const sold = (soldRes?.data || []).map((o) => ({
          ...o,
          id: o._id,
          role: "seller",
          otherPartyName: o.buyerId?.fullName || "Buyer",
          price: `$${o.totalAmount}`,
          date: new Date(o.createdAt).toLocaleDateString(),
          gigTitle: o.gigId?.title,
        }));

        setOrders([...bought, ...sold]);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, [user_id]);

  // 2. UPDATE STATUS ON BACKEND
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await updateOrderStatus(orderId, { status: newStatus });
      if (res.success) {
        // Update local state to reflect change
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
        );
      }
    } catch (err) {
      alert("Failed to update order status");
    }
  };

  // Helper for your two-step completion logic (simplified for DB sync)
  const handleCompleteAction = (order, role) => {
    if (role === "seller") {
      handleUpdateStatus(order.id, "delivered"); // Backend uses 'delivered'
    } else {
      handleUpdateStatus(order.id, "completed"); // Buyer approves -> 'completed'
    }
  };

  // Filter logic
  const getFilteredOrders = () => {
    if (activeTab === "purchased") {
      return orders.filter((o) => o.role === "buyer");
    } else {
      return orders.filter(
        (o) =>
          o.role === "seller" &&
          ((activeTab === "new" && o.status === "paid") ||
            (activeTab === "pending" &&
              (o.status === "active" || o.status === "delivered")) ||
            (activeTab === "completed" && o.status === "completed")),
      );
    }
  };

  const filteredOrders = getFilteredOrders();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1dbf73]"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <GigsNavbar />
      <main className="flex-1 container mx-auto px-4 py-24 max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Orders Management
        </h1>
        <p className="text-gray-600 mb-8">
          Manage your projects and purchases.
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs Header */}
          <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
            {["new", "pending", "completed", "purchased"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab
                    ? "border-[#1dbf73] text-[#1dbf73]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "new" && "New Requests"}
                {tab === "pending" && "Active Orders"}
                {tab === "completed" && "Completed"}
                {tab === "purchased" && "My Purchases"}
              </button>
            ))}
          </div>

          <div className="px-6 pb-6">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                No orders found in this category.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-xl border border-gray-100 bg-gray-50/50"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {order.gigTitle}
                      </h4>
                      <div className="text-sm text-gray-500 mt-1">
                        {order.role === "seller"
                          ? `Buyer: ${order.otherPartyName}`
                          : `Seller: ${order.otherPartyName}`}{" "}
                        • {order.date} •{" "}
                        <span className="text-gray-900 font-bold">
                          {order.price}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 sm:mt-0">
                      {/* Seller Actions */}
                      {order.role === "seller" && order.status === "paid" && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, "active")}
                          className="btn-primary px-4 py-2 text-xs"
                        >
                          Accept
                        </button>
                      )}
                      {order.role === "seller" && order.status === "active" && (
                        <button
                          onClick={() => handleCompleteAction(order, "seller")}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs"
                        >
                          Submit Work
                        </button>
                      )}

                      {/* Buyer Actions */}
                      {order.role === "buyer" &&
                        order.status === "delivered" && (
                          <button
                            onClick={() => handleCompleteAction(order, "buyer")}
                            className="bg-orange-500 text-white px-4 py-2 rounded-lg text-xs"
                          >
                            Approve & Release
                          </button>
                        )}

                      {order.status === "completed" &&
                        order.role === "buyer" && (
                          <button
                            onClick={() => {
                              setSelectedOrderForReview(order);
                              setReviewModalOpen(true);
                            }}
                            className="border border-[#1dbf73] text-[#1dbf73] px-4 py-2 rounded-lg text-xs"
                          >
                            Review
                          </button>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">
                Leave a Review
              </h3>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4 text-sm">
                How was your experience working with{" "}
                <span className="font-semibold text-gray-900">
                  {selectedOrderForReview?.otherPartyName}
                </span>{" "}
                on{" "}
                <span className="font-semibold text-gray-900">
                  {selectedOrderForReview?.gigTitle}
                </span>
                ?
              </p>

              {/* Star Rating Selector */}
              <div className="mb-6 flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() =>
                      setSelectedOrderForReview({
                        ...selectedOrderForReview,
                        rating: star,
                      })
                    }
                    className={`transition-all transform hover:scale-110 focus:outline-none ${
                      (selectedOrderForReview?.rating || 0) >= star
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }`}
                  >
                    <svg className="w-10 h-10 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>

              {/* Review Textarea */}
              <textarea
                id="review-text"
                className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1dbf73] focus:border-transparent outline-none resize-none mb-4 text-gray-700 placeholder:text-gray-400"
                placeholder="Tell us more about the service... Was the delivery on time? Was the quality as expected?"
              ></textarea>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setReviewModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={!selectedOrderForReview?.rating}
                  onClick={async () => {
                    const comment =
                      document.getElementById("review-text").value;
                    const rating = selectedOrderForReview.rating;

                    try {
                      // Assuming your addReview API looks like this:
                      // await addReview({ gigId: selectedOrderForReview.gigId, rating, comment, userId: user_id });
                      alert(`Review submitted: ${rating} Stars - "${comment}"`);
                      setReviewModalOpen(false);
                      // Optional: Refresh list or mark as reviewed
                    } catch (err) {
                      alert("Failed to submit review.");
                    }
                  }}
                  className={`px-5 py-2.5 text-sm font-medium text-white rounded-xl transition-all shadow-md ${
                    selectedOrderForReview?.rating
                      ? "bg-[#1dbf73] hover:bg-[#19a563] shadow-[#1dbf73]/20"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
