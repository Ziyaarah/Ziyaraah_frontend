import React, { useState, useEffect } from "react";
import { CircleCheckBig } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import { authSchema } from "../schema/authSchema.js";
import { useDispatch, useSelector } from "react-redux";
import { loginAuth } from "../Store/api/authSlice.js";
import { toast } from "react-toastify";

export default function SignIn() {
  
  
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);
   
  
    const dispatch = useDispatch();
  

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(authSchema),
  });




  const handleLogin = async (data, e) => {
  
  console.log("🔍 Form data:", data); // ← ku dar xogta foomka
  e?.preventDefault(); // Prevent default form submission

  try {
    const response = await dispatch(loginAuth(data));
    console.log("🎯 Login response:", response);

    if (response.payload) {
      navigate("/dashboard");
      console.log("✅ Login successful, navigating...");
      toast.success("Login successful!"); // ← ku dar fariin guul leh
    }
  } catch (error) {
    console.error("Login failed:", error); // ← haddii ay dhacdo
  }
};




  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <a href="/" className="text-gray-600 hover:underline text-sm mb-4 inline-block">
          ← Back to home
        </a>

        <div className="flex flex-col items-center mb-6">
          <div className="text-5xl bg-green-700 text-white p-2 rounded-md"> <CircleCheckBig /></div>
          <h2 className="text-xl font-semibold">Ziyaarah</h2>
          <p className="text-gray-500 text-sm">Spiritual Journey Planner</p>
          <p className="text-gray-500 text-sm mt-1">Your sacred journey begins here</p>
        </div>

        <h3 className="text-gray-800 font-bold text-lg mb-4">Welcome Back</h3>
        <p className="text-gray-600 mb-6 text-sm">Sign in to continue your spiritual journey</p>

        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>

           {/* email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700">Email</label>
            <input type="email" 
              id="email"
              name="email"
              className="mt-1 p-2 border border-gray-300 rounded-md outline-none"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700">Password</label>
            <input type="password" 
              id="password"
              name="password"
              className="mt-1 p-2 border border-gray-300 rounded-md outline-none"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            { /* Show password toggle */}
 
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          

          <button
            type="submit"
            className="w-full py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Don’t have an account?
          <a href="/signup" className="text-indigo-600 ml-1 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};


