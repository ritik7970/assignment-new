import { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useShips } from "../../contexts/ShipsContext";

const JobList2 = ({ setEditingJob, role }) => {
  const { jobs, updateJob } = useJobs();
  const { ships } = useShips();

  const [filters, setFilters] = useState({ shipId: "", status: "", priority: "" });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesFilters =
      (filters.shipId ? job.shipId === filters.shipId : true) &&
      (filters.status ? job.status === filters.status : true) &&
      (filters.priority ? job.priority === filters.priority : true);

    if (role === "admin") return matchesFilters;
    if (role === "inspector") return job.type === "Inspection" && matchesFilters;
    if (role === "engineer") return job.type === "Maintenance" && matchesFilters;

    // fallback: no jobs
    return false;
  });

  const handleStatusChange = (job, newStatus) => {
    if (job.status !== newStatus) {
      updateJob({ ...job, status: newStatus });
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded shadow space-y-4">
      <h2 className="text-xl sm:text-2xl font-semibold">Job List</h2>

      {/* Filter controls */}
      <div className="flex flex-wrap gap-4">
        <select
          name="shipId"
          value={filters.shipId}
          onChange={handleFilterChange}
          className="border p-2 rounded text-sm sm:text-base"
        >
          <option value="">All Ships</option>
          {ships.map((ship) => (
            <option key={ship.id} value={ship.id}>
              {ship.name}
            </option>
          ))}
        </select>

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border p-2 rounded text-sm sm:text-base"
        >
          <option value="">All Statuses</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select
          name="priority"
          value={filters.priority}
          onChange={handleFilterChange}
          className="border p-2 rounded text-sm sm:text-base"
        >
          <option value="">All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-left mt-4 text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 whitespace-nowrap">Ship</th>
              <th className="p-2 whitespace-nowrap">Component</th>
              <th className="p-2 whitespace-nowrap">Type</th>
              <th className="p-2 whitespace-nowrap">Priority</th>
              <th className="p-2 whitespace-nowrap">Status</th>
              <th className="p-2 whitespace-nowrap">Engineer</th>
              <th className="p-2 whitespace-nowrap">Scheduled Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="p-2">{ships.find((s) => s.id === job.shipId)?.name}</td>
                <td className="p-2">{job.componentId}</td>
                <td className="p-2">{job.type}</td>
                <td className="p-2">{job.priority}</td>
                <td className="p-2">
                  {role === "engineer" ? (
                    <select
                      value={job.status}
                      onChange={(e) => handleStatusChange(job, e.target.value)}
                      className="border rounded p-1 text-sm sm:text-base"
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  ) : (
                    job.status
                  )}
                </td>
                <td className="p-2">{job.assignedEngineerId}</td>
                <td className="p-2">{job.scheduledDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList2;
