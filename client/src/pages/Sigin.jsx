import React, { useState } from "react";
import { CircleCheckBig } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SiginSchema } from "../schema/authSchema";

   const Sigin = () => {
  const  dispatch =  useDispatch();
  const navigate = useNavigate();
  const {status,error} = useselector((state)=>state.auth)
  const [showPass, setShowPass] = useState(false);
  {
    const {
    SignUp ,
    handleSubmit,
     formState:{errors},
  } =useForm({
  resolver: zodResolver(SiginSchema),
 });

  const onSigin = async (date) => {
    try{
      await dispatch(Sigin(date )).unwrap();
      navigate("/");
    } catch(error){
      console.log("failed to Sigin",error);
    }
  }

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

        <form className="space-y-4">
          <div>
            <label className="text-gray-700 text-sm mb-1 block">Email Address</label>
            <input
              type="email"
              placeholder="amina@gmail.com"
              className="w-full p-2 border border-gray-200 rounded-md bg-gray-100 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="relative">
            <label className="text-gray-700 text-sm mb-1 block">Password</label>
            <input
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              className="w-full p-2 border border-gray-200 rounded-md bg-gray-100 focus:bg-white focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-gray-500"
              onClick={() => setShowPass((s) => !s)}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
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
}
export default Sigin;
