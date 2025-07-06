import {Alert, Box, Paper} from "@mui/material";
import {useMemo, useState} from "react";
import EmployerList from "../admin/EmployerList";
import EmployerForm from "../admin/forms/EmployerForm";
import {useGetEmployerQuery} from "../state/hooks";
import type {Employer} from "../types/employer";
import {getMsgFromApiError} from "../utils/errorUtils";

const EmployerDashboard = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const {data: employer, error} = useGetEmployerQuery(editId ?? -1, {skip: editId === null});

  const editEmployer = useMemo<Employer | undefined>(() => (
    editId !== null && employer?.id === editId
      ? employer
      : undefined
  ), [editId, employer]);

  return (
    <Box component={Paper}>
      {error ? <Alert severity="error">{getMsgFromApiError(error)}</Alert> : null}
      <EmployerList onEdit={setEditId} />
      <h2>
        {editEmployer
          ? <>Edit {editEmployer.name}</>
          : <>Add New Employer</>
        }
      </h2>
      <EmployerForm employer={editEmployer} onCancel={() => setEditId(null)} />
    </Box>
  );
}

export default EmployerDashboard;