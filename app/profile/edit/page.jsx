"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GigsNavbar from "@/components/GigsNavbar";
import Image from "next/image";
import { useContext } from "react";
import { AccountContext } from "@/app/context/accountProvider";
import { updateUser } from "../../services/api";
import { getUserById } from "../../services/api";
function EditProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user_id, setAccount } = useContext(AccountContext);
  let id = user_id || localStorage.getItem("user_id");
  // Initialize state from URL params or defaults
  const [formData, setFormData] = useState({
    name: searchParams.get("name") || "",
    role: searchParams.get("role") || "client",
    email: searchParams.get("email") || "",
    avatar: searchParams.get("avatar") || "",
    skills: searchParams.get("skills") || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: formData.name,
      email: formData.email,
      profilePic: formData.avatar,
      role: formData.role,
      skills: formData.skills
        ? formData.skills.split(",").map((s) => s.trim())
        : [],
    };

    console.log("Sending:", payload);

    const updated = await updateUser(user_id, payload);

    if (updated) {
      const userData = await getUserById(id);
      const user = userData.user; // contains profilePic, name, email, etc.
      localStorage.setItem("user_data", JSON.stringify(user));
      setAccount(userData.user);
      router.push("/profile");
    }
  };

  return (
    <div className="page-wrapper bg-gray-50 min-h-screen">
      <GigsNavbar />

      <main className="pt-32 pb-20 container-main max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          <h1 className="heading-2 mb-2">Edit Profile</h1>
          <p className="text-gray-500 mb-8">
            Update your personal information and profile details.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Preview */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={formData.avatar || "/default-avatar.png"}
                  alt="Profile Preview"
                  fill
                  className="rounded-full object-cover border-4 border-gray-100"
                />
                <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-white text-xs font-semibold">
                    Change
                  </span>
                </div>
              </div>
              <FormInput
                label="Profile Picture URL"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="client">Client</option>
              <option value="freelancer">Freelancer</option>
              <option value="both">Both</option>
            </select>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Skills
              </label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-400 mt-1">
                Separate skills with commas.
              </p>
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
function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
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
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <EditProfileContent />
    </Suspense>
  );
}
