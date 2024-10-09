// // export default Profile;
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import toast, { Toaster } from 'react-hot-toast';

// const ProfilePage = ({ params }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     bio: '',
//     profilePicture: '',
//   });

//   const userId = params.userId; // Fetch the userId from dynamic params

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/user/${userId}`);
//         const data = await response.json();
//         setUser(data.data);
//         setFormData({
//           name: data.data.name || '',
//           bio: data.data.bio || '',
//           profilePicture: data.data.profilePicture || '',
//         });
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load user profile');
//         setLoading(false);
//       }
//     };

//     if (userId) fetchUserProfile();
//   }, [userId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to update profile');
//       }
//       const updatedUser = await response.json();
//       setUser(updatedUser.data);

//       // Show success toast
//       toast.success('Profile updated successfully!');
//     } catch (err) {
//       setError('Failed to update user profile');
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Hot Toast notification */}
//       <Toaster position="top-right" reverseOrder={false} />

//       <motion.h1
//         className="text-4xl font-bold text-center mb-8"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         Your Profile
//       </motion.h1>

//       <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
//         <motion.div
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
//           <div className="flex items-center space-x-4">
//             <img
//               src={user.profilePicture || 'https://via.placeholder.com/150'}
//               alt={user.name}
//               className="w-20 h-20 rounded-full object-cover"
//             />
//             <div>
//               <p><strong>Name:</strong> {user.name}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//               <p><strong>Role:</strong> {user.role}</p>
//               <p><strong>Bio:</strong> {user.bio || 'N/A'}</p>
//               <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
//             </div>
//           </div>
//         </motion.div>

//         <motion.form
//           onSubmit={handleFormSubmit}
//           className="mt-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h3 className="text-xl font-bold mb-4">Update Profile</h3>

//           <div className="mb-4">
//             <label className="block text-sm font-semibold text-gray-600">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-semibold text-gray-600">Bio</label>
//             <textarea
//               name="bio"
//               value={formData.bio}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//             ></textarea>
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-semibold text-gray-600">Profile Picture (URL)</label>
//             <input
//               type="text"
//               name="profilePicture"
//               value={formData.profilePicture}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               placeholder="Enter a URL to your profile picture"
//             />
//           </div>

//           <motion.button
//             type="submit"
//             className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
//             whileHover={{ scale: 1.05 }}
//           >
//             Update Profile
//           </motion.button>
//         </motion.form>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;





'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import {jwtDecode} from 'jwt-decode';
import { useRouter } from 'next/navigation'; // use 'next/navigation' in Next.js 13

const ProfilePage = ({ params }: { params: { userId: string } }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    profilePicture: '',
  });

  // Remove useRouter as params is already provided to the component
  const userId = params.userId;

  const router = useRouter();

  // Get token and logged-in userId from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Unauthorized access! Please log in.');
      router.push('/login');
      return;
    }

    const decodedToken: any = jwtDecode(token); // Decoding the token to get the userId
    console.log(decodedToken)
    const loggedInUserId = decodedToken.id; // Assuming `_id` is the userId in the token

    // Prevent access to other users' profiles
    if (loggedInUserId !== userId) {
      toast.error('You are not authorized to access this profile!');
      router.push(`/userDashboard/myprofile/${loggedInUserId}`);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${userId}`);
        const data = await response.json();
        setUser(data.data);
        setFormData({
          name: data.data.name || '',
          bio: data.data.bio || '',
          profilePicture: data.data.profilePicture || '',
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load user profile');
        setLoading(false);
      }
    };

    if (userId) fetchUserProfile();
  }, [userId, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      const updatedUser = await response.json();
      setUser(updatedUser.data);

      // Show success toast
      toast.success('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update user profile');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hot Toast notification */}
      <Toaster position="top-right" reverseOrder={false} />

      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Your Profile
      </motion.h1>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
          <div className="flex items-center space-x-4">
            <img
              src={user.profilePicture || 'https://via.placeholder.com/150'}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Bio:</strong> {user.bio || 'N/A'}</p>
              <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleFormSubmit}
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-4">Update Profile</h3>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Profile Picture (URL)</label>
            <input
              type="text"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter a URL to your profile picture"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
            whileHover={{ scale: 1.05 }}
          >
            Update Profile
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default ProfilePage;
