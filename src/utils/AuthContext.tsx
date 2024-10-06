// 'use client'; // Ensure this is marked as client-side

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { useRouter } from 'next/navigation';

// type AuthContextType = {
//   isLoggedIn: boolean;
//   role: string | null;
//   profilePicture: string | null;
//   logIn: (token: string, role: string, profilePicture: string) => void;
//   logOut: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [role, setRole] = useState<string | null>(null);
//   const [profilePicture, setProfilePicture] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const savedRole = localStorage.getItem('role');
//     const savedProfilePicture = localStorage.getItem('profilePicture');

//     if (token && savedRole) {
//       setIsLoggedIn(true);
//       setRole(savedRole);
//       setProfilePicture(savedProfilePicture);
//     } else {
//       setIsLoggedIn(false);
//       setRole(null);
//       setProfilePicture(null);
//     }
//     setLoading(false);
//   }, []);

//   const logIn = (token: string, role: string, profilePicture: string) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('role', role);
//     localStorage.setItem('profilePicture', profilePicture);

//     setIsLoggedIn(true);
//     setRole(role);
//     setProfilePicture(profilePicture);

//     if (role === 'admin') {
//       router.push('/aDashboard');
//     } else if (role === 'user') {
//       router.push('/userDashboard');
//     }
//   };

//   const logOut = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     localStorage.removeItem('profilePicture');
//     setIsLoggedIn(false);
//     setRole(null);
//     setProfilePicture(null);

//     router.push('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, role, profilePicture, logIn, logOut }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };




"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

// Define the UserType with all the properties you want to store
type UserType = {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  role:string;
  bio?: string;
  profilePicture: string | null;
};

// Define the AuthContextType
type AuthContextType = {
  isLoggedIn: boolean;
  user: UserType | null;
  logIn: (token: string, user: UserType) => void;
  logOut: () => void;
  fetchUserData: (userId: string) => Promise<void>; // Add fetchUserData here
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap the application
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Fetch user data from localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser)); // Parse user object from localStorage
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
    setLoading(false);
  }, []);



// Function to fetch latest user data from the backend
const fetchUserData = async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/${userId}`);
    const data = await response.json();
    if (response.ok) {
      setUser(data.user); // Update the user in context
      localStorage.setItem("user", JSON.stringify(data.user)); // Update localStorage
    } else {
      console.error("Failed to fetch user data");
    }
  } catch (error) {
    console.error("Error fetching user data", error);
  }
};






  // Login function to set the token and user data in localStorage and state
  const logIn = (token: string, userData: UserType) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage

    setIsLoggedIn(true);
    setUser(userData);

    // Redirect based on role
    if (userData.role === "admin") {
      router.push("/adminDashboard");
    } else {
      router.push("/userDashboard");
    }
  };

  // Logout function to clear localStorage and reset state
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);

    router.push("/login");
  };

  // Provide the AuthContext to children components
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, logIn, logOut,fetchUserData  }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook to access the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
