"use client";
import { useState } from "react";
import GigsNavbar from "@/components/GigsNavbar";
import Link from "next/link";

export default function CreateGigPage() {
    const [activeTab, setActiveTab] = useState("Basic");
    const [enabledPackages, setEnabledPackages] = useState(["Basic"]); // Basic is always enabled
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        packages: {
            Basic: { name: "Basic", description: "", price: "", delivery: "", revisions: "", features: [] },
            Standard: { name: "Standard", description: "", price: "", delivery: "", revisions: "", features: [] },
            Premium: { name: "Premium", description: "", price: "", delivery: "", revisions: "", features: [] }
        },
        images: [] // For file uploads
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePackageChange = (pkgType, field, value) => {
        setFormData({
            ...formData,
            packages: {
                ...formData.packages,
                [pkgType]: {
                    ...formData.packages[pkgType],
                    [field]: value
                }
            }
        });
    };

    const togglePackage = (pkgType) => {
        if (enabledPackages.includes(pkgType)) {
            setEnabledPackages(enabledPackages.filter(p => p !== pkgType));
            if (activeTab === pkgType) setActiveTab("Basic");
        } else {
            setEnabledPackages([...enabledPackages, pkgType]);
            setActiveTab(pkgType);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Filter out disabled packages before sending
        const finalPackages = enabledPackages.map(type => formData.packages[type]);
        const submissionData = { ...formData, packages: finalPackages };

        console.log("Submitting Gig:", submissionData);
        alert("Gig Created Successfully! (Check console for data)");
        // Redirect or API call here
    };

    return (
        <div className="page-wrapper">
            <GigsNavbar />

            <main className="pt-32 pb-20 container-main max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="heading-1">Create a New Gig</h1>
                    <Link href="/profile" className="text-gray-500 hover:text-[#1dbf73]">Cancel</Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">

                    {/* 1. Overview Section */}
                    <div className="card p-8 space-y-6">
                        <h2 className="heading-2 border-b border-gray-100 pb-4 mb-4">Overview</h2>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Gig Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                className="input-field text-lg"
                                placeholder="I will do something I'm really good at"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                            <p className="text-xs text-gray-400 mt-2 text-right">0 / 80 max</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Category</label>
                            <select
                                name="category"
                                required
                                className="input-field cursor-pointer"
                                value={formData.category}
                                onChange={handleInputChange}
                            >
                                <option value="">Select a Category</option>
                                <option value="Graphics & Design">Graphics & Design</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="Writing & Translation">Writing & Translation</option>
                                <option value="Video & Animation">Video & Animation</option>
                                <option value="Music & Audio">Music & Audio</option>
                                <option value="Programming & Tech">Programming & Tech</option>
                            </select>
                        </div>
                    </div>

                    {/* 2. Pricing Section */}
                    <div className="card p-8 space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-4 mb-4">
                            <h2 className="heading-2">Pricing Packages</h2>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Enable Packages:</span>
                                {["Standard", "Premium"].map(pkg => (
                                    <button
                                        key={pkg}
                                        type="button"
                                        onClick={() => togglePackage(pkg)}
                                        className={`px-3 py-1 rounded-full border transition-all ${enabledPackages.includes(pkg)
                                                ? "bg-[#1dbf73] text-white border-[#1dbf73]"
                                                : "bg-gray-50 text-gray-400 border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        + {pkg}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tabs for Mobile / Small Screens */}
                        <div className="flex border-b border-gray-200 mb-6">
                            {enabledPackages.map(pkg => (
                                <button
                                    key={pkg}
                                    type="button"
                                    onClick={() => setActiveTab(pkg)}
                                    className={`px-6 py-3 text-sm font-bold transition-colors border-b-2 ${activeTab === pkg
                                            ? "border-[#1dbf73] text-[#1dbf73]"
                                            : "border-transparent text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    {pkg}
                                </button>
                            ))}
                        </div>

                        {/* Package Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-gray-900">Package Name</label>
                                <input
                                    type="text"
                                    className="input-field font-medium bg-gray-50"
                                    value={formData.packages[activeTab].name}
                                    disabled // Name is fixed based on type for simplicity here, or can be editable
                                    readOnly
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-gray-900">Price ($)</label>
                                <input
                                    type="number"
                                    required
                                    className="input-field"
                                    placeholder="e.g. 50"
                                    value={formData.packages[activeTab].price}
                                    onChange={(e) => handlePackageChange(activeTab, 'price', e.target.value)}
                                />
                            </div>

                            <div className="md:col-span-2 space-y-4">
                                <label className="block text-sm font-bold text-gray-900">Description</label>
                                <textarea
                                    className="input-field h-24 resize-none"
                                    placeholder="Describe what is currently included in this package..."
                                    value={formData.packages[activeTab].description}
                                    onChange={(e) => handlePackageChange(activeTab, 'description', e.target.value)}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-gray-900">Delivery Time</label>
                                <select
                                    className="input-field cursor-pointer"
                                    value={formData.packages[activeTab].delivery}
                                    onChange={(e) => handlePackageChange(activeTab, 'delivery', e.target.value)}
                                >
                                    <option value="">Select Delivery Time</option>
                                    {[1, 2, 3, 4, 5, 7, 10, 14, 21, 30].map(d => (
                                        <option key={d} value={`${d} Days Delivery`}>{d} Days Delivery</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-gray-900">Revisions</label>
                                <select
                                    className="input-field cursor-pointer"
                                    value={formData.packages[activeTab].revisions}
                                    onChange={(e) => handlePackageChange(activeTab, 'revisions', e.target.value)}
                                >
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="Unlimited">Unlimited</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 3. Description Section */}
                    <div className="card p-8 space-y-6">
                        <h2 className="heading-2 border-b border-gray-100 pb-4 mb-4">Description</h2>
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Gig Description</label>
                            <textarea
                                name="description"
                                required
                                className="input-field h-64"
                                placeholder="Briefly Describe Your Gig..."
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                            <p className="text-xs text-gray-400 mt-2">Describe your gig in detail. Be as clear as possible.</p>
                        </div>
                    </div>

                    {/* 4. Gallery Section (Mock) */}
                    <div className="card p-8 space-y-6">
                        <h2 className="heading-2 border-b border-gray-100 pb-4 mb-4">Gallery</h2>
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-[#1dbf73] hover:bg-green-50/10 transition-colors cursor-pointer">
                            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-600 font-medium">Drag & Drop Photos or <span className="text-[#1dbf73] underline">Browse</span></p>
                            <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG, JPEG (Max 5MB)</p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4 pt-4">
                        <button className="px-8 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary px-12 text-lg">
                            Publish Gig
                        </button>
                    </div>

                </form>
            </main>
        </div>
    );
}
