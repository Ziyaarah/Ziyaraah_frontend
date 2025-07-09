import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';


export default function PrivateRoute() {

 const { isauthenticated, isUserChecked } = useSelector((state) => state.auth);

  // if (!isUserChecked) {
  //   return <div className="text-center p-4">Loading...</div>;
  // }


  return isauthenticated ? <Outlet /> : <Navigate to="/signin" />;
}
