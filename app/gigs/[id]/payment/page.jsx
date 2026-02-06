"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import GigsNavbar from "@/components/GigsNavbar";
import Image from "next/image";

function PaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const total = searchParams.get('totalPrice');
    const gigTitle = searchParams.get('gigTitle');
    const gigImage = searchParams.get('gigImage');
    const packageName = searchParams.get('packageName');

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);
            // In a real app, you might redirect to a proper "Orders" page here
        }, 2000);
    };

    if (paymentSuccess) {
        return (
            <div className="page-wrapper min-h-screen bg-gray-50 flex flex-col">
                <GigsNavbar />
                <main className="flex-grow flex items-center justify-center container-main pt-20">
                    <div className="bg-white p-12 rounded-2xl shadow-xl text-center max-w-lg w-full">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Thank you for your purchase. Your order for <span className="font-semibold text-gray-900">{gigTitle}</span> has been placed successfully.
                        </p>
                        <button
                            onClick={() => router.push('/gigs')}
                            className="btn-primary w-full py-3"
                        >
                            Return to Gigs
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="page-wrapper bg-[#f5f5f5] min-h-screen">
            <GigsNavbar />
            <main className="pt-32 pb-20 container-main max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left: Payment Form */}
                    <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Options</h2>

                        <div className="space-y-6">
                            {/* Mock Payment Options */}
                            <div className="border rounded-lg p-4 flex items-center gap-4 bg-gray-50 border-[#1dbf73] relative">
                                <div className="w-4 h-4 rounded-full border-[5px] border-[#1dbf73] bg-white"></div>
                                <span className="font-bold text-gray-900">Credit or Debit Card</span>
                                <div className="ml-auto flex gap-2">
                                    {/* Simple card icons */}
                                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4 flex items-center gap-4 opacity-60">
                                <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                                <span className="font-semibold text-gray-700">PayPal</span>
                            </div>

                            <form onSubmit={handlePayment} className="space-y-4 pt-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1dbf73] focus:border-transparent outline-none transition-all" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Expiration Date</label>
                                        <input type="text" placeholder="MM/YY" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1dbf73] focus:border-transparent outline-none transition-all" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                                        <input type="text" placeholder="123" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1dbf73] focus:border-transparent outline-none transition-all" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1dbf73] focus:border-transparent outline-none transition-all" required />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className={`btn-primary w-full py-4 mt-4 font-bold text-lg flex items-center justify-center gap-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isProcessing ? (
                                        <>Processing...</>
                                    ) : (
                                        <>Pay ${total}</>
                                    )}
                                </button>

                                <p className="text-center text-xs text-gray-400 mt-4">
                                    Your payment is secure. We do not store your credit card details.
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Right: Summary Card */}
                    <div className="lg:w-96 flex-shrink-0">
                        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm sticky top-32">
                            <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                                <div className="relative w-24 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                    {gigImage && <Image src={gigImage} alt="Gig" fill className="object-cover" />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug">{gigTitle}</h4>
                                    <span className="text-xs text-gray-500 mt-1 block">{packageName} Package</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-gray-900 text-lg">Total to Pay</span>
                                <span className="font-bold text-gray-900 text-2xl">${total}</span>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg text-xs text-gray-500 leading-relaxed">
                                By confirming this payment, you agree to our Terms of Service and Privacy Policy.
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
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <PaymentContent />
        </Suspense>
    );
}
