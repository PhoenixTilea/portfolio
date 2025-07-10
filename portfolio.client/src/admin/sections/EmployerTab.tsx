import EmployerList from "./EmployerList";
import EmployerForm from "../forms/EmployerForm";
import {Box} from "@mui/material";
import {useGetEmployerQuery} from "../../state/hooks";
import {useCallback, useMemo, useState} from "react";

const EmployerTab = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const {data: employer} = useGetEmployerQuery(editId ?? 0, {skip: typeof editId !== "number"});
  const editEmployer = useMemo(() => (
    editId === employer?.id
      ? employer
      : undefined
  ), [editId, employer]);

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
      <EmployerList onEdit={handleEdit} />
      <h2>
        {editEmployer
          ? `Edit ${editEmployer.name}`
          : "Add New Employer"
        }
      </h2>
      <EmployerForm employer={editEmployer} onCancel={handleCancel} />
    </Box>
  );
}

export default EmployerTab;