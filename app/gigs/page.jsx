"use client";
import { useEffect, useState } from "react";
import GigsNavbar from "@/components/GigsNavbar";
import GigCard from "@/components/GigCard";

export default function GigsPage() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await fetch("http://localhost:1001/api/freelancers");
        const data = await res.json();

        if (data.success) {
          // map database fields to gig format
          const mappedGigs = data.data.map((freelancer) => ({
            id: freelancer._id,
            title: freelancer.title,
            userName: freelancer.name,
            userAvatar: freelancer.userAvatar, // optional: you can store avatar in DB
            thumbnail: freelancer.thumbnail, // optional: sample gig image
            description: freelancer.description,
            rating: freelancer.rating || 5,
            reviews: Math.floor(Math.random() * 100) + 1, // random reviews count
          }));

          setGigs(mappedGigs);
        } else {
          console.error("Failed to fetch gigs:", data.error);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <GigsNavbar />

      <main className="pt-24 px-6 max-w-7xl mx-auto pb-20">
        <div className="text-center py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find the perfect freelance services
          </h1>
          <p className="text-gray-500 text-lg">
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
