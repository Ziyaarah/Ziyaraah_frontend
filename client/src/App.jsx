import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import Layout from "./component/Dashboard/Layout";
import TripPlanner from "./pages/TripPlanner";
import TripDetails from './component/TripDetails';
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./component/PrivateRoute";
import ResourceLibrary from "./pages/ResourceLibrary";
import RetualTrips from './pages/RetualTrips';




const App = () => {


  return (
<>
<Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn/>} />

        {/* Protected Routes */}

       <Route  element={<PrivateRoute />}>
       <Route  element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/tripPlanner" element={<TripPlanner />} /> 
        <Route path="/trip/:tripId" element={<TripDetails/>} />
        <Route path="/ResourceLibrary" element={<ResourceLibrary/>} />
        <Route path="/RetualTrips" element={<RetualTrips/>} />
      </Route>
       </Route>
       

    </Routes>
    <ToastContainer/>
</>
    
  );
};

export default App;
