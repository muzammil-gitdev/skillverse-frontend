"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import GigsNavbar from "@/components/GigsNavbar";
import Image from "next/image";

function OrderContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Reconstruct data from params
    const orderDetails = {
        packageIndex: searchParams.get('packageIndex'),
        packageName: searchParams.get('packageName'),
        price: parseFloat(searchParams.get('packagePrice') || '0'),
        delivery: searchParams.get('packageDelivery'),
        revisions: searchParams.get('packageRevisions'),
        features: JSON.parse(searchParams.get('packageFeatures') || '[]'),
        gigTitle: searchParams.get('gigTitle'),
        gigId: searchParams.get('gigId'),
        gigImage: searchParams.get('gigImage') || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    };

    const serviceFee = (orderDetails.price * 0.1).toFixed(2);
    const total = (orderDetails.price + parseFloat(serviceFee)).toFixed(2);

    return (
        <div className="page-wrapper bg-[#f5f5f5] min-h-screen">
            <GigsNavbar />
            <main className="pt-32 pb-20 container-main max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column: Order Details */}
                    <div className="lg:col-span-2 flex-grow">
                        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h2>
                            <div className="flex gap-6">
                                <div className="relative w-32 h-20 flex-shrink-0">
                                    <Image
                                        src={orderDetails.gigImage}
                                        alt={orderDetails.gigTitle}
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2 leading-snug">{orderDetails.gigTitle}</h3>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="bg-[#1dbf73]/10 text-[#1dbf73] px-2 py-1 rounded font-semibold">{orderDetails.packageName} Package</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-gray-100 pt-6">
                                <h4 className="font-bold text-gray-900 mb-4">What's included in this order:</h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {orderDetails.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4 text-[#1dbf73] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                    <li className="flex items-center gap-2 text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-[#1dbf73] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {orderDetails.delivery}
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-[#1dbf73] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        {orderDetails.revisions}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Pricing Summary */}
                    <div className="lg:w-96 flex-shrink-0">
                        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm sticky top-32">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Price Summary</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">${orderDetails.price.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Service Fee</span>
                                    <span className="font-medium">${serviceFee}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-8">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-900 text-lg">Total</span>
                                    <span className="font-bold text-gray-900 text-xl">${total}</span>
                                </div>
                                <span className="text-xs text-gray-400 mt-1 block">Delivery time: {orderDetails.delivery}</span>
                            </div>

                            <button
                                onClick={() => {
                                    // Pass calculated total forward to payment
                                    const params = new URLSearchParams(searchParams.toString());
                                    params.set('totalPrice', total);
                                    params.set('serviceFee', serviceFee);

                                    router.push(`/gigs/${orderDetails.gigId}/payment?${params.toString()}`);
                                }}
                                className="btn-primary w-full py-3 text-base shadow-lg shadow-[#1dbf73]/20"
                            >
                                Continue to Checkout
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span className="text-xs font-medium">SSL Secure Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function OrderPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <OrderContent />
        </Suspense>
    );
}
