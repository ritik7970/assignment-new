import { useParams, useNavigate } from "react-router-dom";
import { useShips } from "../contexts/ShipsContext";
import { useComponents } from "../contexts/ComponentsContext"; // You'll build this soon
import { useJobs } from "../contexts/JobsContext"; // You'll build this too
import { Link } from "react-router-dom";


const ShipDetailPage = () => {
  const { id } = useParams();
  const { ships } = useShips();
  const { components } = useComponents();
  const { jobs } = useJobs();
  const navigate = useNavigate();

  const ship = ships.find((s) => s.id === id);
  const shipComponents = components.filter((c) => c.shipId === id);
  const shipJobs = jobs.filter((j) => j.shipId === id);

  if (!ship) {
    return (
      <div className="p-6">
        <p className="text-red-600">Ship not found.</p>
        <button
          onClick={() => navigate("/ships")}
          className="mt-2 text-blue-600 underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-bold">{ship.name}</h2>
        <p><strong>IMO:</strong> {ship.imo}</p>
        <p><strong>Flag:</strong> {ship.flag}</p>
        <p><strong>Status:</strong> {ship.status}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold mb-2">Installed Components</h3>
        {shipComponents.length === 0 ? (
          <p className="text-gray-600">No components installed.</p>
        ) : (
          <ul className="list-disc ml-5">
            {shipComponents.map((c) => (
              <li key={c.id}>
                {c.name} (Serial: {c.serialNumber}, Last Maintained:{" "}
                {c.lastMaintenanceDate})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold mb-2">Maintenance History</h3>
        {shipJobs.length === 0 ? (
          <p className="text-gray-600">No maintenance records found.</p>
        ) : (
          <ul className="list-disc ml-5">
            {shipJobs.map((j) => (
              <li key={j.id}>
                {j.type} | Priority: {j.priority} | Status: {j.status} | Scheduled:{" "}
                {j.scheduledDate}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShipDetailPage;
