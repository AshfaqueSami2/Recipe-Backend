'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type Recipe = {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string; // Optional in case some recipes don’t have an image
};

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalRecipes, setTotalRecipes] = useState<number>(0);

  useEffect(() => {
    // Fetch all recipes from the backend
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/recipes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedRecipes = response.data.data;
        setRecipes(fetchedRecipes);
        setTotalRecipes(fetchedRecipes.length);
      } catch (error) {
        console.error('Failed to fetch recipes', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (recipeId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/recipe/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
      setTotalRecipes(totalRecipes - 1);
    } catch (error) {
      console.error('Failed to delete recipe', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Recipes ({totalRecipes})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {recipe.images && (
              <img
                src={recipe.images}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
              <p className="text-gray-700 mb-4">{recipe.description}</p>
              <div className="flex justify-between items-center">
                <Link href={`/adminDashboard/recipes/${recipe._id}/edit`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
