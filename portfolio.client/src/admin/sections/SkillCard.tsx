import {Button, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import type {FC} from "react";
import {memo} from "react";
import type {Skill} from "../../types/skill";

type Props = {
  skill: Skill;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  skillTypes: string[];
  learnTypes: string[];
  proficiencies: string[];
};

const SkillCard: FC<Props> = ({skill, onEdit, onDelete, skillTypes, learnTypes, proficiencies}) => (
  <Card>
    <CardHeader
      component="h3"
      title={skill.name}
    />
    <CardContent>
      <p>
        <strong>Type: </strong> {skillTypes[skill.type]}
      </p>
      <p>
        <strong>Proficiency:</strong> {proficiencies[skill.proficiency]}
      </p>
      <p>
        <strong>Learned by:</strong>
        {skill.learnedBy.map(l => learnTypes[l]).join(", ")}
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