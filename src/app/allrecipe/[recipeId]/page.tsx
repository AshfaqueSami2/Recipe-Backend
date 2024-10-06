// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation'; // Correct import for useRouter in the app directory
// import axios from 'axios';
// import Image from 'next/image';

// const RecipeDetails = ({ params }: { params: { recipeId: string } }) => {
//   const router = useRouter(); // Correct useRouter from next/navigation
//   const { recipeId } = params;

//   const [recipe, setRecipe] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       const token = localStorage.getItem('token'); // Check for token

//       if (!token) {
//         // If not logged in, redirect to login page and include redirect URL
//         router.push(`/login?redirect=/allrecipe/${recipeId}`);
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:5000/api/recipes/${recipeId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Attach the token in the headers
//           },
//         });
//         setRecipe(response.data.data); // Assuming your API response wraps data under 'data'
//         setLoading(false);
//       } catch (error: any) {
//         if (error.response && error.response.status === 401) {
//           setError('Authentication failed, please log in again.');
//           router.push(`/login?redirect=/allrecipe/${recipeId}`);
//         } else {
//           setError('Failed to load recipe');
//         }
//         setLoading(false);
//       }
//     };

//     if (recipeId) {
//       fetchRecipe();
//     }
//   }, [recipeId, router]);

//   if (loading) return <p className="text-center text-gray-600">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="max-w-lg mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-3xl font-bold text-center mb-4">{recipe.title}</h1>
//       <div className="flex justify-center mb-4">
//         <Image
//           src={recipe.images[0]}
//           alt={recipe.title}
//           width={400}
//           height={300}
//           className="rounded-lg shadow-md"
//         />
//       </div>

//       {/* Show content based on premium or non-premium user */}
//       {recipe.teaser ? (
//         <div className="text-center">
//           <p className="text-gray-600 mb-4">{recipe.teaser}</p>
//          <button> <p className="text-blue-500 font-semibold">Subscribe to premium to see the full recipe!</p></button>
//         </div>
//       ) : (
//         <div>
//           <p className="text-gray-700 text-lg mb-4">description: {recipe.description}</p>
//           <p className="text-gray-600 mb-4">
//             <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
//           </p>
//           <p className="text-gray-600 mb-4">
//             <strong>Tags:</strong> {recipe.tags.join(', ')}
//           </p>
//           <p className="text-gray-700">instructions: {recipe.instructions}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeDetails;

// "use client"; // Ensure this is set for Next.js client-side components

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import Image from "next/image";
// import io from "socket.io-client";

// const RecipeDetails = ({ params }: { params: { recipeId: string } }) => {
//   const router = useRouter();
//   const { recipeId } = params;

//   const [recipe, setRecipe] = useState<any>(null);
//   const [comments, setComments] = useState<any[]>([]);
//   const [newComment, setNewComment] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [localCommentIds, setLocalCommentIds] = useState<Set<string>>(new Set());

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         router.push(`/login?redirect=/allrecipe/${recipeId}`);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/recipes/${recipeId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setRecipe(response.data.data);
//         setComments(response.data.data.comments); // Load initial comments
//         setLoading(false);
//       } catch (error: any) {
//         if (error.response && error.response.status === 401) {
//           setError("Authentication failed, please log in again.");
//           router.push(`/login?redirect=/allrecipe/${recipeId}`);
//         } else {
//           setError("Failed to load recipe");
//         }
//         setLoading(false);
//       }
//     };

//     if (recipeId) {
//       fetchRecipe();
//     }
//   }, [recipeId, router]);

//   // Setup WebSocket for real-time comments
//   useEffect(() => {
//     const socket = io("http://localhost:5000");

//     socket.on(`recipe-${recipeId}`, (newComment) => {
//       // Avoid adding duplicate comments by checking if this comment has already been optimistically added
//       if (!localCommentIds.has(newComment._id)) {
//         setComments((prevComments) => [...prevComments, newComment]);
//       }
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [recipeId, localCommentIds]);

//   const handleCommentSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("You need to be logged in to comment.");
//       return;
//     }

//     // Optimistically add the comment to the UI before sending the request
//     const tempComment = {
//       _id: `temp-${Date.now()}`, // Use a temporary ID
//       comment: newComment,
//       createdAt: new Date().toISOString(),
//       user: { _id: "temp-user-id", username: "You" }, // Fake user data for now
//     };

//     // Add the temporary comment to the list and track its ID
//     setComments((prevComments) => [...prevComments, tempComment]);
//     setLocalCommentIds((prevIds) => new Set(prevIds).add(tempComment._id));
//     setNewComment("");

//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/recipes/${recipeId}/comment`,
//         { comment: newComment },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         // Replace the temporary comment with the real one by filtering out the temporary one
//         const updatedComments = comments.filter(
//           (c) => c._id !== tempComment._id
//         );
//         const realComment = response.data.data.comments.slice(-1)[0]; // Get the last comment

//         // Update the comments list with the real comment
//         setComments([...updatedComments, realComment]);

//         // Update the local comment IDs set with the new real comment ID
//         setLocalCommentIds((prevIds) => new Set(prevIds).add(realComment._id));
//       } else {
//         throw new Error("Failed to post comment.");
//       }
//     } catch (error: any) {
//       // Remove the optimistically added comment if there's an error
//       setComments((prevComments) =>
//         prevComments.filter((comment) => comment._id !== tempComment._id)
//       );
//       setLocalCommentIds((prevIds) => {
//         const updatedIds = new Set(prevIds);
//         updatedIds.delete(tempComment._id);
//         return updatedIds;
//       });
//       setError("Failed to post comment. Please try again.");
//     }
//   };

//   if (loading) return <p className="text-center text-gray-600">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="max-w-lg mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-3xl font-bold text-center mb-4">{recipe.title}</h1>
//       <div className="flex justify-center mb-4">
//         {recipe.images && recipe.images.length > 0 && (
//           <Image
//             src={recipe.images[0]}
//             alt={recipe.title}
//             width={400}
//             height={300}
//             className="rounded-lg shadow-md"
//           />
//         )}
//       </div>

//       {recipe.teaser ? (
//         <div className="text-center">
//           <p className="text-gray-600 mb-4">{recipe.teaser}</p>
//           <button>
//             <p className="text-blue-500 font-semibold">
//               Subscribe to premium to see the full recipe!
//             </p>
//           </button>
//         </div>
//       ) : (
//         <div>
//           <p className="text-gray-700 text-lg mb-4">
//             <strong>Description:</strong> {recipe.description}
//           </p>
//           <p className="text-gray-600 mb-4">
//             <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
//           </p>
//           <p className="text-gray-600 mb-4">
//             <strong>Tags:</strong> {recipe.tags.join(", ")}
//           </p>
//           <p className="text-gray-700 mb-4">
//             <strong>Instructions:</strong> {recipe.instructions}
//           </p>
//         </div>
//       )}

//       {/* Comments Section */}
//       <div className="comments-section mt-6">
//   <h3 className="text-2xl font-semibold mb-4">Comments</h3>
//   <div className="comments-list mb-4">
//     {Array.isArray(comments) && comments.length > 0 ? (
//       comments.map((comment, index) => (
//         <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
//           <p>{comment.comment}</p>
//           <small>{new Date(comment.createdAt).toLocaleString()}</small>
//         </div>
//       ))
//     ) : (
//       <p className="text-center text-gray-500">
//         No comments yet. Be the first to comment!
//       </p>
//     )}
//   </div>
// </div>

//       {/* New Comment Form */}
//       {!recipe.isPremium && (
//         <form onSubmit={handleCommentSubmit} className="mt-4">
//           <textarea
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="Add a comment..."
//             rows={3}
//           ></textarea>
//           <button
//             type="submit"
//             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Post Comment
//           </button>
//         </form>
//       )}

//       {recipe.isPremium && (
//         <p className="text-center text-gray-500">
//           Comments are available for premium users only.
//         </p>
//       )}
//     </div>
//   );
// };

// export default RecipeDetails;



"use client"; // Ensure this is set for Next.js client-side components

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import io from "socket.io-client";

const RecipeDetails = ({ params }: { params: { recipeId: string } }) => {
  const router = useRouter();
  const { recipeId } = params;

  const [recipe, setRecipe] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editCommentContent, setEditCommentContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = io("http://localhost:5000");

    // Listen for real-time updates to comments
    socket.on(`commentUpdated`, (updatedComment) => {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === updatedComment.commentId ? updatedComment : comment
        )
      );
    });

    socket.on(`commentDeleted`, (deletedCommentId) => {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== deletedCommentId)
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [recipeId]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push(`/login?redirect=/allrecipe/${recipeId}`);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/recipes/${recipeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecipe(response.data.data);
        setComments(response.data.data.comments);
        setLoading(false);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setError("Authentication failed, please log in again.");
          router.push(`/login?redirect=/allrecipe/${recipeId}`);
        } else {
          setError("Failed to load recipe");
        }
        setLoading(false);
      }
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId, router]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to be logged in to comment.");
      return;
    }

    const tempComment = {
      _id: `temp-${Date.now()}`, // Use a temporary ID
      comment: newComment,
      createdAt: new Date().toISOString(),
      user: { _id: "temp-user-id", username: "You" },
    };

    setComments((prevComments) => [...prevComments, tempComment]);
    setNewComment("");

    try {
      const response = await axios.post(
        `http://localhost:5000/api/recipes/${recipeId}/comment`,
        { comment: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const updatedComments = comments.filter(
          (c) => c._id !== tempComment._id
        );
        const realComment = response.data.data.comments.slice(-1)[0];
        setComments([...updatedComments, realComment]);
      } else {
        throw new Error("Failed to post comment.");
      }
    } catch (error: any) {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== tempComment._id)
      );
      setError("Failed to post comment. Please try again.");
    }
  };

  const handleEditComment = (commentId: string, currentContent: string) => {
    setEditCommentId(commentId);
    setEditCommentContent(currentContent);
  };

  const handleUpdateComment = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
        setError("You need to be logged in to update a comment.");
        return;
    }

    try {
        // Optimistically update the comment in the UI
        const updatedComments = comments.map((comment) =>
            comment._id === editCommentId ? { ...comment, comment: editCommentContent } : comment
        );
        setComments(updatedComments);
        setEditCommentId(null);
        setEditCommentContent("");

        // Send the update request to the server
        const response = await axios.put(
            `http://localhost:5000/api/recipes/${recipeId}/comment/${editCommentId}`,
            { comment: editCommentContent },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Check the response status, assuming 200 is success
        if (response.status === 200) {
            // Successful update, do nothing extra as the UI is already updated optimistically
            setError(null); // Clear any previous error
        } else {
            // Handle unexpected status codes
            console.error("Unexpected response status:", response.status);
            setError("Failed to update comment. Please refresh to verify.");
        }
    } catch (error: any) {
        // Log the error details for debugging
        console.error("Error updating comment:", error);

        // Only set the error if there's an actual failure, not a silent issue like a network glitch
        setError("Failed to update comment. Please refresh to verify.");
    }
};


  const handleDeleteComment = async (commentId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to be logged in to delete a comment.");
      return;
    }

    // Optimistically remove the comment from the UI
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/recipes/${recipeId}/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to delete comment.");
      }
    } catch (error: any) {
      setError("Failed to delete comment. Please refresh to verify.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4">{recipe.title}</h1>
      <div className="flex justify-center mb-4">
        {recipe.images && recipe.images.length > 0 && (
          <Image
            src={recipe.images[0]}
            alt={recipe.title}
            width={400}
            height={300}
            className="rounded-lg shadow-md"
          />
        )}
      </div>

      {recipe.teaser ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">{recipe.teaser}</p>
          <button>
            <p className="text-blue-500 font-semibold">
              Subscribe to premium to see the full recipe!
            </p>
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 text-lg mb-4">
            <strong>Description:</strong> {recipe.description}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Tags:</strong> {recipe.tags.join(", ")}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Instructions:</strong> {recipe.instructions}
          </p>
        </div>
      )}

      {/* Comments Section */}
      <div className="comments-section mt-6">
        <h3 className="text-2xl font-semibold mb-4">Comments</h3>
        {recipe.isPremium && (
          <p className="text-center text-gray-500">
            Comments are available for premium users only.
          </p>
        )}
        {!recipe.isPremium && (
          <>
            <div className="comments-list mb-4">
              {Array.isArray(comments) && comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="mb-2 p-2 bg-gray-100 rounded">
                    {editCommentId === comment._id ? (
                      <form onSubmit={handleUpdateComment}>
                        <textarea
                          value={editCommentContent}
                          onChange={(e) => setEditCommentContent(e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                        <button
                          type="submit"
                          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                        >
                          Update
                        </button>
                      </form>
                    ) : (
                      <>
                        <p>{comment.comment}</p>
                        <small>
                          {new Date(comment.createdAt).toLocaleString()} by{" "}
                          {comment.user.username}
                        </small>
                        {/* Edit and Delete Buttons */}
                        <div className="mt-2">
                          <button
                            onClick={() =>
                              handleEditComment(comment._id, comment.comment)
                            }
                            className="text-blue-500 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
            {/* New Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Add a comment..."
                rows={3}
              ></textarea>
              <button
                type="submit"
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Post Comment
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
