"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GigsNavbar from "@/components/GigsNavbar";
import Image from "next/image";

function EditProfileContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize state from URL params or defaults
    const [formData, setFormData] = useState({
        name: searchParams.get('name') || "John Doe",
        role: searchParams.get('role') || "Expert Full-Stack Developer & UI Designer",
        email: searchParams.get('email') || "john.doe@example.com",
        avatar: searchParams.get('avatar') || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=400&h=400&q=80",
        skills: searchParams.get('skills') || "React, Next.js, Node.js, Tailwind CSS, TypeScript, Figma, MongoDB, UI Design",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construct query params with updated data
        const params = new URLSearchParams(formData).toString();

        // Redirect back to profile page
        router.push(`/profile?${params}`);
    };

    return (
        <div className="page-wrapper bg-gray-50 min-h-screen">
            <GigsNavbar />

            <main className="pt-32 pb-20 container-main max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
                    <h1 className="heading-2 mb-2">Edit Profile</h1>
                    <p className="text-gray-500 mb-8">Update your personal information and profile details.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Profile Picture Preview */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative w-32 h-32 mb-4">
                                <Image
                                    src={formData.avatar}
                                    alt="Profile Preview"
                                    fill
                                    className="rounded-full object-cover border-4 border-gray-100"
                                />
                                <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                    <span className="text-white text-xs font-semibold">Change</span>
                                </div>
                            </div>
                            <FormInput
                                label="Profile Picture URL"
                                name="avatar"
                                value={formData.avatar}
                                onChange={handleChange}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <FormInput
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <FormInput
                            label="Role / Headline"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            placeholder="e.g. Senior Software Engineer"
                        />

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
                            <textarea
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                rows={3}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1dbf73] focus:border-transparent outline-none transition-all resize-none text-sm"
                                placeholder="Enter skills separated by commas (e.g. React, Design, Writing)"
                            ></textarea>
                            <p className="text-xs text-gray-400 mt-1">Separate skills with commas.</p>
                        </div>

                        <div className="pt-6 flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-6 py-3 border border-gray-200 rounded-lg text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-primary flex-1 py-3 shadow-lg shadow-[#1dbf73]/20"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

// Helper Component for inputs
function FormInput({ label, name, value, onChange, type = "text", placeholder = "" }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1dbf73] focus:border-transparent outline-none transition-all text-sm"
                required
            />
        </div>
    );
}

export default function EditProfilePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <EditProfileContent />
        </Suspense>
    );
}
