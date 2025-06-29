import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Sigin from "./pages/Sigin"; 
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ProtectedRoute from "./component/auth/ProtectRouter";
import Layout from "./component/Dashboard/Layout";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
     <Navbar/>
      <main className="container mx-auto px-4 py-8">

        <Routes>
        <Route
         path='/'
         element={<Layout/>
          
         
         }
         />
          <Route
            path="/signin"
            element={
              <ProtectedRoute requireAuth={false}>
                <Sigin/>
              </ProtectedRoute>
            }
          />
                  <Route
                      path="/SignUp"
                      element={
                        <ProtectedRoute requireAuth={false}>
                          <SignUp />
                        </ProtectedRoute>
                      }
            />
                      

                      

             </Routes>

      </main>
    </div>
  );
};

export default App;
