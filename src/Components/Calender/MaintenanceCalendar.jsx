import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useComponents } from "../../contexts/ComponentsContext";
import { useShips } from "../../contexts/ShipsContext";

const MaintenanceCalendar = () => {
  const { jobs } = useJobs();
  const { ships } = useShips();
  const { components } = useComponents();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const getShipName = (id) => ships.find((s) => s.id === id)?.name || "";
  const getComponentName = (id) =>
    components.find((c) => c.id === id)?.name || "";

  const jobsOnDate = jobs.filter(
    (job) => job.scheduledDate === selectedDate.toISOString().split("T")[0]
  );

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-bold">Maintenance Calendar</h2>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <div>
        <h3 className="mt-4 font-semibold">Jobs on {selectedDate.toDateString()}</h3>
        {jobsOnDate.length === 0 ? (
          <p className="text-gray-500">No jobs scheduled.</p>
        ) : (
          <ul className="list-disc list-inside mt-2">
            {jobsOnDate.map((job) => (
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
