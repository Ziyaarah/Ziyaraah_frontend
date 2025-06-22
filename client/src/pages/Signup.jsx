import React, { useState } from "react";
import { CircleCheckBig } from 'lucide-react';

const SignUp = () => {
  const [show, setShow] = useState(false);
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
        <form className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                className="w-full bg-gray-100 rounded-md p-2 border border-gray-200 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                className="w-full bg-gray-100 rounded-md p-2 border border-gray-200 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              className="w-full bg-gray-100 rounded-md p-2 border border-gray-200 focus:bg-white focus:outline-none"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type={show ? "text" : "password"}
              className="w-full bg-gray-100 rounded-md p-2 border border-gray-200 focus:bg-white focus:outline-none"
            />
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type={show ? "text" : "password"}
              className="w-full bg-gray-100 rounded-md p-2 border border-gray-200 focus:bg-white focus:outline-none"
            />

            <button
              type="button"
              className="absolute top-9 right-2 text-gray-500"
              onClick={() => setShow((s) => !s)}
            >
              {show ? "🙈" : "👁️"}
            </button>
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
          <a href="/signin" className="text-indigo-600 hover:underline ml-1">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
