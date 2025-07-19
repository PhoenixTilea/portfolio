import {Box} from "@mui/material";
import {useCallback, useMemo, useState} from "react";
import {useGetJobQuery} from "../../state/hooks";
import JobForm from "../forms/JobForm";
import JobList from "./JobList";

const JobTab = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const {data: job} = useGetJobQuery(editId ?? 0, {skip: typeof editId !== "number"});
  const editJob = useMemo(() => (
    editId === job?.id
      ? job
      : undefined
  ), [editId, job]);

  const handleEdit = useCallback((id: number) => {
    if (editId) {
      alert("Save or cancel the current edit first.");
      return;
    }
    setEditId(id);
  }, [editId, setEditId]);

  const handleCancel = useCallback(() => setEditId(null), [setEditId]);

  return (
    <Box component="main">
      <JobList onEdit={handleEdit} />
      <h2>
        {editJob
          ? `Edit ${editJob.jobTitle}`
          : "Add New Job"
        }
      </h2>
      <JobForm job={editJob} onCancel={handleCancel} />
    </Box>
  );
}

export default JobTab;