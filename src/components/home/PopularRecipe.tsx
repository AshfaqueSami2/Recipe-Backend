"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router for redirection
import { motion } from "framer-motion";

// Define the Recipe type to prevent errors
interface Recipe {
  id: number;
  title: string;
  description: string;
  images: string;
  tags: string[];
}

const PopularRecipe = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Add type for the recipes state
  const router = useRouter(); // Initialize router for redirection
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to check login status

  useEffect(() => {
    // Check if the user is logged in by checking the token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set true if token exists, false otherwise

    // Fetch the recipes from the API
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          "https://recipebackend-phi.vercel.app/api/recipes"
        );
        const data = await response.json();
        setRecipes(data.data.slice(0, 4)); // Fetch only 4 recipes
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  // Handle the click event on a recipe
  const handleRecipeClick = () => {
    if (!isLoggedIn) {
      // If the user is not logged in, redirect to /login
      router.push("/login");
    } else {
      // Otherwise, navigate to the recipe detail page
      router.push(`/allrecipe`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Top Recipes</h1>
      <div className="flex flex-wrap justify-center">
        {recipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            className="w-80 bg-white rounded-lg shadow-xl overflow-hidden m-4 cursor-pointer"
            whileHover={{ scale: 1.05 }} // Add hover effect
            initial={{ opacity: 0, y: -100 }} // Start the animation from above the screen (y: -100)
            animate={{ opacity: 1, y: 0 }} // Animate to opacity 1 and y: 0
            transition={{ duration: 0.6, ease: "easeOut" }} // Smoother animation
            onClick={() => handleRecipeClick()} // Trigger the click event
          >
            <img
              className="w-full h-56 object-cover rounded-t-lg"
              src={recipe.images}
              alt={recipe.title}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-gray-800">
                {recipe.title}
              </div>
              <p className="text-gray-600 text-base">{recipe.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              {recipe.tags &&
                recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-green-100 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularRecipe;
