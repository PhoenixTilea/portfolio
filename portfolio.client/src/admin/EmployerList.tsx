import {Grid} from "@mui/material";
import type {FC} from "react";
import {memo, useCallback} from "react";
import {useDeleteEmployerMutation, useGetEmployersQuery} from "../state/hooks";
import EmployerCard from "./EmployerCard";

type Props = {
  onEdit: (id: number) => void;
};

const EmployerList: FC<Props> = ({onEdit}) => {
  const {data: employers} = useGetEmployersQuery();
  const [deleteEmployer] = useDeleteEmployerMutation();

  const handleDelete = useCallback((id: number) => {
    if (confirm(`Are you sure you want to delete employer with ID ${id}?`)) {
      deleteEmployer(id);
    }
  }, [deleteEmployer]);

  if (!employers) {
    return null;
  }

  return (
    <Grid container spacing={8}>
      {employers.map(emp => (
        <Grid size={{xs: 12, sm: 6, md: 4}}>
          <EmployerCard key={emp.id}
            employer={emp}
            onDelete={handleDelete}
            onEdit={onEdit}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default memo(EmployerList);