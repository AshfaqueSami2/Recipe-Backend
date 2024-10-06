// 'use client';
// import { useAuth } from "@/src/utils/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// const PrivateRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
//   const { isLoggedIn, role } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     // Wait until the authentication state has been determined
//     if (isLoggedIn === false) {
//       router.push('/login'); // Redirect to login if the user is not logged in
//     } else if (role && !allowedRoles.includes(role)) {
//       router.push('/unauthorized'); // Redirect to unauthorized if role is not allowed
//     }
//   }, [isLoggedIn, role, router]);

//   // Render the children only if the user is logged in and has the correct role
//   if (!isLoggedIn || (role && !allowedRoles.includes(role))) {
//     return null; // Optionally, display a loading spinner or placeholder here
//   }

//   return <>{children}</>;
// };

// export default PrivateRoute;








'use client'; // Ensure this is marked as client-side

import React, { useEffect } from 'react';
import { useAuth } from '@/src/utils/AuthContext';
import { useRouter } from 'next/navigation';

const PrivateRoute: React.FC<{ children: React.ReactNode, allowedRoles: string[] }> = ({ children, allowedRoles }) => {
  const { isLoggedIn, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else if (role && !allowedRoles.includes(role)) {
      router.push('/unauthorized');
    }
  }, [isLoggedIn, role, router]);

  if (!isLoggedIn || (role && !allowedRoles.includes(role))) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
