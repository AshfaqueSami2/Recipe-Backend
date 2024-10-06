'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch all recipes
    fetch('http://localhost:5000/api/recipes')
      .then((response) => response.json())
      .then((data) => setRecipes(data.data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src={recipe.images[0]}
              alt={recipe.title}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 mb-4">{recipe.description}</p>
              <Link
                href={`/allrecipe/${recipe._id}`}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 block text-center"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
