'use client';
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from 'next/link';

const MyRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch the recipes created by the logged-in user
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/recipes/myrecipes", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRecipes(data.data.recipes); // Assuming response contains `data.recipes`
        } else {
          toast.error("Failed to fetch recipes.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching recipes.");
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">My Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe._id} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
              <img
                src={recipe.images && recipe.images.length > 0 ? recipe.images[0] : '/placeholder.jpg'}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p className="mt-2 text-gray-700">{recipe.description.substring(0, 100)}...</p>
              <div className="mt-4">
                <Link href={`/userDashboard/${recipe._id}`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">View Recipe</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default MyRecipes;
