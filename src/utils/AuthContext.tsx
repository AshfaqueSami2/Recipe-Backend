// 'use client';
// import { useRouter } from 'next/navigation';
// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';


// type AuthContextType = {
//   isLoggedIn: boolean;
//   role: string | null;
//   logIn: (token: string, role: string) => void;
//   logOut: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [role, setRole] = useState<string | null>(null);
//   const router = useRouter();

//   // Check if the user is already logged in from local storage when the app loads
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const savedRole = localStorage.getItem('role');

//     if (token && savedRole) {
//       setIsLoggedIn(true);
//       setRole(savedRole);
//     }
//   }, []);

//   const logIn = (token: string, role: string) => {
//     // Store token and role in local storage
//     localStorage.setItem('token', token);
//     localStorage.setItem('role', role);

//     setIsLoggedIn(true);
//     setRole(role);

//     // Redirect based on the role
//     if (role === 'admin') {
//       router.push('/adminDashboard');
//     } else if (role === 'user') {
//       router.push('/userDashboard');
//     } else {
//       router.push('/login'); // In case of an invalid role
//     }
//   };

//   const logOut = () => {
//     // Clear local storage and reset state
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setIsLoggedIn(false);
//     setRole(null);

//     // Redirect to the login page
//     router.push('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, role, logIn, logOut }}>
//       {children}
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




'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  isLoggedIn: boolean;
  role: string | null;
  logIn: (token: string, role: string) => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');

    if (token && savedRole) {
      console.log("Role found in localStorage during initial load:", savedRole);  // Add this log
      setIsLoggedIn(true);
      setRole(savedRole);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && role) {
      console.log("Redirecting based on role during useEffect:", role);  // Add this log
      if (role === 'admin') {
        router.replace('/adminDashboard');
      } else if (role === 'user') {
        router.replace('/userDashboard');
      }
    }
  }, [isLoggedIn, role, router]);

  const logIn = (token: string, role: string) => {
    console.log("Setting token and role in logIn:", token, role);  // Add this log
    // Store token and role in local storage
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    // Update state
    setIsLoggedIn(true);
    setRole(role);
  };

  const logOut = () => {
    console.log("Logging out and clearing storage.");  // Add this log
    // Clear local storage and reset state
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole(null);

    // Redirect to the login page
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
