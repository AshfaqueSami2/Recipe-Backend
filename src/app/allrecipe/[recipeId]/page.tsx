// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation'; // For navigation
// import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
// import { motion } from 'framer-motion';

// // Define the Recipe type
// type Recipe = {
//   _id: string;
//   title: string;
//   description: string;
//   ingredients: string[];
//   instructions: string;
//   images: string[];
//   premium: string; // yes or no
//   message?: string; // Custom message for premium
//   teaser?: string; // Teaser for premium recipes
// };

// type User = {
//   _id: string;
//   name: string;
//   email: string;
//   role: 'admin' | 'user';
//   isPremium: boolean;
// };

// const RecipeDetailsPage = ({ params }: { params: { recipeId: string } }) => {
//   const [recipe, setRecipe] = useState<Recipe | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [user, setUser] = useState<User | null>(null);
//   const [comment, setComment] = useState<string>(''); // To handle comment input
//   const router = useRouter();

//   const { recipeId } = params; // Extract recipeId from params

//   // Extract user info from JWT stored in localStorage
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode<User>(token);
//       setUser(decodedToken);
//     } else {
//       // Redirect to login if no token
//       router.push('/login');
//     }
//   }, [router]);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const response = await fetch(`https://recipebackend-phi.vercel.app/api/recipes/${recipeId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass the token to the backend
//           },
//         });

//         const data = await response.json();
//         if (!response.ok) {
//           throw new Error(data.message || 'Failed to fetch recipe');
//         }

//         setRecipe(data.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load recipe');
//         setLoading(false);
//       }
//     };

//     if (user && recipeId) fetchRecipe();
//   }, [user, recipeId]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   const handleSubscribeClick = () => {
//     // Navigate to a subscription page or display a subscription modal
//     router.push('/subscribe'); // Example of navigating to a subscription page
//   };

//   const handleCommentSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!comment.trim()) {
//       alert('Comment cannot be empty');
//       return;
//     }

//     try {
//       const response = await fetch(`https://recipebackend-phi.vercel.app/api/recipes/${recipeId}/comment`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ comment }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit comment');
//       }

//       const updatedRecipe = await response.json();
//       setRecipe(updatedRecipe.data); // Update recipe with new comment
//       setComment(''); // Reset comment input
//     } catch (err) {
//       alert('Failed to submit comment');
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <motion.h1
//         className="text-4xl font-bold text-center mb-8"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {recipe?.title}
//       </motion.h1>

//       <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
//         <motion.div
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <img
//             src={recipe?.images[0] || 'https://via.placeholder.com/150'}
//             alt={recipe?.title}
//             className="w-full h-48 object-cover mb-4 rounded-lg"
//           />
//           <p className="text-gray-600 mb-4">{recipe?.description}</p>

//           {/* Premium check: If recipe is premium and user is not premium, show teaser */}
//           {recipe?.premium === 'yes' && !user?.isPremium ? (
//             <>
//               <p className="text-red-500 mb-4">{recipe.message}</p>
//               <p>{recipe.teaser}</p>
//               <p className="text-gray-600 italic mb-6">
//                 Subscribe to get full access to this recipe!
//               </p>
//               <button
//                 onClick={handleSubscribeClick}
//                 className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
//               >
//                 Subscribe to get full access
//               </button>
//             </>
//           ) : (
//             <>
//               <h2 className="text-xl font-bold mb-2">Instructions</h2>
//               <p className="text-gray-600">{recipe?.instructions}</p>
//             </>
//           )}

//           <h3 className="text-lg font-bold mt-6 mb-2">Ingredients</h3>
//           <ul className="list-disc list-inside">
//             {recipe?.ingredients && recipe.ingredients.length > 0 ? (
//               recipe.ingredients.map((ingredient, index) => (
//                 <li key={index} className="text-gray-600">{ingredient}</li>
//               ))
//             ) : (
//               <li className="text-gray-600">No ingredients listed.</li>
//             )}
//           </ul>
//         </motion.div>

//         {/* Comments Section */}
//         <div className="mt-8">
//           <h3 className="text-lg font-bold mb-4">Comments</h3>
//           {recipe?.comments && recipe.comments.length > 0 ? (
//             recipe.comments.map((commentObj, index) => (
//               <div key={index} className="border-b pb-2 mb-4">
//                 <p className="text-gray-800"><strong>{commentObj.user.name}</strong></p>
//                 <p className="text-gray-600">{commentObj.comment}</p>
//               </div>
//             ))
//           ) : (
//             <p>No comments yet. Be the first to comment!</p>
//           )}

//           {/* Comment Input - Only for users who are either premium or viewing free recipes */}
//           {user?.role === 'user' && (
//             <>
//               {recipe?.premium === 'no' || (user.isPremium && recipe.premium === 'yes') ? (
//                 <form onSubmit={handleCommentSubmit} className="mt-4">
//                   <textarea
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                     placeholder="Leave a comment"
//                   ></textarea>
//                   <button
//                     type="submit"
//                     className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
//                   >
//                     Submit Comment
//                   </button>
//                 </form>
//               ) : (
//                 <button
//                   onClick={handleSubscribeClick}
//                   className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
//                 >
//                   You need a premium subscription to comment on this recipe
//                 </button>
//               )}
//             </>
//           )}

//           {/* Admin can't comment */}
//           {user?.role === 'admin' && (
//             <p className="text-gray-600 italic mt-4">
//               Admins cannot comment on recipes.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetailsPage;

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation'; // For navigation
// import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
// import { motion } from 'framer-motion';

// // Define the Recipe type
// type Recipe = {
//   _id: string;
//   title: string;
//   description: string;
//   ingredients: string[];
//   instructions: string;
//   images: string[];
//   premium: string; // yes or no
//   message?: string; // Custom message for premium
//   teaser?: string; // Teaser for premium recipes
//   comments: {
//     _id: string;
//     user: { _id: string; name: string };
//     comment: string;
//     updatedAt: string;
//   }[];
// };

// type User = {
//   _id: string;
//   name: string;
//   email: string;
//   role: 'admin' | 'user';
//   isPremium: boolean;
// };

// const RecipeDetailsPage = ({ params }: { params: { recipeId: string } }) => {
//   const [recipe, setRecipe] = useState<Recipe | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [user, setUser] = useState<User | null>(null);
//   const [comment, setComment] = useState<string>(''); // To handle comment input
//   const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // To track which comment is being edited
//   const [editCommentText, setEditCommentText] = useState<string>(''); // To handle editing comment text

//   const router = useRouter();
//   const { recipeId } = params; // Extract recipeId from params

//   // Extract user info from JWT stored in localStorage
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode<User>(token);
//       setUser(decodedToken);
//     } else {
//       router.push('/login');
//     }
//   }, [router]);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const response = await fetch(`https://recipebackend-phi.vercel.app/api/recipes/${recipeId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         const data = await response.json();
//         if (!response.ok) throw new Error(data.message || 'Failed to fetch recipe');

//         setRecipe(data.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load recipe');
//         setLoading(false);
//       }
//     };

//     if (user && recipeId) fetchRecipe();
//   }, [user, recipeId]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   const handleCommentSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!comment.trim()) return alert('Comment cannot be empty');

//     try {
//       const response = await fetch(`https://recipebackend-phi.vercel.app/api/recipes/${recipeId}/comment`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ comment }),
//       });

//       if (!response.ok) throw new Error('Failed to submit comment');
//       const updatedRecipe = await response.json();
//       setRecipe(updatedRecipe.data);
//       setComment('');
//     } catch (err) {
//       alert('Failed to submit comment');
//     }
//   };

//   const handleCommentEdit = async (commentId: string) => {
//     if (!editCommentText.trim()) return alert('Comment cannot be empty');

//     try {
//       const response = await fetch(`https://recipebackend-phi.vercel.app/api/recipes/${recipeId}/comment/${commentId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ comment: editCommentText }),
//       });

//       if (!response.ok) throw new Error('Failed to update comment');
//       const updatedRecipe = await response.json();
//       setRecipe(updatedRecipe.data);
//       setEditingCommentId(null); // Close the edit mode
//     } catch (err) {
//       alert('Failed to update comment');
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <motion.h1
//         className="text-4xl font-bold text-center mb-8"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {recipe?.title}
//       </motion.h1>

//       <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
//         <motion.div
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <img
//             src={recipe?.images[0] || 'https://via.placeholder.com/150'}
//             alt={recipe?.title}
//             className="w-full h-48 object-cover mb-4 rounded-lg"
//           />
//           <p className="text-gray-600 mb-4">{recipe?.description}</p>

//           {/* Premium check: If recipe is premium and user is not premium, show teaser */}
//           {recipe?.premium === 'yes' && !user?.isPremium ? (
//             <>
//               <p className="text-red-500 mb-4">{recipe?.message}</p>
//               <p>{recipe?.teaser}</p>
//               <p className="text-gray-600 italic mb-6">
//                 Subscribe to get full access to this recipe!
//               </p>
//               <button
//                 onClick={() => router.push('/subscribe')}
//                 className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
//               >
//                 Subscribe to get full access
//               </button>
//             </>
//           ) : (
//             <>
//               <h2 className="text-xl font-bold mb-2">Instructions</h2>
//               <p className="text-gray-600">{recipe?.instructions}</p>
//             </>
//           )}

//           <h3 className="text-lg font-bold mt-6 mb-2">Ingredients</h3>
//           <ul className="list-disc list-inside">
//             {recipe?.ingredients && recipe.ingredients.length > 0 ? (
//               recipe.ingredients.map((ingredient, index) => (
//                 <li key={index} className="text-gray-600">{ingredient}</li>
//               ))
//             ) : (
//               <li className="text-gray-600">No ingredients listed.</li>
//             )}
//           </ul>
//         </motion.div>

//         {/* Comments Section */}
//         <div className="mt-8">
//           <h3 className="text-lg font-bold mb-4">Comments</h3>
//           {recipe?.comments && recipe.comments.length > 0 ? (
//             recipe.comments.map((commentObj) => (
//               <div key={commentObj._id} className="border-b pb-2 mb-4">
//                 <p className="text-gray-800"><strong>{commentObj.user.name}</strong></p>

//                 {/* Check if the comment is being edited */}
//                 {editingCommentId === commentObj._id ? (
//                   <>
//                     <textarea
//                       value={editCommentText}
//                       onChange={(e) => setEditCommentText(e.target.value)}
//                       className="w-full p-2 border border-gray-300 rounded-lg"
//                     />
//                     <button
//                       onClick={() => handleCommentEdit(commentObj._id)}
//                       className="mt-2 bg-green-500 text-white py-1 px-3 rounded-lg"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setEditingCommentId(null)} // Cancel edit
//                       className="mt-2 ml-2 bg-red-500 text-white py-1 px-3 rounded-lg"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <p className="text-gray-600">{commentObj.comment}</p>

//                     {/* Only show edit button for user's own comments and check for isPremium */}
//                     {user?.role === 'user' && user?._id === commentObj.user._id && (
//                       (recipe?.premium === 'no' || user?.isPremium) && (
//                         <button
//                           onClick={() => {
//                             setEditingCommentId(commentObj._id);
//                             setEditCommentText(commentObj.comment); // Set current comment text for editing
//                           }}
//                           className="text-blue-500 mt-2"
//                         >
//                           Edit
//                         </button>
//                       )
//                     )}
//                   </>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p>No comments yet. Be the first to comment!</p>
//           )}

//           {/* Comment Form - Only for non-admin users */}
//           {user?.role === 'user' && (
//             <>
//               {/* Non-premium users cannot comment on premium recipes */}
//               {recipe?.premium === 'no' || user?.isPremium ? (
//                 <form onSubmit={handleCommentSubmit} className="mt-4">
//                   <textarea
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                     placeholder="Leave a comment"
//                   />
//                   <button
//                     type="submit"
//                     className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
//                   >
//                     Submit Comment
//                   </button>
//                 </form>
//               ) : (
//                 <p className="text-red-500 italic">You need a premium subscription to comment on this recipe.</p>
//               )}
//             </>
//           )}

//           {/* Admin can't comment */}
//           {user?.role === 'admin' && (
//             <p className="text-gray-600 italic mt-4">
//               Admins cannot comment on recipes.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetailsPage;

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import { motion } from "framer-motion";

// Define the Recipe type
type Recipe = {
  _id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  images: string[];
  premium: string; // yes or no
  message?: string; // Custom message for premium
  teaser?: string; // Teaser for premium recipes
  comments: {
    _id: string;
    user: { _id: string; name: string };
    comment: string;
    updatedAt: string;
  }[];
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  isPremium: boolean;
};

const RecipeDetailsPage = ({ params }: { params: { recipeId: string } }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [comment, setComment] = useState<string>(""); // To handle comment input
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // To track which comment is being edited
  const [editCommentText, setEditCommentText] = useState<string>(""); // To handle editing comment text

  const router = useRouter();
  const { recipeId } = params; // Extract recipeId from params

  // Extract user info from JWT stored in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<User>(token);
      setUser(decodedToken);
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://recipebackend-phi.vercel.app/api/recipes/${recipeId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Failed to fetch recipe");

        setRecipe(data.data);
        setLoading(false);
      } catch {
        setError("Failed to load recipe");
        setLoading(false);
      }
    };

    if (user && recipeId) fetchRecipe();
  }, [user, recipeId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return alert("Comment cannot be empty");

    try {
      const response = await fetch(
        `https://recipebackend-phi.vercel.app/api/recipes/${recipeId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ comment }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit comment");
      const updatedRecipe = await response.json();
      setRecipe(updatedRecipe.data);
      setComment("");
    } catch  {
      alert("Failed to submit comment");
    }
  };

  const handleCommentEdit = async (commentId: string) => {
    if (!editCommentText.trim()) return alert("Comment cannot be empty");

    try {
      const response = await fetch(
        `https://recipebackend-phi.vercel.app/api/recipes/${recipeId}/comment/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ comment: editCommentText }),
        }
      );

      if (!response.ok) throw new Error("Failed to update comment");
      const updatedRecipe = await response.json();
      setRecipe(updatedRecipe.data);
      setEditingCommentId(null); // Close the edit mode
    } catch {
      alert("Failed to update comment");
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    try {
      const response = await fetch(
        `https://recipebackend-phi.vercel.app/api/recipes/${recipeId}/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete comment");
      const updatedRecipe = await response.json();
      setRecipe(updatedRecipe.data);
    } catch  {
      alert("Failed to delete comment");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {recipe?.title}
      </motion.h1>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={recipe?.images[0] || "https://via.placeholder.com/150"}
            alt={recipe?.title}
            className="w-full h-48 object-cover mb-4 rounded-lg"
          />
          <p className="text-gray-600 mb-4">{recipe?.description}</p>

          {/* Premium check: If recipe is premium and user is not premium, show teaser */}
          {recipe?.premium === "yes" && !user?.isPremium ? (
            <>
              <p className="text-red-500 mb-4">{recipe?.message}</p>
              <p>{recipe?.teaser}</p>
              <p className="text-gray-600 italic mb-6">
                Subscribe to get full access to this recipe!
              </p>
              <button
                onClick={() => router.push("/subscribe")}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Subscribe to get full access
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-2">Instructions</h2>
              <p className="text-gray-600">{recipe?.instructions}</p>
            </>
          )}

          <h3 className="text-lg font-bold mt-6 mb-2">Ingredients</h3>
          <ul className="list-disc list-inside">
            {recipe?.ingredients && recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-600">
                  {ingredient}
                </li>
              ))
            ) : (
              <li className="text-gray-600">No ingredients listed.</li>
            )}
          </ul>
        </motion.div>

        {/* Comments Section */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Comments</h3>
          {recipe?.comments && recipe.comments.length > 0 ? (
            recipe.comments.map((commentObj) => (
              <div key={commentObj._id} className="border-b pb-2 mb-4">
                <p className="text-gray-800">
                  <strong>{commentObj.user.name}</strong>
                </p>

                {/* Check if the comment is being edited */}
                {editingCommentId === commentObj._id ? (
                  <>
                    <textarea
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={() => handleCommentEdit(commentObj._id)}
                      className="mt-2 bg-green-500 text-white py-1 px-3 rounded-lg"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)} // Cancel edit
                      className="mt-2 ml-2 bg-red-500 text-white py-1 px-3 rounded-lg"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600">{commentObj.comment}</p>

                    {/* Only show edit/delete buttons for user's own comments or admin */}
                    {user?.role === "admin" ||
                    user?._id === commentObj.user._id ? (
                      <div className="flex items-center space-x-4">
                        {(recipe?.premium === "no" || user?.isPremium) && (
                          <button
                            onClick={() => {
                              setEditingCommentId(commentObj._id);
                              setEditCommentText(commentObj.comment); // Set current comment text for editing
                            }}
                            className="text-blue-500 mt-2"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => handleCommentDelete(commentObj._id)}
                          className="text-red-500 mt-2"
                        >
                          Delete
                        </button>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}

          {/* Comment Form - Only for non-admin users */}
          {user?.role === "user" && (
            <>
              {/* Non-premium users cannot comment on premium recipes */}
              {recipe?.premium === "no" || user?.isPremium ? (
                <form onSubmit={handleCommentSubmit} className="mt-4">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Leave a comment"
                  />
                  <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                  >
                    Submit Comment
                  </button>
                </form>
              ) : (
                <p className="text-red-500 italic">
                  You need a premium subscription to comment on this recipe.
                </p>
              )}
            </>
          )}

          {/* Admin can't comment */}
          {user?.role === "admin" && (
            <p className="text-gray-600 italic mt-4">
              Admins cannot comment on recipes.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
