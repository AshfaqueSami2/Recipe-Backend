// 'use client'; // Ensure this is at the top!

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation'; // Using useParams for app directory
// import { useAuth } from '@/src/utils/AuthContext';
// import toast, { Toaster } from 'react-hot-toast'; // Import toast

// export default function UserProfile() {
//   const { userId } = useParams(); // Get userId from params
//   const [userProfile, setUserProfile] = useState(null);
//   const { user: currentUser } = useAuth(); // Get the current logged-in user

//   useEffect(() => {
//     if (userId) {
//       fetchUserProfile();
//     }
//   }, [userId]);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/user/${userId}`);
//       const data = await response.json();
//       setUserProfile(data.data);
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };

//   const handleFollow = async () => {
//     if (!currentUser?._id) {
//       console.error('No currentUserId available');
//       return;
//     }
//     try {
//       const response = await fetch(`http://localhost:5000/api/${userId}/follow`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ currentUserId: currentUser._id }),
//       });

//       if (response.ok) {
//         toast.success('You are now following this user!'); // Show success toast
//         fetchUserProfile(); // Refresh the profile after following
//       } else {
//         toast.error('Failed to follow the user.',data);
//       }
//     } catch (error) {
//       console.error('Error following user:', error.message);
//       toast.error('Error following user.');
//     }
//   };

//   const handleUnfollow = async () => {
//     if (!currentUser?._id) {
//       console.error('No currentUserId available');
//       return;
//     }
//     try {
//       const response = await fetch(`http://localhost:5000/api/${userId}/unfollow`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ currentUserId: currentUser._id }), // Ensure currentUserId is passed
//       });

//       if (response.ok) {
//         toast.success('You have unfollowed this user.'); // Show success toast
//         fetchUserProfile(); // Refresh the profile after unfollowing
//       } else {
//         toast.error('Failed to unfollow the user.');
//       }
//     } catch (error) {
//       console.error('Error unfollowing user:', error);
//       toast.error('Error unfollowing user.');
//     }
//   };

//   if (!userProfile || !currentUser) {
//     return <p className="text-center text-gray-600">Loading...</p>; // Check if both userProfile and currentUser are loaded
//   }

//   // Check if the current user is already following this profile
//   const isFollowing = userProfile?.followers?.includes(currentUser._id); // Add null checks

//   return (
//     <div className="container mx-auto max-w-screen-lg p-6 bg-gray-100 rounded-lg shadow-lg">
//       <Toaster /> {/* Add Toaster for displaying toasts */}

//       <div className="text-center">
//         <h1 className="text-5xl font-extrabold mb-6 text-gray-800">{userProfile.name}</h1>
//         <img
//           src={userProfile.profilePicture || 'https://via.placeholder.com/150'}
//           alt={userProfile.name}
//           className="rounded-full h-40 w-40 mx-auto border-4 border-gray-300 shadow-md mb-4 object-cover"
//         />
//         <p className="text-gray-600 mb-6 max-w-lg mx-auto text-lg">{userProfile.bio || "This user hasn't added a bio yet."}</p>
//       </div>

//       <div className="flex justify-center space-x-12 my-6">
//         <div className="text-center">
//           <span className="text-3xl font-bold text-gray-700">{userProfile.followers?.length || 0}</span>
//           <p className="text-gray-500">Followers</p>
//         </div>
//         <div className="text-center">
//           <span className="text-3xl font-bold text-gray-700">{userProfile.following?.length || 0}</span>
//           <p className="text-gray-500">Following</p>
//         </div>
//       </div>

//       {/* Display both Follow and Unfollow Buttons Side by Side */}
//       <div className="text-center flex justify-center space-x-4">
//         <button
//           onClick={handleFollow}
//           className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
//         >
//           Follow
//         </button>
//         <button
//           onClick={handleUnfollow}
//           className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
//         >
//           Unfollow
//         </button>
//       </div>

//       {/* Additional Styling for hover effects */}
//       <style jsx>{`
//         .hover-profile-pic:hover {
//           border-color: #6366f1;
//         }
//       `}</style>
//     </div>
//   );
// }








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
        const errorData = await response.json();
        toast.error(`Failed to follow the user: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error following user:', error.message);
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
        const errorData = await response.json();
        toast.error(`Failed to unfollow the user: ${errorData.message}`);
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

