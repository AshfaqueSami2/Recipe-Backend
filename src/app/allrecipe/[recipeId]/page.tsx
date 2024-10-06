'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for useRouter in the app directory
import axios from 'axios';
import Image from 'next/image';

const RecipeDetails = ({ params }: { params: { recipeId: string } }) => {
  const router = useRouter(); // Correct useRouter from next/navigation
  const { recipeId } = params;

  const [recipe, setRecipe] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      const token = localStorage.getItem('token'); // Check for token

      if (!token) {
        // If not logged in, redirect to login page and include redirect URL
        router.push(`/login?redirect=/allrecipe/${recipeId}`);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${recipeId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the headers
          },
        });
        setRecipe(response.data.data); // Assuming your API response wraps data under 'data'
        setLoading(false);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setError('Authentication failed, please log in again.');
          router.push(`/login?redirect=/allrecipe/${recipeId}`);
        } else {
          setError('Failed to load recipe');
        }
        setLoading(false);
      }
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId, router]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4">{recipe.title}</h1>
      <div className="flex justify-center mb-4">
        <Image
          src={recipe.images[0]}
          alt={recipe.title}
          width={400}
          height={300}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Show content based on premium or non-premium user */}
      {recipe.teaser ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">{recipe.teaser}</p>
          <p className="text-blue-500 font-semibold">Subscribe to premium to see the full recipe!</p>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 text-lg mb-4">description: {recipe.description}</p>
          <p className="text-gray-600 mb-4">
            <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Tags:</strong> {recipe.tags.join(', ')}
          </p>
          <p className="text-gray-700">instructions: {recipe.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
