"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import GigsNavbar from "@/components/GigsNavbar";
import { AccountContext } from "@/app/context/accountProvider";

// Mock data for initial testing
const MOCK_ORDERS = [
    {
        id: "ord_1",
        gigTitle: "E-Commerce Website Development",
        clientName: "Alice Smith",
        price: "$500",
        status: "new",
        date: "2026-03-01",
    },
    {
        id: "ord_2",
        gigTitle: "Logo Design for Startup",
        clientName: "Bob Johnson",
        price: "$150",
        status: "pending",
        date: "2026-03-02",
    },
    {
        id: "ord_3",
        gigTitle: "SEO Optimization",
        clientName: "Charlie Brown",
        price: "$300",
        status: "completed",
        date: "2026-02-28",
    },
];

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState("new");
    const [orders, setOrders] = useState(MOCK_ORDERS);
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
        // We could move it to a "rejected" status or remove it
        setOrders((prev) => prev.filter((order) => order.id !== id));
    };

    const handleComplete = (id) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === id ? { ...order, status: "completed" } : order
            )
        );
    };

    const filteredOrders = orders.filter((order) => order.status === activeTab);

    const renderTabs = () => (
        <div className="flex border-b border-gray-200 mb-8">
            {["new", "pending", "completed"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-6 font-semibold text-sm transition-colors border-b-2 ${activeTab === tab
                            ? "border-[#1dbf73] text-[#1dbf73]"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    {tab === "new"
                        ? "New Orders"
                        : tab === "pending"
                            ? "Pending Queue"
                            : "Completed"}
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                        {orders.filter((o) => o.status === tab).length}
                    </span>
                </button>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <GigsNavbar />

            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-24 mb-10 max-w-5xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
                <p className="text-gray-600 mb-8">
                    Manage your incoming requests and ongoing projects.
                </p>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {renderTabs()}

                    <div className="px-6 pb-6">
                        {filteredOrders.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                                    <svg
                                        className="w-8 h-8 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    No {activeTab} orders
                                </h3>
                                <p className="text-gray-500 mt-1">
                                    When you have {activeTab} orders, they will appear here.
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
                                            <h4 className="font-semibold text-gray-900 text-lg">
                                                {order.gigTitle}
                                            </h4>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
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
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                        />
                                                    </svg>
                                                    {order.clientName}
                                                </span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
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
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    {order.date}
                                                </span>
                                                <span>•</span>
                                                <span className="font-medium text-gray-900">
                                                    {order.price}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {activeTab === "new" && (
                                                <>
                                                    <button
                                                        onClick={() => handleReject(order.id)}
                                                        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                    >
                                                        Reject
                                                    </button>
                                                    <button
                                                        onClick={() => handleAccept(order.id)}
                                                        className="px-4 py-2 text-sm font-medium text-white bg-[#1dbf73] hover:bg-[#19a563] rounded-lg transition-colors shadow-sm"
                                                    >
                                                        Accept Order
                                                    </button>
                                                </>
                                            )}
                                            {activeTab === "pending" && (
                                                <button
                                                    onClick={() => handleComplete(order.id)}
                                                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                                                >
                                                    Mark as Complete
                                                </button>
                                            )}
                                            {activeTab === "completed" && (
                                                <span className="px-3 py-1 text-sm font-medium text-[#1dbf73] bg-[#1dbf73]/10 rounded-full flex items-center gap-1">
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
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                    Done
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
