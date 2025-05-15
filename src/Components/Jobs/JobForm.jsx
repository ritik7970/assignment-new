// src/components/Jobs/JobForm.jsx
import { useState, useEffect } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useComponents } from "../../contexts/ComponentsContext";
import { useShips } from "../../contexts/ShipsContext";
import { useNotifications } from "../../contexts/NotificationContext";
import { toast } from "react-toastify";

const JobForm = ({ editingJob, setEditingJob }) => {
  const { addJob, updateJob } = useJobs();
  const { components } = useComponents();
  const { ships } = useShips();
  const { addNotification } = useNotifications();

  const [form, setForm] = useState({
    shipId: "",
    componentId: "",
    type: "",
    priority: "Medium",
    status: "Open",
    assignedEngineerId: "",
    scheduledDate: "",
  });

  useEffect(() => {
    if (editingJob) {
      setForm(editingJob);
    } else {
      resetForm();
    }
  }, [editingJob]);

  const resetForm = () => {
    setForm({
      shipId: "",
      componentId: "",
      type: "",
      priority: "Medium",
      status: "Open",
      assignedEngineerId: "",
      scheduledDate: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingJob) {
      updateJob(form);
      toast.info("Job status updated to Completed");
    } else {
      addJob(form);
      toast.success("Job created successfully!");
    }
    resetForm();
    setEditingJob(null);
  };

  const filteredComponents = components.filter(
    (c) => c.shipId === form.shipId
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-4">
      <h2 className="text-lg font-semibold">{editingJob ? "Edit Job" : "Create Job"}</h2>

      <div>
        <label className="block mb-1">Ship</label>
        <select
          name="shipId"
          value={form.shipId}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select a ship</option>
          {ships.map((ship) => (
            <option key={ship.id} value={ship.id}>
              {ship.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Component</label>
        <select
          name="componentId"
          value={form.componentId}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select a component</option>
          {filteredComponents.map((comp) => (
            <option key={comp.id} value={comp.name}>
              {comp.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Job Type</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select a job type</option>
          <option value="Inspection">Inspection</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-1">Assigned Engineer ID</label>
        <input
          name="assignedEngineerId"
          value={form.assignedEngineerId}
          onChange={handleChange}
          required
          placeholder="Enter Engineer ID"
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Scheduled Date</label>
        <input
          type="date"
          name="scheduledDate"
          value={form.scheduledDate}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {editingJob ? "Update Job" : "Create Job"}
      </button>
    </form>
  );
};

export default JobForm;
