"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import GigsNavbar from "@/components/GigsNavbar";
import { AccountContext } from "@/app/context/accountProvider";
import Link from "next/link"; // For mock gig redirection

// Mock data for initial testing
// Add role (buyer/seller) and completion states
const MOCK_ORDERS = [
    {
        id: "ord_1",
        gigId: "67c309503ce847aefbcff49d", // mock gig id for redirect
        gigTitle: "E-Commerce Website Development",
        otherPartyName: "Alice Smith", // who you are working with
        role: "seller", // You are the seller, Alice is the buyer
        price: "$500",
        status: "new",
        sellerCompleted: false,
        buyerCompleted: false,
        date: "2026-03-01",
    },
    {
        id: "ord_2",
        gigId: "67c309503ce847aefbcff49d",
        gigTitle: "Logo Design for Startup",
        otherPartyName: "Bob Johnson",
        role: "seller",
        price: "$150",
        status: "pending", // active order
        sellerCompleted: false,
        buyerCompleted: false,
        date: "2026-03-02",
    },
    {
        id: "ord_3",
        gigId: "67c309503ce847aefbcff49d",
        gigTitle: "SEO Optimization",
        otherPartyName: "Charlie Brown",
        role: "seller",
        price: "$300",
        status: "completed",
        sellerCompleted: true,
        buyerCompleted: true,
        date: "2026-02-28",
    },
    // New mock purchases (user is the buyer)
    {
        id: "ord_4",
        gigId: "67c309503ce847aefbcff49d",
        gigTitle: "Professional Voice Over",
        otherPartyName: "David Voice",
        role: "buyer", // You are the buyer, David is the seller
        price: "$50",
        status: "pending", // active purchase
        sellerCompleted: false,
        buyerCompleted: false,
        date: "2026-03-04",
    },
    {
        id: "ord_5",
        gigId: "67c309503ce847aefbcff49d",
        gigTitle: "Custom illustration for book",
        otherPartyName: "Emily Art",
        role: "buyer",
        price: "$200",
        status: "completed", // fully completed purchase
        sellerCompleted: true,
        buyerCompleted: true,
        date: "2026-02-25",
    },
    {
        id: "ord_6",
        gigId: "67c309503ce847aefbcff49d",
        gigTitle: "Backend API Setup",
        otherPartyName: "Frank Dev",
        role: "buyer",
        price: "$450",
        status: "pending_completion", // Seller marked complete, waiting for buyer
        sellerCompleted: true,
        buyerCompleted: false,
        date: "2026-03-03",
    }
];

export default function OrdersPage() {
    // Tabs: new, pending, completed, purchased
    const [activeTab, setActiveTab] = useState("new");
    const [orders, setOrders] = useState(MOCK_ORDERS);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [selectedOrderForReview, setSelectedOrderForReview] = useState(null);
    const router = useRouter();

    // In a real app we'd fetch orders based on logged-in user
    const { user_id } = useContext(AccountContext);

    const handleAccept = (id) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === id ? { ...order, status: "pending" } : order
            )
        );
    };

    const handleReject = (id) => {
        setOrders((prev) => prev.filter((order) => order.id !== id));
    };

    const handleComplete = (id, role) => {
        setOrders((prev) =>
            prev.map((order) => {
                if (order.id !== id) return order;

                const isSeller = role === "seller";
                const sellerDone = isSeller ? true : order.sellerCompleted;
                const buyerDone = !isSeller ? true : order.buyerCompleted;

                // Two-step logic: if both are complete -> status 'completed', payment released
                // If only one, status -> 'pending_completion'
                if (sellerDone && buyerDone) {
                    return { ...order, sellerCompleted: true, buyerCompleted: true, status: "completed" };
                } else {
                    return { ...order, sellerCompleted: sellerDone, buyerCompleted: buyerDone, status: "pending_completion" };
                }
            })
        );
    };

    // Filter logic based on the tab
    const getFilteredOrders = () => {
        if (activeTab === "purchased") {
            // Show all orders where role === 'buyer'
            return orders.filter(o => o.role === "buyer");
        } else {
            // Seller tabs (new, pending, completed)
            return orders.filter(o => o.role === "seller" && (
                o.status === activeTab ||
                (activeTab === "pending" && o.status === "pending_completion") // show pending completion in pending tab for seller
            ));
        }
    };

    const filteredOrders = getFilteredOrders();

    const renderTabs = () => (
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
            {["new", "pending", "completed", "purchased"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-6 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === tab
                        ? "border-[#1dbf73] text-[#1dbf73]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    {tab === "new" && "New Requests"}
                    {tab === "pending" && "Active Orders"}
                    {tab === "completed" && "Completed Work"}
                    {tab === "purchased" && "My Purchases"}
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                        {tab === "purchased"
                            ? orders.filter((o) => o.role === "buyer").length
                            : orders.filter((o) => o.role === "seller" && (o.status === tab || (tab === "pending" && o.status === "pending_completion"))).length}
                    </span>
                </button>
            ))}
        </div>
    );

    const openReviewModal = (order) => {
        setSelectedOrderForReview(order);
        setReviewModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <GigsNavbar />

            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-24 mb-10 max-w-5xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders Management</h1>
                <p className="text-gray-600 mb-8">
                    Manage your incoming requests, ongoing projects, and purchased services.
                </p>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {renderTabs()}

                    <div className="px-6 pb-6">
                        {filteredOrders.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    No {activeTab === "purchased" ? "purchased" : activeTab} orders
                                </h3>
                                <p className="text-gray-500 mt-1">
                                    When you have {activeTab === "purchased" ? "purchased" : activeTab} orders, they will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white transition-colors"
                                    >
                                        <div className="mb-4 sm:mb-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold text-gray-900 text-lg">
                                                    {order.gigTitle}
                                                </h4>
                                                {order.status === "pending_completion" && (
                                                    <span className="px-2 py-0.5 text-xs font-semibold bg-orange-100 text-orange-700 rounded-full">
                                                        Pending Completion Approval
                                                    </span>
                                                )}
                                                {order.role === "buyer" && order.status === "completed" && (
                                                    <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                                                        Payment Released
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    {order.role === "seller" ? `Buyer: ${order.otherPartyName}` : `Seller: ${order.otherPartyName}`}
                                                </span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {order.date}
                                                </span>
                                                <span>•</span>
                                                <span className="font-medium text-gray-900">
                                                    {order.price}
                                                </span>
                                            </div>

                                            {/* Status indicators for two-step process */}
                                            {order.status !== "new" && (
                                                <div className="flex items-center gap-4 mt-3 text-xs">
                                                    <div className="flex items-center gap-1">
                                                        <div className={`w-2 h-2 rounded-full ${order.sellerCompleted ? "bg-[#1dbf73]" : "bg-gray-300"}`}></div>
                                                        <span className={order.sellerCompleted ? "text-gray-900 font-medium" : "text-gray-500"}>Seller Done</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <div className={`w-2 h-2 rounded-full ${order.buyerCompleted ? "bg-[#1dbf73]" : "bg-gray-300"}`}></div>
                                                        <span className={order.buyerCompleted ? "text-gray-900 font-medium" : "text-gray-500"}>Buyer Approved</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-center gap-3">
                                            {activeTab === "new" && order.role === "seller" && (
                                                <>
                                                    <button
                                                        onClick={() => handleReject(order.id)}
                                                        className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                    >
                                                        Reject
                                                    </button>
                                                    <button
                                                        onClick={() => handleAccept(order.id)}
                                                        className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#1dbf73] hover:bg-[#19a563] rounded-lg transition-colors shadow-sm"
                                                    >
                                                        Accept Order
                                                    </button>
                                                </>
                                            )}

                                            {activeTab === "pending" && order.role === "seller" && (
                                                <button
                                                    onClick={() => handleComplete(order.id, "seller")}
                                                    disabled={order.sellerCompleted}
                                                    className={`w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${order.sellerCompleted
                                                            ? "text-gray-400 bg-gray-50 border-gray-200 cursor-not-allowed"
                                                            : "text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200"
                                                        }`}
                                                >
                                                    {order.sellerCompleted ? "Waiting for Buyer" : "Submit Work"}
                                                </button>
                                            )}

                                            {activeTab === "purchased" && order.status === "pending" && (
                                                <button
                                                    onClick={() => handleComplete(order.id, "buyer")}
                                                    disabled={order.buyerCompleted}
                                                    className={`w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${order.buyerCompleted
                                                            ? "text-gray-400 bg-gray-50 border-gray-200 cursor-not-allowed"
                                                            : "text-purple-600 bg-purple-50 hover:bg-purple-100 border-purple-200"
                                                        }`}
                                                >
                                                    {order.buyerCompleted ? "Waiting for Seller" : "Mark as Received"}
                                                </button>
                                            )}

                                            {activeTab === "purchased" && order.status === "pending_completion" && (
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-xs text-orange-600 font-medium text-center">Seller says it's done</span>
                                                    <button
                                                        onClick={() => handleComplete(order.id, "buyer")}
                                                        className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors shadow-sm"
                                                    >
                                                        Approve & Release Payment
                                                    </button>
                                                </div>
                                            )}

                                            {((activeTab === "completed" && order.role === "seller") || (activeTab === "purchased" && order.status === "completed")) && (
                                                <span className="px-3 py-1 text-sm font-medium text-[#1dbf73] bg-[#1dbf73]/10 rounded-full flex items-center justify-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {order.role === "buyer" ? "Payment Released" : "Done"}
                                                </span>
                                            )}

                                            {activeTab === "purchased" && order.status === "completed" && (
                                                <button
                                                    onClick={() => openReviewModal(order)}
                                                    className="w-full sm:w-auto mt-2 sm:mt-0 px-4 py-2 text-sm font-medium text-[#1dbf73] bg-white border border-[#1dbf73] hover:bg-[#1dbf73]/5 rounded-lg transition-colors"
                                                >
                                                    Leave a Review
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

            {/* Mock Review Modal */}
            {reviewModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900">Leave a Review</h3>
                            <button onClick={() => setReviewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-600 mb-4 text-sm">
                                How was your experience working with <span className="font-semibold text-gray-900">{selectedOrderForReview?.otherPartyName}</span> on <span className="font-semibold text-gray-900">{selectedOrderForReview?.gigTitle}</span>?
                            </p>

                            <div className="mb-6 flex gap-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button key={star} className="text-gray-300 hover:text-yellow-400 transition-colors focus:outline-none">
                                        <svg className="w-8 h-8 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </button>
                                ))}
                            </div>

                            <textarea
                                className="w-full h-32 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1dbf73] focus:border-transparent outline-none resize-none mb-4"
                                placeholder="Write your review here... This helps the community know what to expect."
                            ></textarea>

                            <div className="flex justify-end gap-3">
                                <button onClick={() => setReviewModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                                    Cancel
                                </button>
                                <button onClick={() => {
                                    alert("Review submitted successfully!");
                                    setReviewModalOpen(false);
                                }} className="px-5 py-2.5 text-sm font-medium text-white bg-[#1dbf73] hover:bg-[#19a563] rounded-xl transition-colors shadow-md shadow-[#1dbf73]/20">
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
