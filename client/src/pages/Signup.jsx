import React, { useState } from "react";
import { CircleCheckBig } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { zodResolver} from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { authSchema } from "../schema/authSchema.js";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Store/api/auth/authSlice.js";
import { toast } from "react-toastify";

 

export default function SignUp() {
  
  const navigate = useNavigate();

  const { user, isLoading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(authSchema),
  });


// handelRegister
  const handleRegister = async (data) => {
    try {
      const response = await dispatch(registerUser(data));
        console.log("Login response:", response); 
      if (response.payload) {
        navigate("/signin");
        toast.success("Registration successful! Please sign in."); 
      }
    }
    catch (error) {
      console.error("Registration failed:", error);
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
         <a href="/" className="text-gray-600 hover:underline text-sm mb-4 inline-block">
          ← Back to home
        </a>
        <div className="flex flex-col items-center mb-6">
          <div className="text-5xl bg-green-700 text-white p-2 rounded-md"> <CircleCheckBig /></div>
            <h2 className="text-xl font-semibold"> Get Started</h2>                                                                                   
          <p className="text-gray-500">Your sacred journey begins here</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>

          {/* name */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700">Name</label>
            <input type="text" 
              id="name"
              name="name"
              className="mt-1 p-2 border border-gray-300 rounded-md outline-none"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

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
            Sign Up
          </button>

        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?
          <button  className="text-indigo-600 hover:underline ml-1" onClick={()=> navigate("/signin")}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
  
}



