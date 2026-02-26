"use client";
import React, { useState, Suspense, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import GigsNavbar from "@/components/GigsNavbar";
import Image from "next/image";
import { getGigById } from "../../services/api";

function GigDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const [gig, setGig] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const data = await getGigById(params.id);
        if (data.success) {
          setGig(data.data);
          // Set initial active tab based on available packages
          const firstAvailable = Object.keys(data.data.packages)[0];
          setActiveTab(firstAvailable || "basic");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#1dbf73] font-semibold">
          Loading gig details...
        </div>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Gig not found
      </div>
    );
  }

  const currentPackage = gig.packages[activeTab];

  return (
    <div className="page-wrapper bg-white">
      <GigsNavbar />

      <main className="pt-32 pb-20 container-main">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT SIDE — Gig Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {gig.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-2">
                  <Image
                    src={
                      gig.creator?.profilePic ||
                      "https://res.cloudinary.com/dkr5ewnfu/image/upload/v1771180417/cld-sample-2.jpg"
                    }
                    alt={gig.creator?.fullName}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  <span className="font-bold text-gray-900">
                    {gig.creator?.fullName}
                  </span>
                </div>
                <span>|</span>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-gray-900">4.9</span>
                  <span className="text-gray-400">(120 reviews)</span>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <Image
                src={
                  gig.images?.[0] ||
                  "https://res.cloudinary.com/dkr5ewnfu/image/upload/v1771180417/cld-sample-2.jpg"
                }
                alt="Gig Main"
                width={1200}
                height={800}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>

            {/* Description */}
            <div className="card p-8">
              <h2 className="heading-3 mb-6">About This Gig</h2>
              <div className="text-body whitespace-pre-line text-gray-700 leading-relaxed">
                {gig.description}
              </div>
            </div>

            {/* About The Seller */}
            <div className="card p-8">
              <h2 className="heading-3 mb-6">About The Seller</h2>
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="relative flex-shrink-0">
                  <Image
                    src={
                      gig.creator?.profilePic ||
                      "/https://res.cloudinary.com/dkr5ewnfu/image/upload/v1771180417/cld-sample-2.jpg"
                    }
                    alt={gig.creator?.fullName}
                    width={96}
                    height={96}
                    className="rounded-full object-cover border-4 border-gray-50"
                  />
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {gig.creator?.fullName}
                  </h3>
                  <p className="text-gray-500 mb-3">Professional Freelancer</p>
                  <button
                    onClick={() =>
                      router.push(`/chat?sellerId=${gig.creator?._id}`)
                    }
                    className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Contact Me
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 p-6 border border-gray-100 rounded-xl bg-gray-50/50">
                <div>
                  <span className="text-gray-500 text-sm block">From</span>
                  <span className="font-bold text-gray-900">International</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm block">
                    Avg. response time
                  </span>
                  <span className="font-bold text-gray-900">1 Hour</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — Dynamic Packages (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 card">
              {/* Tabs */}
              <div className="flex border-b border-gray-100">
                {Object.keys(gig.packages).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex-1 py-4 text-sm font-bold text-center transition-colors border-b-2 ${
                      activeTab === key
                        ? "text-[#1dbf73] border-[#1dbf73] bg-[#1dbf73]/5"
                        : "text-gray-500 border-transparent hover:text-gray-700"
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>

              {/* Package Details */}
              {currentPackage && (
                <div className="p-6 md:p-8 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {currentPackage.title || activeTab}
                    </h3>
                    <span className="text-2xl font-bold text-gray-900">
                      ${currentPackage.price}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed min-h-[60px]">
                    {currentPackage.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm font-bold text-gray-700">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {currentPackage.deliveryTime} Days Delivery
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      {currentPackage.revisions === 999
                        ? "Unlimited"
                        : currentPackage.revisions}{" "}
                      Revisions
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      router.push(`/gigs/${gig._id}/order?package=${activeTab}`)
                    }
                    className="btn-primary w-full shadow-xl shadow-[#1dbf73]/20 py-3 rounded-lg font-bold"
                  >
                    Continue (${currentPackage.price})
                  </button>

                  <button
                    onClick={() =>
                      router.push(`/chat?sellerId=${gig.creator?._id}`)
                    }
                    className="w-full text-center text-sm font-medium text-[#1dbf73] hover:underline"
                  >
                    Contact Seller
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function GigDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <GigDetailsContent />
    </Suspense>
  );
}
