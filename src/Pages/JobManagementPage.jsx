import { useState } from "react";
import JobForm from "../Components/Jobs/JobForm";
import JobList from "../Components/Jobs/JobList";

const JobManagementPage = () => {
  const [editingJob, setEditingJob] = useState(null);

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <JobForm editingJob={editingJob} setEditingJob={setEditingJob} />
      <JobList setEditingJob={setEditingJob} />
    </div>
  );
};

export default JobManagementPage;
