'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [sortByUpvotes, setSortByUpvotes] = useState(false);

  useEffect(() => {
    // Fetch all recipes
    fetchRecipes();
  }, [sortByUpvotes]);

  const fetchRecipes = () => {
    const url = sortByUpvotes
      ? 'http://localhost:5000/api/recipes?sort=upvotes'
      : 'http://localhost:5000/api/recipes';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Recipes Data:', data); // Log the fetched data to the console
        setRecipes(data.data); // Assuming the API response has a `data` field containing the recipes
      })
      .catch((error) => console.error('Error fetching recipes:', error));
  };

  const handleUpvote = async (recipeId) => {
    try {
      await fetch(`http://localhost:5000/api/recipes/${recipeId}/upvote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure the token is passed for authentication
        },
      });
      fetchRecipes(); // Refetch recipes to update the upvote count
    } catch (error) {
      console.error('Error upvoting recipe:', error);
    }
  };

  const handleDownvote = async (recipeId) => {
    try {
      await fetch(`http://localhost:5000/api/recipes/${recipeId}/downvote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure the token is passed for authentication
        },
      });
      fetchRecipes(); // Refetch recipes to update the downvote count
    } catch (error) {
      console.error('Error downvoting recipe:', error);
    }
  };

  const handleRating = async (recipeId, rating) => {
    try {
      await fetch(`http://localhost:5000/api/recipes/${recipeId}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure the token is passed for authentication
        },
        body: JSON.stringify({ rating }),
      });
      fetchRecipes(); // Refetch recipes to update the rating
    } catch (error) {
      console.error('Error rating recipe:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">All Recipes</h1>

      {/* Sorting option */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-6 py-2 rounded-full transition-all ${
            sortByUpvotes ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => setSortByUpvotes(!sortByUpvotes)}
        >
          {sortByUpvotes ? 'Sort by Default' : 'Sort by Upvotes'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
            <img
              className="w-full h-48 object-cover"
              src={recipe.images[0] || 'https://via.placeholder.com/400x200'}
              alt={recipe.title}
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">{recipe.title}</h2>
              <p className="text-gray-600 mb-4">{recipe.description}</p>

              {/* Author info */}
              <div className="flex items-center mb-4">
                <img
                  className="w-12 h-12 rounded-full border-2 border-gray-200 mr-3"
                  src={recipe.user?.profilePicture || 'https://via.placeholder.com/150'}
                  alt={recipe.user?.name || 'Unknown Author'}
                />
                <span className="text-gray-700 font-medium">{recipe.user?.name || 'Unknown Author'}</span>
              </div>

              {/* Upvote/Downvote */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => handleUpvote(recipe._id)}
                  className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
                >
                  <span>👍</span>
                  <span>{recipe.upvotes.length}</span>
                </button>
                <button
                  onClick={() => handleDownvote(recipe._id)}
                  className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
                >
                  <span>👎</span>
                  <span>{recipe.downvotes.length}</span>
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleRating(recipe._id, index + 1)}
                      className={`text-2xl ${
                        index < recipe.averageRating ? 'text-yellow-500' : 'text-gray-300'
                      } transition duration-300 hover:text-yellow-600`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <span className="text-gray-600 font-medium">({recipe.averageRating.toFixed(1)})</span>
              </div>

              <Link
                href={`/allrecipe/${recipe._id}`}
                className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300 block text-center"
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
