'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import PrivateRoute from '@/src/utils/privateRoute';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }); // Dynamically import Quill.js to avoid SSR issues

const EditRecipe = () => {
  const { recipeId } = useParams();
  const router = useRouter();
  const [recipeData, setRecipeData] = useState({
    title: '',
    ingredients: '',
    instructions: ''
  });

  const [editorContent, setEditorContent] = useState(''); // For Quill.js editor content

  useEffect(() => {
    if (recipeId) {
      // Fetch the recipe details to populate the form
      axios.get(`http://localhost:5000/api/recipes/myrecipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(response => {
        const recipe = response.data.data;
        setRecipeData({
          title: recipe.title,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        });
        setEditorContent(recipe.instructions); // Set initial Quill editor content
      })
      .catch(error => {
        toast.error('Failed to load recipe data.');
      });
    }
  }, [recipeId]);

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handleChange = (e) => {
    setRecipeData({
      ...recipeData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/recipies/myrecipe/${recipeId}`, {
        ...recipeData,
        instructions: editorContent, // Send updated instructions from Quill editor
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });

      toast.success("Recipe updated successfully");
      router.push(`/adminDashboard/myrecipe/${recipeId}`);
    } catch (error) {
      toast.error("Failed to update the recipe.");
    }
  };

  return (
    <PrivateRoute allowedRoles={['admin']}>
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipeData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
            Ingredients
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
            Instructions
          </label>
          <ReactQuill value={editorContent} onChange={handleEditorChange} />
        </div>
        
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Update Recipe
        </button>
      </form>
    </div>
    </PrivateRoute>
  );
};

export default EditRecipe;

