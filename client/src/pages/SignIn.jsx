import React, { useState, useEffect } from "react";
import { CircleCheckBig } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from "react-router-dom";
import { SignInSchema } from "../schema/authSchema.js";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Store/api/auth/authSlice.js";
import { toast } from "react-toastify";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  const handleLogin = async (data, e) => {
    e?.preventDefault();
    try {
      const response = await dispatch(loginUser(data));
      if (response.payload) {
        navigate("/dashboard");
        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error("Login error", error.message);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
        <Link to="/" className="text-gray-600 hover:underline text-sm mb-4 inline-block">
          ← Back to home
        </Link>

        <div className="flex flex-col items-center mb-6 text-center">
          <div className="text-4xl sm:text-5xl bg-green-700 text-white p-2 rounded-md">
            <CircleCheckBig />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold mt-2">Ziyaarah</h2>
          <p className="text-gray-500 text-sm">Spiritual Journey Planner</p>
          <p className="text-gray-500 text-sm mt-1">Your sacred journey begins here</p>
        </div>

        <h3 className="text-gray-800 font-bold text-base sm:text-lg mb-3">Welcome Back</h3>
        <p className="text-gray-600 text-sm mb-6">Sign in to continue your spiritual journey</p>

        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border border-gray-300 rounded-md outline-none text-sm"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border border-gray-300 rounded-md outline-none text-sm"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 text-sm sm:text-base bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Don’t have an account?
          <Link to="/signup" className="text-indigo-600 ml-1 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
