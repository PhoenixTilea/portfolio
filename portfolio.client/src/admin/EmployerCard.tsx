import {Button, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import type {FC} from "react";
import {memo} from "react";
import type {Employer} from "../types/employer";

type Props = {
  employer: Employer;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const EmployerCard: FC<Props> = ({employer, onEdit, onDelete}) => (
  <Card>
    <CardHeader>{employer.name}</CardHeader>
    <CardContent>
      <p>
        <strong>Phone:</strong> {employer.phone ?? "-"}
      </p>
      <p>
        <strong>LinkedIn:</strong> {employer.linkedIn ?? "-"}
      </p>
      <p>
        <strong>Website:</strong> {employer.website ?? "-"}
      </p>
    </CardContent>
    <CardActions>
      <Button
        onClick={() => onEdit(employer.id)}
        aria-label={`Edit ${employer.name}`}
      >
        Edit
      </Button>
      <Button
        onClick={() => onDelete(employer.id)}
        aria-label={`Delete ${employer.name}`}
      >
        Delete
      </Button>
    </CardActions>
  </Card>
);

export default memo(EmployerCard);