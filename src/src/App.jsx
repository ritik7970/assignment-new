import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/DashboardPage"; // stub for now
import { useAuth } from "./contexts/AuthContext";
import ShipsPage from "./Pages/ShipsPage";
import ShipDetailPage from "./Pages/ShipDetailPage";

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={user ? <DashboardPage /> : <Navigate to="/login" />}
      />
      <Route
      path="/ships"
      element={user ? <ShipsPage /> : <Navigate to="/login" />}
    />
    <Route
  path="/ships/:id"
  element={user ? <ShipDetailPage /> : <Navigate to="/login" />}
/>
    </Routes>
  );
};

export default App;
