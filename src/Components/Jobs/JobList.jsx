import { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useShips } from "../../contexts/ShipsContext";

const JobList = ({ setEditingJob }) => {
  const { jobs, updateJob } = useJobs();
  const { ships } = useShips();

  const [filters, setFilters] = useState({ shipId: "", status: "", priority: "" });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.shipId ? job.shipId === filters.shipId : true) &&
      (filters.status ? job.status === filters.status : true) &&
      (filters.priority ? job.priority === filters.priority : true)
    );
  });

  const handleStatusUpdate = (job, status) => {
    updateJob({ ...job, status });
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded shadow space-y-4">
      <h2 className="text-xl sm:text-2xl font-semibold">Job List</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          name="shipId"
          value={filters.shipId}
          onChange={handleFilterChange}
          className="border p-2 rounded text-sm sm:text-base"
        >
          <option value="">All Ships</option>
          {ships.map((ship) => (
            <option key={ship.id} value={ship.id}>{ship.name}</option>
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

      {/* Responsive Table */}
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
              <th className="p-2 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="p-2">{ships.find((s) => s.id === job.shipId)?.name}</td>
                <td className="p-2">{job.componentId}</td>
                <td className="p-2">{job.type}</td>
                <td className="p-2">{job.priority}</td>
                <td className="p-2">{job.status}</td>
                <td className="p-2">{job.assignedEngineerId}</td>
                <td className="p-2">{job.scheduledDate}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => setEditingJob(job)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  {job.status !== "Completed" && (
                    <button
                      onClick={() => handleStatusUpdate(job, "Completed")}
                      className="text-green-600 hover:underline"
                    >
                      Mark Done
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList;
