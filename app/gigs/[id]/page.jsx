"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import GigsNavbar from "@/components/GigsNavbar";

// Mock data for packages (remains the same as it's static structure for now)
const PACKAGES = [
    {
        name: "Basic",
        price: 30,
        delivery: "2 Days Delivery",
        revisions: "1 Revision",
        features: ["1 Page", "Responsive Design", "Content Upload"],
        description: "I will create a simple 1-page website or landing page for you."
    },
    {
        name: "Standard",
        price: 80,
        delivery: "4 Days Delivery",
        revisions: "3 Revisions",
        features: ["5 Pages", "Responsive Design", "Content Upload", "Source Code", "SEO Optimization"],
        description: "I will create a complete 5-page website with a modern design."
    },
    {
        name: "Premium",
        price: 150,
        delivery: "7 Days Delivery",
        revisions: "Unlimited Revisions",
        features: ["10 Pages", "Responsive Design", "Content Upload", "Source Code", "SEO Optimization", "E-commerce Functionality"],
        description: "I will create a full-featured premium website tailored to your business needs."
    }
];

function GigDetailsContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState(1); // 0: Basic, 1: Standard, 2: Premium
    const [gig, setGig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Construct gig object from URL query params if available
        const gigFromQuery = {
            id: params.id,
            title: searchParams.get('title'),
            description: searchParams.get('description'),
            author: {
                name: searchParams.get('userName'),
                avatar: searchParams.get('userAvatar'),
                rating: searchParams.get('rating') || 4.9, // Default/Mock if missing
                reviews: searchParams.get('reviews') || 128,

                // Mock data for extended author info (URL doesn't carry this yet)
                role: "Full Stack Developer",
                location: "United States",
                memberSince: "May 2021",
                avgResponseTime: "1 Hour"
            },
            images: [
                searchParams.get('thumbnail') || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
            ],
            rating: searchParams.get('rating') || 4.9,
            reviewsCount: searchParams.get('reviews') || 128
        };

        setGig(gigFromQuery);
        setLoading(false);

    }, [params.id, searchParams]);

    if (loading) {
        return (
            <div className="page-wrapper flex items-center justify-center">
                <p className="text-gray-500">Loading gig details...</p>
            </div>
        );
    }

    if (!gig || !gig.title) {
        return (
            <div className="page-wrapper flex items-center justify-center">
                <GigsNavbar />
                <p className="text-gray-500 mt-20">Gig details not found. Please navigate from the Gigs page.</p>
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <GigsNavbar />

            <main className="pt-32 pb-20 container-main">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Gig Details */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Title & Header */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{gig.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-6">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={gig.author.avatar}
                                        alt={gig.author.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span className="font-bold text-gray-900">{gig.author.name}</span>
                                </div>
                                <span>|</span>
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="font-bold text-gray-900">{gig.rating}</span>
                                    <span className="text-gray-400">({gig.reviewsCount} reviews)</span>
                                </div>
                            </div>
                        </div>

                        {/* Gallery (Simple for now) */}
                        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                            <img
                                src={gig.images[0]}
                                alt="Gig Main"
                                className="w-full h-auto object-cover max-h-[500px]"
                            />
                        </div>

                        {/* About This Gig */}
                        <div className="card p-8">
                            <h2 className="heading-3 mb-6">About This Gig</h2>
                            <div className="text-body whitespace-pre-line">
                                {gig.description}
                            </div>
                        </div>

                        {/* About The Seller */}
                        <div className="card p-8">
                            <h2 className="heading-3 mb-6">About The Seller</h2>
                            <div className="flex flex-col md:flex-row gap-6 mb-6">
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={gig.author.avatar}
                                        alt={gig.author.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-50"
                                    />
                                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{gig.author.name}</h3>
                                    <p className="text-gray-500 mb-3">{gig.author.role}</p>
                                    <div className="flex items-center gap-1 mb-4">
                                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-bold text-gray-900">{gig.rating}</span>
                                        <span className="text-gray-400">({gig.reviewsCount} reviews)</span>
                                    </div>
                                    <button className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                                        Contact Me
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 p-6 border border-gray-100 rounded-xl bg-gray-50/50">
                                <div>
                                    <span className="text-gray-500 text-sm block">From</span>
                                    <span className="font-bold text-gray-900">{gig.author.location}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-sm block">Member since</span>
                                    <span className="font-bold text-gray-900">{gig.author.memberSince}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-sm block">Avg. response time</span>
                                    <span className="font-bold text-gray-900">{gig.author.avgResponseTime}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-sm block">Last delivery</span>
                                    <span className="font-bold text-gray-900">1 day ago</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Pricing Packages (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 card">
                            {/* Tabs */}
                            <div className="flex border-b border-gray-100">
                                {PACKAGES.map((pkg, idx) => (
                                    <button
                                        key={pkg.name}
                                        onClick={() => setActiveTab(idx)}
                                        className={`flex-1 py-4 text-sm font-bold text-center transition-colors border-b-2 ${activeTab === idx
                                                ? "text-[#1dbf73] border-[#1dbf73] bg-[#1dbf73]/5"
                                                : "text-gray-500 border-transparent hover:text-gray-700"
                                            }`}
                                    >
                                        {pkg.name}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6 md:p-8 space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-gray-900 text-lg">{PACKAGES[activeTab].name}</h3>
                                    <span className="text-2xl font-bold text-gray-900">${PACKAGES[activeTab].price}</span>
                                </div>

                                <p className="text-sm text-gray-600 leading-relaxed min-h-[60px]">
                                    {PACKAGES[activeTab].description}
                                </p>

                                <div className="flex items-center gap-4 text-sm font-bold text-gray-700">
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {PACKAGES[activeTab].delivery}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        {PACKAGES[activeTab].revisions}
                                    </div>
                                </div>

                                <ul className="space-y-3">
                                    {PACKAGES[activeTab].features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-500">
                                            <svg className="w-4 h-4 text-[#1dbf73] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button className="btn-primary w-full shadow-xl shadow-[#1dbf73]/20">
                                    Continue (${PACKAGES[activeTab].price})
                                </button>

                                <button className="w-full text-center text-sm font-medium text-[#1dbf73] hover:underline">
                                    Contact Seller
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

// Wrap the main page component in Suspense for useSearchParams
export default function GigDetailsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <GigDetailsContent />
        </Suspense>
    );
}
