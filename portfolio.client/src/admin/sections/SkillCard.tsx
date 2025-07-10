import {Button, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import type {FC} from "react";
import {memo} from "react";
import type {Skill} from "../../types/skill";

type Props = {
  skill: Skill;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const SkillCard: FC<Props> = ({skill, onEdit, onDelete}) => (
  <Card>
    <CardHeader>{skill.name}</CardHeader>
    <CardContent>
      <p>
        <strong>Type: </strong> {skill.type}
      </p>
      <p>
        <strong>Proficiency:</strong>  {skill.proficiency}
      </p>
      <p>
        <strong>Learned by:</strong> {skill.learnedBy.join(", ")}
      </p>
      <p>
        <strong>Year Learned:</strong> {skill.yearLearned ?? "-"}
      </p>
    </CardContent>
    <CardActions>
      <Button
        onClick={() => onEdit(skill.id)}
        aria-label={`Edit ${skill.name}`}
      >
        Edit
      </Button>
      <Button
        onClick={() => onDelete(skill.id)}
        aria-label={`Delete ${skill.name}`}
      >
        Delete
      </Button>
    </CardActions>
  </Card>
);

export default memo(SkillCard);