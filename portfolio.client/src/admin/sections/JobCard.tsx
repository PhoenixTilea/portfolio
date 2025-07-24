import {Button, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import dayJs from "dayjs";
import type {FC} from "react";
import {memo, useMemo} from "react";
import type {Job} from "../../types/job";

type Props = {
  employmentTypes: string[];
  job: Job;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const JobCard: FC<Props> = ({job, onEdit, onDelete, employmentTypes}) => {
  const timespan = useMemo<string>(() => {
    const totalMonths = dayJs(job.startDate).diff(job.endDate ?? new Date(), "month");
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    let parts: string[] = [];
    if (years > 0) {
      parts.push(`${years} year${years > 1 ? "s" : ""}`);
    }
    if (months > 0) {
      parts.push(`${months} month${months > 1 ? "s" : ""}`);
    }
    return parts.join(", ");
  }, [job]);
  const responsibilityList = useMemo<string[]>(() => (
    job.responsibilities.split(/((\r)?\n)+/)
  ), [job]);

  return (
    <Card>
      <CardHeader>
        {job.jobTitle} at {job.employer.name}
      </CardHeader>
      <CardContent>
        <p>
          <strong>Employment Type:</strong> {employmentTypes[job.type]}
        </p>
        <p>
          <strong>Employed For:</strong> {timespan}
          {!job.endDate ? "(Current)" : null}
        </p>
        <h4>Responsibilities</h4>
        <ul>
          {responsibilityList.map(r => <li key={r}>{r}</li>)}
        </ul>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => onEdit(job.id)}
          aria-label={`Edit ${job.jobTitle}`}
        >
          Edit
        </Button>
        <Button
          onClick={() => onDelete(job.id)}
          aria-label={`Delete ${job.jobTitle}`}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default memo(JobCard);