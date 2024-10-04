'use client';
import { useAuth } from "@/src/utils/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PrivateRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { isLoggedIn, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("PrivateRoute state: isLoggedIn =", isLoggedIn, ", role =", role);  // Add this log
    if (!isLoggedIn) {
      router.push("/login");
    } else if (role && !allowedRoles.includes(role)) {
      router.push("/unauthorized");
    }
  }, [isLoggedIn, role, router, allowedRoles]);

  if (!isLoggedIn || (role && !allowedRoles.includes(role))) {
    return null; // Optionally, you can return a loading spinner while redirecting
  }

  return <>{children}</>;
};

export default PrivateRoute;
