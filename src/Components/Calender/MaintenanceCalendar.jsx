import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useComponents } from "../../contexts/ComponentsContext";
import { useShips } from "../../contexts/ShipsContext";

const MaintenanceCalendar = ({ role }) => {
  const { jobs } = useJobs();
  const { ships } = useShips();
  const { components } = useComponents();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const getShipName = (id) => ships.find((s) => s.id === id)?.name || "";
  const getComponentName = (id) =>
    components.find((c) => c.id === id)?.name || "";

  // Format selected date to YYYY-MM-DD
  const formattedDate = selectedDate.toLocaleDateString("en-CA"); // returns 'YYYY-MM-DD' in local time


  // Filter jobs by role
  const filteredJobs = jobs.filter((job) => {
    if (job.scheduledDate !== formattedDate) return false;

    if (role === "engineer") return job.type === "Maintenance";
    if (role === "inspector") return job.type === "Inspection";

    return true; // admin or default sees all
  });

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-bold">Maintenance Calendar</h2>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <div>
        <h3 className="mt-4 font-semibold">
          Jobs on {selectedDate.toDateString()}
        </h3>
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500">No jobs scheduled.</p>
        ) : (
          <ul className="list-disc list-inside mt-2">
            {filteredJobs.map((job) => (
              <li key={job.id}>
                <strong>{job.type}</strong> – {getShipName(job.shipId)} /{" "}
                {getComponentName(job.componentId)} (
                <span className="text-sm italic">{job.status}</span>)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MaintenanceCalendar;
