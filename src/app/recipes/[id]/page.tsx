'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const RecipeDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic id from the route
  const [recipe, setRecipe] = useState(null);
  
  useEffect(() => {
    if (id) {
      // Fetch the recipe details using the public recipe endpoint
      const fetchRecipeDetail = async () => {
        const response = await fetch(`http://localhost:5000/public/recipes/${id}`);
        const result = await response.json();
        if (result.success) {
          setRecipe(result.data);
        }
      };
      
      fetchRecipeDetail();
    }
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      <img
        src={recipe.images}
        alt={recipe.name}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-gray-700 mb-4">{recipe.description}</p>
      {/* Add more fields from the recipe object if needed */}
    </div>
  );
};

export default RecipeDetailPage;
