import {Alert, Button, MenuItem, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import type {ChangeEvent, FC, FormEvent, MouseEvent as ReactMouseEvent} from "react";
import {useEffect, useState} from "react";
import {useAddSkillMutation, useGetEnumDataQuery, useUpdateSkillMutation} from "../../state/hooks";
import type {Skill, SkillFormData} from "../../types/skill";
import {getMsgFromApiError} from "../../utils/errorUtils";
import {Errors, validateSkillFormData} from "./validators";

type Props = {
  skill?: Skill;
  onCancel: () => void;
};
type Inputs = Omit<SkillFormData, "id">;
const enumFieldNames: (keyof Inputs)[] = ["proficiency", "type"];

const SkillForm: FC<Props> = ({skill, onCancel}) => {
  const {data: enums} = useGetEnumDataQuery();
  const [addSkill, {isLoading: addIsLoading, error: addError}] = useAddSkillMutation();
  const [updateSkill, {isLoading: updateIsLoading, error: updateError}] = useUpdateSkillMutation();

  const [inputs, setInputs] = useState<Inputs>(toFormData(skill));
  const [errors, setErrors] = useState<Errors<SkillFormData>>({});
  const [apiError, setApiError] = useState<string | null>();

  useEffect(() => {
    setInputs(toFormData(skill));
  }, [skill]);

  useEffect(() => {
    const err = addError ?? updateError;
    if (err) {
      setApiError(getMsgFromApiError(err));
    } else {
      setApiError(null);
    }
  }, [addError, updateError]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.currentTarget;

    setInputs(prev => ({
      ...prev,
      [name as keyof Inputs]: value.trim()
    }));
  }

  const handleLearnedChange = (e: ReactMouseEvent<HTMLElement>, values: number[]) =>
    setInputs(prev => ({...prev, learnedBy: values}));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validateSkillFormData(inputs);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      return;
    }

    const data = (skill
      ? {...inputs, id: skill.id}
      : inputs) as SkillFormData;

    skill
      ? updateSkill(data)
      : addSkill(data);
  }

  if (!enums) {
    return null;
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="skName"
        name="name"
        value={inputs.name}
        label="Skill Name *"
        onChange={handleChange}
        error={errors?.name ? true : false}
        helperText={errors?.name ?? ""}
        required
        slotProps={{htmlInput: {minLength: 2}}}
      />
      <TextField
        id="skType"
        name="type"
        label="Skill Type *"
        value={inputs.type}
        onChange={handleChange}
        required
      >
        {enums.skillTypes.map((text, val) => (
          <MenuItem key={val} value={val}>{text}</MenuItem>
        ))}
      </TextField>
      <TextField
        id="skProf"
        name="proficiency"
        label="Skill Proficiency *"
        value={inputs.proficiency}
        onChange={handleChange}
        required
      >
        {enums.proficiencies.map((text, val) => (
          <MenuItem key={val} value={val}>{text}</MenuItem>
        ))}
      </TextField>
      <TextField
        id="skYear"
        name="yearLearned"
        value={inputs.yearLearned ?? ""}
        label="Year Learned"
        error={errors.yearLearned ? true : false}
        helperText={errors.yearLearned ?? ""}
        slotProps={{
          htmlInput: {
            pattern: "2\d{3}"
          }
        }}
      />
      <h4>Learned by:</h4>
      <ToggleButtonGroup
        aria-label="learned by"
        value={inputs.learnedBy}
        onChange={handleLearnedChange}
      >
        {enums.learnTypes.map((text, val) => (
          <ToggleButton key={val} value={val}>
            {text}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {apiError
        ? <Alert severity="error">{apiError}</Alert>
        : null
      }

      <Button
        type="submit"
        loading={addIsLoading || updateIsLoading}
      >
        {!skill ? "Add" : "Update"} Skill
      </Button>
      {skill
        ? <Button type="button" onClick={onCancel}>Cancel</Button>
        : null
      }
    </form>
  );
}

const toFormData = (skill?: Skill) => ({
  name: skill?.name ?? "",
  learnedBy: skill?.learnedBy.slice() ?? [],
  proficiency: skill?.proficiency ?? 0,
  type: skill?.type ?? 0,
  yearLearned: skill?.yearLearned
});

const sanitizeFormData = (data: SkillFormData): SkillFormData => ({
  ...data,
  id: data.id ?? undefined,
  name: data.name.trim(),
});

export default SkillForm;