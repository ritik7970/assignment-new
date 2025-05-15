import { useState } from "react";
import JobForm from "../Components/Jobs/JobForm";
import JobList from "../Components/Jobs/JobList";

const JobsPage = () => {
  const [editingJob, setEditingJob] = useState(null);

  return (
    <div className="p-6 space-y-6">
      <JobForm editingJob={editingJob} setEditingJob={setEditingJob} />
      <JobList setEditingJob={setEditingJob} />
    </div>
  );
};

export default JobsPage;
