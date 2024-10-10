"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { jwtDecode } from "jwt-decode"; // Assuming you are storing JWT in localStorage
import { FaStar } from "react-icons/fa"; // For star icons

// Define types for Recipe and User
type Recipe = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  published: boolean;
  upvotes: string[]; // Array of user IDs
  downvotes: string[]; // Array of user IDs
  averageRating: number; // Average rating for the recipe
  ratings: { user: string; rating: number }[]; // Array of ratings by users
  tags?: string[];
  user?: { _id: string; name: string; profilePicture: string } | null; // User field (can be null)
};

type User = {
  _id: string;
  name: string;
  role: "admin" | "user";
};

const AllRecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedRating, setSelectedRating] = useState<{
    [key: string]: number;
  }>({});

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<User>(token);
      setUser(decodedToken);
    }
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          "https://recipebackend-phi.vercel.app/api/recipes"
        );
        const data = await response.json();

        // Only keep the published recipes
        let publishedRecipes = data.data.filter(
          (recipe: Recipe) => recipe.published
        );

        // Sort recipes by upvotes (most upvoted first)
        publishedRecipes = publishedRecipes.sort(
          (a: Recipe, b: Recipe) => b.upvotes.length - a.upvotes.length
        );

        setRecipes(publishedRecipes);
        setLoading(false);
      } catch {
        setError("Failed to fetch recipes");
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleVote = async (
    recipeId: string,
    voteType: "upvote" | "downvote"
  ) => {
    if (!user) {
      alert("You must be logged in to vote");
      return;
    }

    if (user.role === "admin") {
      alert("Admins cannot vote");
      return;
    }

    try {
      const response = await fetch(
        `https://recipebackend-phi.vercel.app/api/recipes/${recipeId}/${voteType}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to vote");
      const updatedRecipe = await response.json();

      // Update the recipe list with the new vote counts
      setRecipes((prevRecipes) =>
        prevRecipes
          .map((recipe) =>
            recipe._id === updatedRecipe.data._id
              ? { ...updatedRecipe.data, user: recipe.user } // Retain the user info
              : recipe
          )
          .sort((a, b) => b.upvotes.length - a.upvotes.length) // Keep the recipes sorted after voting
      );
    } catch {
      alert("Failed to cast vote");
    }
  };

  const handleRate = async (recipeId: string, rating: number) => {
    if (!user) {
      alert("You must be logged in to rate");
      return;
    }

    if (user.role === "admin") {
      alert("Admins cannot rate");
      return;
    }

    try {
      const response = await fetch(
        `https://recipebackend-phi.vercel.app/api/recipes/${recipeId}/rate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ rating }),
        }
      );

      if (!response.ok) throw new Error("Failed to rate recipe");
      const updatedRecipe = await response.json();

      // Update the recipe list with the new rating
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe._id === updatedRecipe.data._id
            ? { ...updatedRecipe.data, user: recipe.user } // Retain the user info
            : recipe
        )
      );
    } catch {
      alert("Failed to submit rating");
    }
  };

  const handleStarClick = (recipeId: string, rating: number) => {
    setSelectedRating((prevRatings) => ({
      ...prevRatings,
      [recipeId]: rating,
    }));

    handleRate(recipeId, rating);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div> {/* The spinner will be displayed while loading */}
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">All Recipes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <motion.div
            key={recipe._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              className="w-full h-48 object-cover"
              src={recipe.images[0] || "https://via.placeholder.com/150"}
              alt={recipe.title}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {recipe.title}
              </h3>
              <p className="text-gray-600">{recipe.description}</p>

              {/* Display user info (profile picture and name) if user exists */}
              {recipe.user ? (
                <Link href={`/profile/${recipe.user._id}`}>
                  <div className="flex items-center mt-4">
                    <img
                      src={recipe.user.profilePicture}
                      alt={recipe.user.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-gray-700">{recipe.user.name}</span>
                  </div>
                </Link>
              ) : (
                <p className="text-gray-500 italic">Recipe author unknown</p>
              )}
            </div>

            {/* Tags */}
            <div className="px-4 py-2">
              {recipe.tags &&
                recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full mr-2"
                  >
                    #{tag}
                  </span>
                ))}
            </div>

            {/* Upvote / Downvote Buttons */}
            <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleVote(recipe._id, "upvote")}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600"
                >
                  Upvote {recipe.upvotes.length}
                </button>
                <button
                  onClick={() => handleVote(recipe._id, "downvote")}
                  className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                >
                  Downvote {recipe.downvotes.length}
                </button>
              </div>
              <Link
                href={`/allrecipe/${recipe._id}`}
                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
              >
                View Recipe
              </Link>
            </div>

            {/* Rating Section */}
            <div className="p-4">
              <p className="text-gray-600 mb-2">
                Average Rating: {recipe.averageRating.toFixed(1)} / 5
              </p>

              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={20}
                    color={selectedRating[recipe._id] >= star ? "gold" : "gray"}
                    onClick={() => handleStarClick(recipe._id, star)}
                    className={`cursor-pointer ${
                      !user || user.role === "admin"
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipesPage;
