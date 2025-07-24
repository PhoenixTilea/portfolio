import {Grid} from "@mui/material";
import type {FC} from "react";
import {memo, useCallback} from "react";
import {useDeleteJobMutation, useGetEnumDataQuery, useGetJobsQuery} from "../../state/hooks";
import JobCard from "./JobCard";

type Props = {
  onEdit: (id: number) => void;
};

const JobList: FC<Props> = ({onEdit}) => {
  const {data: jobs} = useGetJobsQuery();
  const {data: enums} = useGetEnumDataQuery();
  const [deleteJob] = useDeleteJobMutation();

  const handleDelete = useCallback((id: number) => {
    if (confirm(`Are you sure you want to delete job with ID ${id}?`)) {
      deleteJob(id);
    }
  }, [deleteJob]);

  if (!jobs || !enums) {
    return null;
  }

  return (
    <Grid container spacing={8}>
      {jobs.map(job => (
        <Grid size={{xs: 12, sm: 6, md: 4}}>
          <JobCard key={job.id}
            job={job}
            onDelete={handleDelete}
            onEdit={onEdit}
            employmentTypes={enums.employmentTypes}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default memo(JobList);