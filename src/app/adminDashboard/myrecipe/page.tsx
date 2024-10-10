"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import PrivateRoute from "@/src/utils/privateRoute";
import { SortOption, TRecipe } from "@/src/types/recipe";


const MyRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<TRecipe[]>([]); // Use the TRecipe array
  const [filteredRecipes, setFilteredRecipes] = useState<TRecipe[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recipesPerPage] = useState<number>(6); // Number of recipes per page
  const [sortOption, setSortOption] = useState<SortOption>(""); // Sorting option

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          "https://recipebackend-phi.vercel.app/api/recipes/myrecipes",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setRecipes(data.data.recipes);
          setFilteredRecipes(data.data.recipes);
        } else {
          toast.error("Failed to fetch recipes.");
        }
      } 
      catch {
        toast.error("An error occurred while fetching recipes.");
      }
      
    };

    fetchRecipes();
  }, []);

  // Search handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Filter recipes by search
  const handleFilter = () => {
    let filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchText.toLowerCase())
    );

    // Apply sorting
    if (sortOption === "title-asc") {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "title-desc") {
      filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "time-asc") {
      filtered = filtered.sort((a, b) => a.cookingTime - b.cookingTime);
    } else if (sortOption === "time-desc") {
      filtered = filtered.sort((a, b) => b.cookingTime - a.cookingTime);
    } else if (sortOption === "rating-asc") {
      filtered = filtered.sort((a, b) => a.averageRating - b.averageRating);
    } else if (sortOption === "rating-desc") {
      filtered = filtered.sort((a, b) => b.averageRating - a.averageRating);
    } else if (sortOption === "newest") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortOption === "oldest") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (sortOption === "premium") {
      filtered = filtered.sort((a, ) => (a.premium === "yes" ? -1 : 1));
    }

    setFilteredRecipes(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Pagination logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">My Recipes</h1>

        {/* Search and Filter UI */}
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search recipes"
            className="border p-2 rounded w-1/2"
            value={searchText}
            onChange={handleSearch}
          />
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Filter
          </button>
        </div>

        {/* Sorting Options */}
        <div className="mb-6">
          <label className="mr-2">Sort By: </label>
          <select
            className="border p-2 rounded"
            value={sortOption}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortOption(e.target.value as SortOption)
            }
          >
            <option value="">Default</option>
            <option value="title-asc">Title: A to Z</option>
            <option value="title-desc">Title: Z to A</option>
            <option value="time-asc">Cooking Time: Low to High</option>
            <option value="time-desc">Cooking Time: High to Low</option>
            <option value="rating-asc">Rating: Low to High</option>
            <option value="rating-desc">Rating: High to Low</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="premium">Premium Status</option>
          </select>
        </div>

        {/* Recipes Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentRecipes.length > 0 ? (
            currentRecipes.map((recipe: TRecipe) => (
              <div
                key={recipe._id}
                className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
              >
                <img
                  src={
                    recipe.images && recipe.images.length > 0
                      ? recipe.images[0]
                      : "/placeholder.jpg"
                  }
                  alt={recipe.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold">{recipe.title}</h2>
                <p className="mt-2 text-gray-700">
                  {recipe.description.substring(0, 100)}...
                </p>
                <p className="mt-2">Cooking Time: {recipe.cookingTime} mins</p>
                <p className="mt-2">Average Rating: {recipe.averageRating}</p>
                <div className="mt-4">
                  <Link href={`/userDashboard/myrecipe/${recipe._id}`}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                      View Recipe
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from(
            { length: Math.ceil(filteredRecipes.length / recipesPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-2 px-4 py-2 border ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default MyRecipes;
