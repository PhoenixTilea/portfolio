import {Grid} from "@mui/material";
import type {FC} from "react";
import {memo, useCallback} from "react";
import {useDeleteSkillMutation, useGetSkillsQuery} from "../../state/hooks";
import SkillCard from "./SkillCard";

type Props = {
  onEdit: (id: number) => void;
};

const SkillList: FC<Props> = ({onEdit}) => {
  const {data: skills} = useGetSkillsQuery();
  const [deleteSkill] = useDeleteSkillMutation();

  const handleDelete = useCallback((id: number) => {
    if (confirm(`Are you sure you want to delete skill with ID ${id}?`)) {
      deleteSkill(id);
    }
  }, [deleteSkill]);

  if (!skills) {
    return null;
  }

  return (
    <Grid container spacing={8}>
      {skills.map(skill => (
        <Grid size={{xs: 12, sm: 6, md: 4}}>
          <SkillCard key={skill.id}
            skill={skill}
            onDelete={handleDelete}
            onEdit={onEdit}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default memo(SkillList);