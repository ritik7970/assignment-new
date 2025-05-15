import { useShips } from "../../contexts/ShipsContext";
import { useJobs } from "../../contexts/JobsContext";
import { useComponents } from "../../contexts/ComponentsContext";

const KPIDashboard = () => {
  const { ships } = useShips();
  const { jobs } = useJobs();
  const { components } = useComponents();

  const totalJobs = jobs.length;
  const completedJobs = jobs.filter((job) => job.status === "Completed").length;
  const pendingJobs = totalJobs - completedJobs;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <div className="bg-blue-100 p-4 rounded shadow text-center">
        <h3 className="text-lg font-semibold">Total Ships</h3>
        <p className="text-2xl">{ships.length}</p>
      </div>

      <div className="bg-green-100 p-4 rounded shadow text-center">
        <h3 className="text-lg font-semibold">Total Components</h3>
        <p className="text-2xl">{components.length}</p>
      </div>

      <div className="bg-yellow-100 p-4 rounded shadow text-center">
        <h3 className="text-lg font-semibold">Jobs (Pending / Completed)</h3>
        <p className="text-2xl">
          {pendingJobs} / {completedJobs}
        </p>
      </div>
    </div>
  );
};

export default KPIDashboard;
