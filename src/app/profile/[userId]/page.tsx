// "use client"; // Enable client-side rendering

// import { useParams } from "next/navigation"; // Use useParams instead of useRouter
// import { useEffect, useState } from "react";
// import axios from "axios";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000"); // Connect to the backend Socket.IO server

// const UserProfilePage = () => {
//   const params = useParams();
//   const userId = params.userId; // Access userId from the URL params

//   // Parse the `user` object from localStorage and extract the currentUserId and role
//   const currentUser = JSON.parse(localStorage.getItem("user") || "{}"); // Default to empty object if not found
//   const currentUserId = currentUser._id; // Extract the _id from the parsed user object
//   const currentUserRole = currentUser.role; // Extract the role from the parsed user object

//   const [userProfile, setUserProfile] = useState(null);
//   const [isFollowing, setIsFollowing] = useState(false); // Track if the current user is following the profile user
//   const [loading, setLoading] = useState(true);
//   const [followersCount, setFollowersCount] = useState(0); // Track followers count

//   useEffect(() => {
//     if (userId) {
//       // Fetch the user profile and their follower count
//       axios
//         .get(`http://localhost:5000/api/user/${userId}`)
//         .then((response) => {
//           const userData = response.data.data;
//           setUserProfile(userData);
//           setFollowersCount(userData.followers.length); // Set the followers count

//           // Check if the current user is already following the profile user and update `isFollowing`
//           const isUserFollowing = userData.followers.includes(currentUserId);
//           setIsFollowing(isUserFollowing); // Correctly set `isFollowing` state

//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching user profile:", error);
//           setLoading(false);
//         });

//       // Listen to socket events for real-time updates
//       socket.on("updateFollowers", (updatedUserId, newFollowersCount) => {
//         if (updatedUserId === userId) {
//           setFollowersCount(newFollowersCount);
//         }
//       });
//     }

//     // Cleanup socket when component unmounts
//     return () => {
//       socket.off("updateFollowers");
//     };
//   }, [userId, currentUserId]); // Ensure the effect is triggered when userId or currentUserId changes

//   const handleFollow = () => {
//     // Only allow users with the "user" role to follow
//     if (currentUserRole !== "user") {
//       alert("Only regular users can follow others!");
//       return;
//     }

//     if (currentUserId === userId) {
//       alert("You can't follow yourself!"); // Prevent self-follow
//       return;
//     }

//     axios
//       .post(`http://localhost:5000/api/${userId}/follow`, {
//         currentUserId: currentUserId, // Send the dynamic currentUserId
//       })
//       .then(() => {
//         setIsFollowing(true); // Change button to "Unfollow"
//         setFollowersCount((prev) => prev + 1); // Optimistically update count
//         socket.emit("follow", { userId, followerId: currentUserId }); // Emit socket event for follow
//       })
//       .catch((error) => console.error("Error following user:", error));
//   };

//   const handleUnfollow = () => {
//     // Only allow users with the "user" role to unfollow
//     if (currentUserRole !== "user") {
//       alert("Only regular users can unfollow others!");
//       return;
//     }

//     if (currentUserId === userId) {
//       alert("You can't unfollow yourself!"); // Prevent self-unfollow
//       return;
//     }

//     axios
//       .post(`http://localhost:5000/api/${userId}/unfollow`, {
//         currentUserId: currentUserId, // Send the dynamic currentUserId
//       })
//       .then(() => {
//         setIsFollowing(false); // Change button to "Follow"
//         setFollowersCount((prev) => prev - 1); // Optimistically update count
//         socket.emit("unfollow", { userId, followerId: currentUserId }); // Emit socket event for unfollow
//       })
//       .catch((error) => console.error("Error unfollowing user:", error));
//   };

//   if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;
//   if (!userProfile)
//     return <p className="text-center text-lg mt-10">No user found.</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-4 mt-10">
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="flex items-center p-6">
//           <img
//             className="w-24 h-24 rounded-full object-cover mr-6"
//             src={userProfile.profilePicture} // Use user's profile picture if available
//             alt="Profile"
//           />
//           <div>
//             <h1 className="text-3xl font-bold mb-2">{userProfile.name}</h1>
//             <p className="text-gray-600 mb-4">Email: {userProfile.email}</p>
//             <p className="text-gray-600">
//               {userProfile.bio || "No bio available."}
//             </p>
//             <p className="text-gray-600">Followers: {followersCount}</p>
//             <p className="text-gray-600">
//               Following: {userProfile.following.length}
//             </p>{" "}
//             {/* Assuming following is an array */}
//           </div>
//         </div>

//         <div className="p-6 bg-gray-50">
//           {isFollowing ? (
//             <button
//               onClick={handleUnfollow}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300"
//             >
//               Unfollow
//             </button>
//           ) : (
//             <button
//               onClick={handleFollow}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
//             >
//               Follow
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfilePage;





'use client'; // Ensure this is at the top!

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Using useParams for app directory
import { useAuth } from '@/src/utils/AuthContext';
import toast, { Toaster } from 'react-hot-toast'; // Import toast

export default function UserProfile() {
  const { userId } = useParams(); // Get userId from params
  const [userProfile, setUserProfile] = useState(null);
  const { user: currentUser } = useAuth(); // Get the current logged-in user

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`);
      const data = await response.json();
      setUserProfile(data.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleFollow = async () => {
    if (!currentUser?._id) {
      console.error('No currentUserId available');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/${userId}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ currentUserId: currentUser._id }),
      });

      if (response.ok) {
        toast.success('You are now following this user!'); // Show success toast
        fetchUserProfile(); // Refresh the profile after following
      } else {
        toast.error('Failed to follow the user.');
      }
    } catch (error) {
      console.error('Error following user:', error);
      toast.error('Error following user.');
    }
  };

  const handleUnfollow = async () => {
    if (!currentUser?._id) {
      console.error('No currentUserId available');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/${userId}/unfollow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ currentUserId: currentUser._id }), // Ensure currentUserId is passed
      });

      if (response.ok) {
        toast.success('You have unfollowed this user.'); // Show success toast
        fetchUserProfile(); // Refresh the profile after unfollowing
      } else {
        toast.error('Failed to unfollow the user.');
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
      toast.error('Error unfollowing user.');
    }
  };

  if (!userProfile || !currentUser) {
    return <p className="text-center text-gray-600">Loading...</p>; // Check if both userProfile and currentUser are loaded
  }

  // Check if the current user is already following this profile
  const isFollowing = userProfile?.followers?.includes(currentUser._id); // Add null checks

  return (
    <div className="container mx-auto max-w-screen-lg p-6 bg-gray-100 rounded-lg shadow-lg">
      <Toaster /> {/* Add Toaster for displaying toasts */}

      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-800">{userProfile.name}</h1>
        <img
          src={userProfile.profilePicture || 'https://via.placeholder.com/150'}
          alt={userProfile.name}
          className="rounded-full h-40 w-40 mx-auto border-4 border-gray-300 shadow-md mb-4 object-cover"
        />
        <p className="text-gray-600 mb-6 max-w-lg mx-auto text-lg">{userProfile.bio || "This user hasn't added a bio yet."}</p>
      </div>

      <div className="flex justify-center space-x-12 my-6">
        <div className="text-center">
          <span className="text-3xl font-bold text-gray-700">{userProfile.followers?.length || 0}</span>
          <p className="text-gray-500">Followers</p>
        </div>
        <div className="text-center">
          <span className="text-3xl font-bold text-gray-700">{userProfile.following?.length || 0}</span>
          <p className="text-gray-500">Following</p>
        </div>
      </div>

      {/* Display both Follow and Unfollow Buttons Side by Side */}
      <div className="text-center flex justify-center space-x-4">
        <button
          onClick={handleFollow}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
        >
          Follow
        </button>
        <button
          onClick={handleUnfollow}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
        >
          Unfollow
        </button>
      </div>

      {/* Additional Styling for hover effects */}
      <style jsx>{`
        .hover-profile-pic:hover {
          border-color: #6366f1;
        }
      `}</style>
    </div>
  );
}
