"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PopularCategories from "../components/PopularCategories";
import FeaturedFreelancers from "../components/FeaturedFreelancers";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function Test() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => setMsg(data.message));
  }, []);

  return <div className="p-10 text-xl">{msg}</div>;
}
export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />
      <Test />
      <PopularCategories />
      <FeaturedFreelancers />
      <CallToAction />
      <Footer />
    </main>
  );
}
