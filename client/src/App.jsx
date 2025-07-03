import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Layout from "./component/Dashboard/Layout";
import TripPlanner from "./pages/TripPlanner";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
<>
<Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn/>} />

      <Route  element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/tripPlanner" element={<TripPlanner />} /> 
      </Route>
    </Routes>
    <ToastContainer/>
</>
    
  );
};

export default App;
