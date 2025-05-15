import { useAuth } from "../contexts/AuthContext";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  const renderRoleBasedContent = () => {
    switch (user.role) {
      case "Admin":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <ul className="list-disc ml-5">
              <li>Manage Ships</li>
              <li>Manage Components</li>
              <li>Assign Maintenance Jobs</li>
              <li>View KPIs Dashboard</li>
            </ul>
          </div>
        );
      case "Inspector":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Inspector Panel</h2>
            <ul className="list-disc ml-5">
              <li>View Ships</li>
              <li>View Job Calendar</li>
              <li>View Components & Maintenance Logs</li>
            </ul>
          </div>
        );
      case "Engineer":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Engineer Panel</h2>
            <ul className="list-disc ml-5">
              <li>View Assigned Jobs</li>
              <li>Update Job Status</li>
              <li>Maintenance History</li>
            </ul>
          </div>
        );
      default:
        return <p>Unknown role.</p>;
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

      <div className="bg-white p-6 rounded shadow">{renderRoleBasedContent()}</div>
    </div>
  );
};

export default DashboardPage;
