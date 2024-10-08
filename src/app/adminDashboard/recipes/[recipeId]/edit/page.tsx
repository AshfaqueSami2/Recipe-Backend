'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

// Load Quill dynamically
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const EditRecipe = ({ params }: { params: { recipeId: string } }) => {
  const { recipeId } = params; // recipeId from dynamic route

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (recipeId) {
      // Fetch the recipe data for editing
      const fetchRecipe = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/recipe/${recipeId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTitle(response.data.data.title);
          setDescription(response.data.data.description);
        } catch (error) {
          console.error('Failed to fetch recipe', error);
        }
      };

      fetchRecipe();
    }
  }, [recipeId]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/recipe/${recipeId}`, { title, description }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Recipe updated successfully');
      window.location.href = '/adminDashboard/recipes'; // Navigate back after update
    } catch (error) {
      console.error('Failed to update recipe', error);
    }
  };

  if (!recipeId) {
    return <div>Loading...</div>; // Show a loading state while waiting for the recipeId
  }

  return (
    <div className="container mx-auto max-w-3xl p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Recipe</h1>
      
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Recipe Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter recipe title"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Recipe Description</label>
        <div className="bg-white border border-gray-300 rounded-lg">
          <ReactQuill
            value={description}
            onChange={setDescription}
            className="w-full h-48"
            placeholder="Write the recipe description here..."
          />
        </div>
      </div>

      <button
        onClick={handleUpdate}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Update Recipe
      </button>
    </div>
  );
};

export default EditRecipe;
