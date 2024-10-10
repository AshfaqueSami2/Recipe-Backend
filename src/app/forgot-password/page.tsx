"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "https://recipebackend-phi.vercel.app/api/auth/request-password-reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Password reset request failed");
      }

      toast.success("Password reset link sent to your email!");
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
        <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold rounded-lg px-4 py-3"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Password Reset Link"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
