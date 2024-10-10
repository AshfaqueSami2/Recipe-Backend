"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Define the props for the dynamic route page component
interface ResetPasswordPageProps {
  params: {
    token: string;
  };
}

// Use the correct props type
const ResetPassword: React.FC<ResetPasswordPageProps> = ({ params }) => {
  const router = useRouter();
  const { token } = params; // Access the token from the params
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://recipebackend-phi.vercel.app/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${text}`);
      }

      toast.success("Password reset successful! Redirecting to login...");
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "An error occurred during password reset.");
        toast.error(error.message);
      } else {
        setError("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col h-screen items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h1 className="text-xl font-bold mb-4">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold rounded-lg px-4 py-3"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
