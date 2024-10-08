// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation"; // Use the new router
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css"; // Import styles for react-quill
// import toast from "react-hot-toast";
// import { useAuth } from "@/src/utils/AuthContext";

// // Dynamically import React Quill to prevent SSR issues
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });



// const CreateRecipe: React.FC = () => {
//   const router = useRouter();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [ingredients, setIngredients] = useState<string[]>([""]);
//   const [instructions, setInstructions] = useState("");
//   const [cookingTime, setCookingTime] = useState(0);
//   const [tags, setTags] = useState<string[]>([]);
//   const [imageURLs, setImageURLs] = useState<string[]>([""]);
//   const [isPremium, setIsPremium] = useState("no");

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const recipeData = {
//       title,
//       description,
//       instructions,
//       cookingTime,
//       ingredients,
//       tags,
//       images: imageURLs,
//       premium: isPremium,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/api/recipes/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(recipeData),
//       });

//       if (response.ok) {
//         toast.success("Recipe created successfully!");
//         router.push("/userDashboard/myrecipe"); // Redirect to myrecipe page
//       } else {
//         toast.error("Failed to create recipe.");
//       }
//     } catch (error) {
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   // Handle adding/removing ingredients
//   const handleIngredientChange = (index: number, value: string) => {
//     const updatedIngredients = [...ingredients];
//     updatedIngredients[index] = value;
//     setIngredients(updatedIngredients);
//   };

//   const addIngredient = () => setIngredients([...ingredients, ""]);

//   const removeIngredient = (index: number) => {
//     const updatedIngredients = ingredients.filter((_, i) => i !== index);
//     setIngredients(updatedIngredients);
//   };

//   // Handle adding/removing image URLs
//   const handleImageURLChange = (index: number, value: string) => {
//     const updatedImageURLs = [...imageURLs];
//     updatedImageURLs[index] = value;
//     setImageURLs(updatedImageURLs);
//   };

//   const addImageURL = () => setImageURLs([...imageURLs, ""]);

//   const removeImageURL = (index: number) => {
//     const updatedImageURLs = imageURLs.filter((_, i) => i !== index);
//     setImageURLs(updatedImageURLs);
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-semibold mb-4">Create Recipe</h1>

//       <form onSubmit={handleSubmit}>
//         {/* Title */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Title
//           </label>
//           <input
//             type="text"
//             className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         {/* Description */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Description
//           </label>
//           <ReactQuill
//             value={description}
//             onChange={setDescription}
//             className="mt-2 bg-white"
//             theme="snow"
//           />
//         </div>

//         {/* Ingredients */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Ingredients
//           </label>
//           {ingredients.map((ingredient, index) => (
//             <div key={index} className="flex mb-2">
//               <input
//                 type="text"
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 value={ingredient}
//                 onChange={(e) => handleIngredientChange(index, e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 className="ml-2 px-2 bg-red-500 text-white rounded-lg"
//                 onClick={() => removeIngredient(index)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//             onClick={addIngredient}
//           >
//             Add Ingredient
//           </button>
//         </div>

//         {/* Instructions */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Instructions
//           </label>
//           <ReactQuill
//             value={instructions}
//             onChange={setInstructions}
//             className="mt-2 bg-white"
//             theme="snow"
//           />
//         </div>

//         {/* Cooking Time */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Cooking Time (in minutes)
//           </label>
//           <input
//             type="number"
//             className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
//             value={cookingTime}
//             onChange={(e) => setCookingTime(Number(e.target.value))}
//             required
//           />
//         </div>

//         {/* Tags */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Tags
//           </label>
//           <input
//             type="text"
//             className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
//             placeholder="e.g., Vegan, Gluten-Free"
//             value={tags.join(", ")}
//             onChange={(e) =>
//               setTags(e.target.value.split(",").map((tag) => tag.trim()))
//             }
//           />
//         </div>

//         {/* Image URLs */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Image URLs
//           </label>
//           {imageURLs.map((url, index) => (
//             <div key={index} className="flex mb-2">
//               <input
//                 type="text"
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 placeholder="Enter image URL"
//                 value={url}
//                 onChange={(e) => handleImageURLChange(index, e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 className="ml-2 px-2 bg-red-500 text-white rounded-lg"
//                 onClick={() => removeImageURL(index)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//             onClick={addImageURL}
//           >
//             Add Image URL
//           </button>
//         </div>

//         {/* Premium Recipe */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Is this a premium recipe?
//           </label>
//           <div className="flex space-x-4">
//             <label>
//               <input
//                 type="radio"
//                 name="premium"
//                 value="yes"
//                 checked={isPremium === "yes"}
//                 onChange={() => setIsPremium("yes")}
//               />
//               <span className="ml-2">Yes</span>
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="premium"
//                 value="no"
//                 checked={isPremium === "no"}
//                 onChange={() => setIsPremium("no")}
//               />
//               <span className="ml-2">No</span>
//             </label>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="px-4 py-2 bg-green-500 text-white rounded-lg"
//         >
//           Create Recipe
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateRecipe;







"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Use the new router
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import styles for react-quill
import toast from "react-hot-toast";
import { useAuth } from "@/src/utils/AuthContext"; // Optional, based on your context

// Dynamically import React Quill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateRecipe: React.FC = () => {
  const router = useRouter();
  
  // Optional: If using an Auth context, otherwise retrieve the role from localStorage
  const { user } = useAuth(); // Assuming this contains user info with role

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState("");
  const [cookingTime, setCookingTime] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([""]);
  const [isPremium, setIsPremium] = useState("no");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const recipeData = {
      title,
      description,
      instructions,
      cookingTime,
      ingredients,
      tags,
      images: imageURLs,
      premium: isPremium,
    };

    try {
      const response = await fetch("http://localhost:5000/api/recipes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust based on your token storage
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        toast.success("Recipe created successfully!");

        // Determine the route based on the user's role
        const role = user?.role || localStorage.getItem("role");
        if (role === "admin") {
          router.push("/adminDashboard/myrecipe");
        } else {
          router.push("/userDashboard/myrecipe");
        }
      } else {
        toast.error("Failed to create recipe.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  // Handle adding/removing ingredients
  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => setIngredients([...ingredients, ""]);

  const removeIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  // Handle adding/removing image URLs
  const handleImageURLChange = (index: number, value: string) => {
    const updatedImageURLs = [...imageURLs];
    updatedImageURLs[index] = value;
    setImageURLs(updatedImageURLs);
  };

  const addImageURL = () => setImageURLs([...imageURLs, ""]);

  const removeImageURL = (index: number) => {
    const updatedImageURLs = imageURLs.filter((_, i) => i !== index);
    setImageURLs(updatedImageURLs);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Create Recipe</h1>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            className="mt-2 bg-white"
            theme="snow"
          />
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Ingredients
          </label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={ingredient}
                onChange={(e) =>
                  handleIngredientChange(index, e.target.value)
                }
                required
              />
              <button
                type="button"
                className="ml-2 px-2 bg-red-500 text-white rounded-lg"
                onClick={() => removeIngredient(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={addIngredient}
          >
            Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Instructions
          </label>
          <ReactQuill
            value={instructions}
            onChange={setInstructions}
            className="mt-2 bg-white"
            theme="snow"
          />
        </div>

        {/* Cooking Time */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Cooking Time (in minutes)
          </label>
          <input
            type="number"
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            value={cookingTime}
            onChange={(e) => setCookingTime(Number(e.target.value))}
            required
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            placeholder="e.g., Vegan, Gluten-Free"
            value={tags.join(", ")}
            onChange={(e) =>
              setTags(e.target.value.split(",").map((tag) => tag.trim()))
            }
          />
        </div>

        {/* Image URLs */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image URLs
          </label>
          {imageURLs.map((url, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter image URL"
                value={url}
                onChange={(e) => handleImageURLChange(index, e.target.value)}
                required
              />
              <button
                type="button"
                className="ml-2 px-2 bg-red-500 text-white rounded-lg"
                onClick={() => removeImageURL(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={addImageURL}
          >
            Add Image URL
          </button>
        </div>

        {/* Premium Recipe */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Is this a premium recipe?
          </label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="premium"
                value="yes"
                checked={isPremium === "yes"}
                onChange={() => setIsPremium("yes")}
              />
              <span className="ml-2">Yes</span>
            </label>
            <label>
              <input
                type="radio"
                name="premium"
                value="no"
                checked={isPremium === "no"}
                onChange={() => setIsPremium("no")}
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
