"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import GigsNavbar from "@/components/GigsNavbar";
import { getUserById, getGigsByUser } from "../../services/api";

export default function PublicProfilePage() {
    const params = useParams();
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserById(params.id);
                if (userData && userData.user) {
                    setUser(userData.user);
                    const userGigs = await getGigsByUser(params.id);
                    setGigs(userGigs || []);
                }
            } catch (err) {
                console.error("Error fetching user or gigs:", err);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchUserData();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-[#1dbf73] font-semibold">
                    Loading profile...
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 flex-col gap-4">
                <h2 className="text-2xl font-bold">User Not Found</h2>
                <Link href="/" className="text-[#1dbf73] hover:underline">Return to Home</Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <GigsNavbar />

            {/* Profile Header */}
            <div className="bg-[#1dbf73] pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                        <Image
                            src={user.profilePic || "https://res.cloudinary.com/dkr5ewnfu/image/upload/v1771180417/cld-sample-2.jpg"}
                            alt={user.fullName || "User Profile"}
                            fill
                            className="rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
                    </div>

                    <div className="text-center md:text-left text-white flex-1">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">{user.fullName}</h1>
                        <p className="text-green-50 text-lg mb-4">{user.field || "Professional Freelancer"}</p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium">
                            <span className="bg-white/20 px-4 py-1.5 rounded-full border border-white/30 backdrop-blur-sm">
                                Member since {new Date(user.createdAt || Date.now()).getFullYear()}
                            </span>
                            <span className="flex items-center gap-1 bg-white/20 px-4 py-1.5 rounded-full border border-white/30 backdrop-blur-sm">
                                <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {user.rating || "4.9"} ({user.totalReviews || 120} reviews)
                            </span>
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        <button
                            onClick={() => router.push(`/chat?receiverId=${user._id}`)}
                            className="bg-white text-[#1dbf73] px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-md"
                        >
                            Contact Me
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {user.description || `Hi, I am ${user.fullName}, a professional freelancer offering a wide range of services. I am highly motivated to deliver quality work and build long-term relationships with my clients. Let's work together to achieve your goals!`}
                    </p>
                </div>

                {/* User Gigs */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{user.fullName}&apos;s Gigs</h2>

                {gigs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gigs.map((gig) => (
                            <Link
                                href={`/gigs/${gig._id}`}
                                key={gig._id}
                                className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-[#1dbf73]/50 transition-all flex flex-col"
                            >
                                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                                    <Image
                                        src={gig.images?.[0] || "https://res.cloudinary.com/dkr5ewnfu/image/upload/v1771180417/cld-sample-2.jpg"}
                                        alt={gig.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[48px] group-hover:text-[#1dbf73] transition-colors">{gig.title}</h3>
                                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-bold text-gray-900 text-xs">4.9 {`(120)`}</span>
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <span className="text-xs text-gray-500 font-medium">STARTING AT</span>
                                        <span className="font-bold text-gray-900 text-lg">${gig.packages?.basic?.price || gig.price || 0}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                        <h3 className="text-gray-900 font-bold mb-2">No Gigs Yet</h3>
                        <p className="text-gray-500 text-sm">This user hasn&apos;t published any gigs so far.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
