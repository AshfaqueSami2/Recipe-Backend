'use client';
import PrivateRoute from '@/src/utils/privateRoute';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Define the Admin type for TypeScript
interface Admin {
  _id: string;
  name: string;
  email: string;
  blocked: boolean;
  role: string;
}

const AdminsPage: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);

  // Function to fetch admins from the backend
  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch('http://localhost:5000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Authorization header with Bearer token
        },
      });

      if (response.status === 401) throw new Error('Unauthorized');

      const data = await response.json();
      if (data.success) {
        // Filter users to only include those with the role "admin"
        const filteredAdmins = data.data.filter((user: Admin) => user.role === 'admin');
        setAdmins(filteredAdmins);
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast.error('Error fetching admins.');
    }
  };

  const blockAdmin = async (adminId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/block/${adminId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Admin blocked successfully!');
        // Update the local state directly without re-fetching all admins
        setAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin._id === adminId ? { ...admin, blocked: true } : admin
          )
        );
      } else {
        throw new Error('Error blocking admin');
      }
    } catch (error) {
      console.error('Error blocking admin:', error);
      toast.error('Error blocking admin.');
    }
  };

  const unblockAdmin = async (adminId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/unblock/${adminId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Admin unblocked successfully!');
        // Update the local state directly without re-fetching all admins
        setAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin._id === adminId ? { ...admin, blocked: false } : admin
          )
        );
      } else {
        throw new Error('Error unblocking admin');
      }
    } catch (error) {
      console.error('Error unblocking admin:', error);
      toast.error('Error unblocking admin.');
    }
  };

  const deleteAdmin = async (adminId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/delete/${adminId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Admin deleted successfully!');
        // Update the local state directly without re-fetching all admins
        setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin._id !== adminId));
      } else {
        throw new Error('Error deleting admin');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast.error('Error deleting admin.');
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <PrivateRoute allowedRoles={['admin']}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 p-8">
        <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Management</h1>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>

              <tbody>
                {admins.map((admin) => (
                  <tr key={admin._id} className="bg-white border-b hover:bg-gray-100 transition duration-300">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{admin.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{admin.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          admin.blocked ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                        }`}
                      >
                        {admin.blocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">{admin.role}</td>
                    <td className="px-6 py-4 text-center">
                      {admin.blocked ? (
                        <button
                          onClick={() => unblockAdmin(admin._id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600 transition duration-300"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={() => blockAdmin(admin._id)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-600 transition duration-300"
                        >
                          Block
                        </button>
                      )}
                      <button
                        onClick={() => deleteAdmin(admin._id)}
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

export default AdminsPage;
