import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/DashboardPage"; // stub for now
import { useAuth } from "./contexts/AuthContext";
import ShipsPage from "./Pages/ShipsPage";
import ShipDetailPage from "./Pages/ShipDetailPage";
import ComponentsPage from "./Pages/ComponentsPage.jsx";
import JobsPage from "./Pages/JobsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const { user } = useAuth();

  return (<div>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick />
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={user ? <DashboardPage /> : <Navigate to="/login" />} />
      <Route
        path="/ships"
        element={user ? <ShipsPage /> : <Navigate to="/login" />} />
      <Route
        path="/ships/:id"
        element={user ? <ShipDetailPage /> : <Navigate to="/login" />} />
      <Route path="/components" element={<ComponentsPage />} />
      <Route path="/jobs" element={<JobsPage />} />
    </Routes>
    </div>
  );
}

export default App;
