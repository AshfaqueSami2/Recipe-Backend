'use client'

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { io, Socket } from "socket.io-client"; // Import Socket.IO client
import PrivateRoute from "@/src/utils/privateRoute";

// Define the Recipe interface
interface Recipe {
  _id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  cookingTime: number;
  images: string[];
  isPremium: boolean;
}

const RecipeDetail: React.FC = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null); // Add type for recipe
  const [socket, setSocket] = useState<Socket | null>(null); // Add type for socket

  useEffect(() => {
    if (recipeId) {
      const fetchRecipe = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/recipes/myrecipes/${recipeId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setRecipe(data.data); // Set the initial recipe data
          } else {
            toast.error("Failed to fetch the recipe.");
          }
        } catch (error) {
          toast.error("An error occurred while fetching the recipe.");
        }
      };

      fetchRecipe();
    }

    const newSocket = io('http://localhost:5000'); // Connect to the Socket.IO server
    setSocket(newSocket);

    // Listen for recipe updates from the server
    newSocket.on('recipeUpdated', (updatedRecipe: Recipe) => {
      if (updatedRecipe._id === recipeId) {
        setRecipe(updatedRecipe); // Update the recipe data on the client side
      }
    });

    // Cleanup when the component is unmounted
    return () => {
      newSocket.disconnect();
    };
  }, [recipeId]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <PrivateRoute allowedRoles={['admin']}>
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={
          recipe.images && recipe.images.length > 0
            ? recipe.images[0]
            : "/placeholder.jpg"
        }
        alt={recipe.title}
        className="w-full h-60 object-cover rounded-lg mb-6"
      />
      <p className="text-lg text-gray-700">{recipe.description}</p>
      <h2 className="text-2xl font-semibold mt-6">Ingredients</h2>
      <ul className="list-disc list-inside">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mt-6">Instructions</h2>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      <h2 className="text-2xl font-semibold mt-6">Cooking Time</h2>
      <p>{recipe.cookingTime} minutes</p>
      {recipe.isPremium && (
        <p className="mt-4 text-yellow-500 font-semibold">Premium Recipe</p>
      )}

      {/* Add Update Button */}
      <div className="mt-6">
        <Link href={`/adminDashboard/myrecipe/${recipeId}/edit`}>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
            Update Recipe
          </button>
        </Link>
      </div>
    </div>
    </PrivateRoute>
  );
};

export default RecipeDetail;
