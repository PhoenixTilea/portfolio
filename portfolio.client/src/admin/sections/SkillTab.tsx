import {Box} from "@mui/material";
import {useCallback, useMemo, useState} from "react";
import {useGetSkillQuery} from "../../state/hooks";
import SkillForm from "../forms/SkillForm";
import SkillList from "./SkillList";

const SkillTab = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const {data: skill} = useGetSkillQuery(editId ?? 0, {skip: typeof editId !== "number"});
  const editSkill = useMemo(() => (
    editId === skill?.id
      ? skill
      : undefined
  ), [editId, skill]);

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
      <SkillList onEdit={handleEdit} />
      <h2>
        {editSkill
          ? `Edit ${editSkill.name}`
          : "Add New Skill"
        }
      </h2>
      <SkillForm skill={editSkill} onCancel={handleCancel} />
    </Box>
  );
}

export default SkillTab;