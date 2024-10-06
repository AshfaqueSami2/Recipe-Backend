'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 

const RecipeDetails = () => {
  const { recipeId } = useParams(); 

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (recipeId) {
      // Fetch the recipe data based on the recipeId
      fetch(`http://localhost:5000/api/recipes/${recipeId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.success && data.data) {
            setRecipe(data.data); // Access the `data` property as shown in the screenshot
          } else {
            console.error("Invalid response format");
          }
        })
        .catch(error => console.error('Failed to load recipe data', error));
    }
  }, [recipeId]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <p className="text-gray-700 mb-4">{recipe.description}</p>
      <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
      {/* You would render recipe.ingredients here */}
      <p className="text-gray-700 mb-4">{recipe.ingredients}</p>
      <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
      {/* You would render recipe.instructions here */}
      <p className="text-gray-700">{recipe.instructions}</p>
      <h2 className="text-xl font-semibold mb-2">Cooking Time:</h2>
      <p className="text-gray-700">{recipe.cookingTime} minutes</p>
      {/* Render images if available */}
      {recipe.images && recipe.images.length > 0 && (
        <img src={recipe.images[0]} alt={recipe.title} className="mt-4 rounded-lg" />
      )}
    </div>
  );
};

export default RecipeDetails;
