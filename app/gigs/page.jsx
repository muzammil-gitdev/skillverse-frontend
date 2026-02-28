"use client";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import GigsNavbar from "@/components/GigsNavbar";
import GigCard from "@/components/GigCard";
import { AccountContext } from "../context/accountProvider";
// import { getUserById } from "@/services/api"; // make sure this exists
import { getUserById } from "../services/api";

export default function GigsPage() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user_id, setUserId, setAccount } = useContext(AccountContext);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        // ✅ 1. Get ID from context or localStorage
        let id = user_id || localStorage.getItem("user_id");

        // ❌ If no ID → redirect to login
        if (!id) {
          router.push("/login");
          return;
        }

        // ✅ If context missing but localStorage exists → restore context
        if (!user_id && id) {
          setUserId(id);
        }

        // ✅ Fetch logged in user
        const userData = await getUserById(id);
        const user = userData.user; // contains profilePic, name, email, etc.
        localStorage.setItem("user_data", JSON.stringify(user));
        setAccount(userData.user);
        // ✅ Fetch gigs
        const res = await fetch("http://localhost:1001/gig/get/gigs");
        const data = await res.json();

        if (data.success) {
          console.log("gigs page data", data);
          const mappedGigs = data.data.map((gig) => ({
            id: gig._id,
            title: gig.title,
            userName: gig.creatorName || " Unknown",
            userAvatar:
              gig.creator?.profilePic ||
              "https://res.cloudinary.com/dkr5ewnfu/image/upload/v1772314700/avatar_nzve1u.png",
            thumbnail:
              gig.images?.[0] ||
              "https://res.cloudinary.com/dkr5ewnfu/image/upload/v1772315776/images_hqgnan.jpg",
            description: gig.description,
            rating: gig.rating || 5,
            reviews: gig.reviews?.length || 0,
          }));

          setGigs(mappedGigs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [user_id]); // ✅ depend on user_id

  return (
    <div className="page-wrapper">
      <GigsNavbar />

      <main className="pt-32 pb-20 container-main">
        <div className="text-center py-12">
          <h1 className="heading-1 mb-4">
            Find the perfect freelance services
          </h1>
          <p className="text-subtitle">
            Browse through thousands of gigs created by talented freelancers.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading gigs...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gigs.map((gig) => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
