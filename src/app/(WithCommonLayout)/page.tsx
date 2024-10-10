"use client";

import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader
import Banner from "@/src/components/home/Banner";
import PopularRecipe from "@/src/components/home/PopularRecipe";
import Testomonial from "@/src/components/home/Testomonial";
import Footer from "@/src/components/Ui/footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching or loading
    setTimeout(() => {
      setLoading(false); // Set loading to false after the delay
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color={"#4A90E2"} loading={loading} size={80} />
        </div>
      ) : (
        <>
          <Banner />
          <PopularRecipe />
          <Testomonial></Testomonial>
          <Footer></Footer>
        </>
      )}
    </>
  );
}
