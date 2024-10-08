'use client';
import PrivateRoute from '@/src/utils/privateRoute';
import React, { useEffect, useState } from 'react';

// Define the User type for TypeScript
interface User {
  _id: string;
  name: string;
  email: string;
  blocked: boolean;
  role:string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Function to fetch users from the backend
const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch('http://localhost:5000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 401) throw new Error('Unauthorized');

    const data = await response.json();
    if (data.success) {
      // Filter users to only include those with the role "user"
      const filteredUsers = data.data.filter((user: User) => user.role === 'user');
      setUsers(filteredUsers);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

  const blockUser = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/block/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Corrected template literal
        },
      });
      fetchUsers();
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const unblockUser = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/unblock/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Corrected template literal
        },
      });
      fetchUsers();
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Corrected template literal
        },
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <PrivateRoute allowedRoles={['admin']}>
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 p-8">
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User Management</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
          <thead>
  <tr className="bg-gray-200">
    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Role</th> {/* Add Role column */}
    <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
  </tr>
</thead>

<tbody>
  {users.map((user) => (
    <tr key={user._id} className="bg-white border-b hover:bg-gray-100 transition duration-300">
      <td className="px-6 py-4 text-sm font-medium text-gray-800">{user.name}</td>
      <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
      <td className="px-6 py-4 text-sm text-gray-800">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            user.blocked ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
          }`}
        >
          {user.blocked ? 'Blocked' : 'Active'}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-800">{user.role}</td> {/* Display role */}
      <td className="px-6 py-4 text-center">
        {user.blocked ? (
          <button
            onClick={() => unblockUser(user._id)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600 transition duration-300"
          >
            Unblock
          </button>
        ) : (
          <button
            onClick={() => blockUser(user._id)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-600 transition duration-300"
          >
            Block
          </button>
        )}
        <button
          onClick={() => deleteUser(user._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>
    </div>
    </PrivateRoute>
  );
};

export default UsersPage;
