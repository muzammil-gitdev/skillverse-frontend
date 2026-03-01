"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GigsNavbar from "@/components/GigsNavbar";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../context/accountProvider";
import { getUserById } from "../services/api";
import { getGigsByUser } from "../services/api";
function ProfileContent() {
  const { user_id } = useContext(AccountContext);

  const [profile, setProfile] = useState(null);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!user_id) return;

        // 1️⃣ Get user details
        const userData = await getUserById(user_id);
        setProfile(userData.user);

        // 2️⃣ Get user gigs
        const userGigs = await getGigsByUser(user_id);
        setGigs(userGigs || []); // ✅ fallback safety
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user_id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return <div>No Profile Found</div>;
  }

  return (
    <div className="page-wrapper">
      <GigsNavbar />

      <main className="pt-32 pb-20 container-main">
        {/* Profile Header Card */}
        <div className="card mb-8">
          {/* Cover Banner */}
          <div className="h-48 bg-gradient-to-r from-[#1dbf73]/10 to-emerald-100"></div>

          <div className="px-8 pb-8 -mt-20 relative">
            {/* Profile Image & Basic Info Row */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="relative">
                <div className="h-40 w-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  <img
                    src={
                      profile.profilePic ||
                      "https://res.cloudinary.com/dkr5ewnfu/image/upload/v1772314700/avatar_nzve1u.png"
                    }
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 right-4 h-6 w-6 bg-[#1dbf73] border-2 border-white rounded-full"></div>
              </div>

              {/* Info */}
              <div className="flex-1 pt-2 md:pt-20 space-y-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="heading-1">{profile.fullName}</h1>
                    <p className="text-subtitle font-medium mb-1">
                      {profile.role}
                    </p>
                    {/* Display Email minimally if needed, or just keep it for the edit form */}
                    <p className="text-sm text-gray-400">{profile.email}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Edit Profile Button */}
                    <Link
                      href={{
                        pathname: "/profile/edit",
                        query: {
                          name: profile.fullName || "",
                          role: profile.role || "",
                          email: profile.email || "",
                          avatar: profile.profilePic || "",
                          skills: Array.isArray(profile.skills)
                            ? profile.skills.join(", ")
                            : profile.skills || "",
                        },
                      }}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      Edit Profile
                    </Link>

                    {/* Rating Pill */}
                    <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-100">
                      <svg
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold text-gray-900">
                        {profile.rating}
                      </span>
                      <span className="text-gray-400 text-sm">
                        ({profile.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: About & Skills */}
          <div className="lg:col-span-1 space-y-8">
            {/* About Section */}
            <div className="card p-8">
              <h2 className="heading-3 mb-4">About Me</h2>
              <p className="text-body">{profile.about}</p>
            </div>

            {/* Skills Section */}
            <div className="card p-8">
              <h2 className="heading-3 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="badge badge-light hover:border-[#1dbf73]/30 hover:text-[#1dbf73] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Active Gigs */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-2">My Gigs</h2>
              <Link
                href="/gigs/create"
                className="flex items-center gap-2 text-[#1dbf73] font-bold hover:text-[#19a463] hover:underline transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create New Gig
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {!gigs || gigs.length === 0 ? (
                <p>No gigs created yet.</p>
              ) : (
                gigs.map((gig) => (
                  <Link
                    key={gig._id}
                    href={`/gigs/${gig._id}`}
                    className="card card-hover group block"
                  >
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      <img
                        src={gig.images?.[0] || "/placeholder.jpg"}
                        alt="Gig Thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="heading-3 text-lg mb-2 group-hover:text-[#1dbf73] transition-colors">
                        {gig.title}
                      </h3>

                      <div className="flex items-center justify-between mt-4 text-sm">
                        <span className="text-gray-500">Starting at</span>
                        <span className="text-xl font-bold text-[#1dbf73]">
                          ${gig.packages.basic.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
