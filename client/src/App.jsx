import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/Signup";
import SigIn from "./pages/SignIn";
import Home from "./pages/Home";
import Layout from "./component/Dashboard/Layout";
import TripPlanner from "./pages/TripPlanner";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SigIn />} />

      <Route  element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/trip-planner" element={<TripPlanner />} /> 
      </Route>
    </Routes>
  );
};

export default App;
