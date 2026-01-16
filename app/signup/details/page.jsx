"use client";
import { useState, Suspense } from "react"; // Added Suspense
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Available niches and their corresponding software/tools
const NICHE_SOFTWARE = {
    "Video Editing": ["Adobe Premiere Pro", "DaVinci Resolve", "Final Cut Pro", "After Effects", "CapCut"],
    "Graphic Design": ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Canva", "InDesign"],
    "Web Development": ["VS Code", "React", "Node.js", "WordPress", "Docker"],
    "Content Writing": ["Microsoft Word", "Google Docs", "Grammarly", "Notion", "Jasper"],
    "Digital Marketing": ["Google Analytics", "SEMrush", "Mailchimp", "Hootsuite", "Canva"],
    "Other": []
};

// Mock data for locations
const COUNTRIES = ["United States", "United Kingdom", "Canada", "Australia", "India", "Pakistan", "Germany", "France"];

function SignUpDetailsContent() { // Create a separate component for the content
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        name: searchParams.get("name") || "",
        email: searchParams.get("email") || "",
        dob: searchParams.get("dob") || "",
        country: "",
        city: "",
        niche: "",
        software: [],
        customSoftware: "" // For "Other" or manual entry
    });

    const [availableSoftware, setAvailableSoftware] = useState([]);

    const handleNicheChange = (e) => {
        const niche = e.target.value;
        setFormData({ ...formData, niche, software: [] });
        setAvailableSoftware(NICHE_SOFTWARE[niche] || []);
    };

    const handleSoftwareToggle = (tool) => {
        const currentSoftware = formData.software;
        if (currentSoftware.includes(tool)) {
            setFormData({ ...formData, software: currentSoftware.filter(s => s !== tool) });
        } else {
            setFormData({ ...formData, software: [...currentSoftware, tool] });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Final Registration Data:", formData);
        alert("Sign Up Complete! (Check console for data)");
        // Here you would typically send data to your backend API
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Form Section */}
            <div className="flex items-center justify-center p-8 bg-white order-2 md:order-1 relative">
                <Link href="/signup" className="link-back">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back
                </Link>

                {/* Form Container */}
                <div className="w-full max-w-md mt-12 md:mt-0">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Complete Your Profile</h2>
                        <p className="mt-2 text-gray-500">Tell us about your skills and location</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">

                            {/* Location: Country */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <select
                                    className="input-field cursor-pointer"
                                    required
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                >
                                    <option value="">Select Country</option>
                                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            {/* Location: City */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    required
                                    placeholder="Enter your city"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>

                            {/* Niche Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">What is your Niche?</label>
                                <select
                                    className="input-field cursor-pointer"
                                    required
                                    value={formData.niche}
                                    onChange={handleNicheChange}
                                >
                                    <option value="">Select Niche</option>
                                    {Object.keys(NICHE_SOFTWARE).map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>

                            {/* Software Selection */}
                            {formData.niche && availableSoftware.length > 0 && (
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Software & Tools Used</label>
                                    <div className="flex flex-wrap gap-2">
                                        {availableSoftware.map(tool => (
                                            <button
                                                key={tool}
                                                type="button"
                                                onClick={() => handleSoftwareToggle(tool)}
                                                className={`px-3 py-1.5 text-sm rounded-full border transition-all ${formData.software.includes(tool)
                                                        ? "bg-[#1dbf73] text-white border-[#1dbf73]"
                                                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                {tool}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-400">Select all that apply</p>
                                </div>
                            )}

                            {/* Add Custom Software Input for flexibility */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Add Other Software (Optional)</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. Trello, Slack"
                                    value={formData.customSoftware}
                                    onChange={(e) => setFormData({ ...formData, customSoftware: e.target.value })}
                                />
                            </div>

                        </div>

                        <button type="submit" className="btn-primary mt-6">
                            Complete Sign Up
                        </button>
                    </form>
                </div>
            </div>

            {/* Hero Section - Right Side */}
            <div className="hidden md:flex flex-col justify-center items-center bg-[#1dbf73] p-12 relative overflow-hidden order-1 md:order-2 group">
                <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80")' }}></div>
                <div className="absolute inset-0 z-0 bg-[#1dbf73]/90 mix-blend-multiply"></div>
                <div className="absolute inset-0 z-0 bg-gradient-to-bl from-[#1dbf73]/95 to-teal-900/80"></div>

                {/* Decorative Circles */}
                <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] rounded-full border-[40px] border-white/10 z-0"></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] rounded-full border-[40px] border-white/10 z-0"></div>

                <div className="relative z-10 text-center text-white space-y-6 max-w-lg">
                    <h1 className="text-4xl font-bold">Almost There!</h1>
                    <p className="text-lg text-green-50">Just a few more details to set up your professional profile.</p>
                </div>
            </div>
        </div>
    );
}

// Wrap the main page component in Suspense
export default function SignUpDetailsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SignUpDetailsContent />
        </Suspense>
    );
}
