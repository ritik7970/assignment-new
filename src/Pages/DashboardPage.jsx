import MaintenanceCalendar from "../Components/Calender/MaintenanceCalendar";
import NotificationCenter from "../Components/Notifications/NotificationCenter";
import { useAuth } from "../contexts/AuthContext";
import KPIDashboard from "../Components/KPIs/KPIDashboard";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

// inside the component function

//import { useJobs } from "../../contexts/JobsContext"
const DashboardPage = () => {
  const [editingJob, setEditingJob] = useState(null);

  const { user, logout } = useAuth();
    const navigate = useNavigate();
  if (!user) {
    return (
      <div className="p-6">
        <p className="text-red-500">User not authenticated. Please login.</p>
      </div>
    );
  }

  const renderRoleBasedContent = () => {
    const commonStyles = "space-y-6";

    switch (user.role) {
      case "Admin":
        return (
          
          <div className={`${commonStyles} space-y-6 p-6 bg-gray-50 min-h-screen`}>
  

  {/* KPI Dashboard Section */}
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-2">KPIs Dashboard</h2>
    <KPIDashboard />
  </div>

  {/* Maintenance Calendar Section */}
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-2">Maintenance Calendar</h2>
    <MaintenanceCalendar role="admin"/>
  </div>
   <div className="bg-white p-4 rounded shadow space-y-4">
    <h2 className="text-2xl font-semibold">Admin Controls</h2>
    <div className="flex flex-wrap gap-4">
      <button
        onClick={() => navigate('/jobs')}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add/Update Job
      </button>
      <button
        onClick={() => navigate('/components')}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add/Update Components
      </button>
      <button
        onClick={() => navigate('/ships')}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add/Update Ships
      </button>
    </div>
  </div>
 

  {/* Jobs List Section */}
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-2">All Maintenance Jobs</h2>
    <JobList2 setEditingJob={setEditingJob} role="admin" />
  </div>
</div>

        );

      case "Inspector":
        return (
          <div className={`${commonStyles} space-y-6 p-6 bg-gray-50 min-h-screen`}>
  {/* KPI Dashboard Section */}
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-4">KPI Dashboard</h2>
    <KPIDashboard />
  </div>

  {/* Maintenance Calendar Section */}
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-4">Maintenance Calendar</h2>
    <MaintenanceCalendar role="inspector"/>
  </div>

  {/* Job List Section */}
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-4">All Maintenance Jobs</h2>
   <JobList2 setEditingJob={setEditingJob} role="inspector" />
  </div>
</div>

        );

      case "Engineer":
        return (
          <div className={`${commonStyles} space-y-6 p-6 bg-gray-50 min-h-screen`}>
  {/* Maintenance Calendar Section */}
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-4">Maintenance Calendar</h2>
    <MaintenanceCalendar role="engineer"/>
  </div>

  {/* Job List Section */}
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-4">All Maintenance Jobs</h2>
    <JobList2 setEditingJob={setEditingJob} role="engineer" />
  </div>
</div>

        );

      default:
        return <p className="text-red-600">Unknown role. Contact admin.</p>;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow space-y-6">
        {renderRoleBasedContent()}
       
        {/* ✅ Global Notification Center */}
      </div>
    </div>
  );
};

export default DashboardPage;
