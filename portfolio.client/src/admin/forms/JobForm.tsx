import {Alert, Button, TextField} from "@mui/material";
import type {ChangeEvent, FC, FormEvent} from "react";
import {useEffect, useState} from "react";
import {useAddJobMutation, useUpdateJobMutation} from "../../state/hooks";
import type {Job, JobFormData} from "../../types/job";
import {getMsgFromApiError} from "../../utils/errorUtils";
import {isNullOrWhiteSpace} from "../../utils/stringUtils";
import {Errors, validateJobFormData} from "./validators";
import SkillTransferList from "./SkillTransferList";

type Props = {
  job?: Job;
  onCancel: () => void;
};
type Inputs = Omit<JobFormData, "id">;

const JobForm: FC<Props> = ({job, onCancel}) => {
  const [addJob, {isLoading: addIsLoading, error: addError}] = useAddJobMutation();
  const [updateJob, {isLoading: updateIsLoading, error: updateError}] = useUpdateJobMutation();

  const [inputs, setInputs] = useState<Inputs>(toFormData(job));
  const [errors, setErrors] = useState<Errors<JobFormData>>({});
  const [apiError, setApiError] = useState<string | null>();

  useEffect(() => {
    setInputs(toFormData(job));
  }, [job]);

  useEffect(() => {
    const err = addError ?? updateError;
    if (err) {
      setApiError(getMsgFromApiError(err));
    } else {
      setApiError(null);
    }
  }, [addError, updateError]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;
    setInputs(prev => ({
      ...prev,
      [name as keyof Inputs]: value.trim()
    }));
  }

  const handleToggleSkill = (id: number) => {
    setInputs(prev => ({
      ...prev,
      skillsUsed: prev.skillsUsed.includes(id)
        ? prev.skillsUsed.filter(s => s !== id)
        : [...prev.skillsUsed, id]
    }));
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validateJobFormData(inputs);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      return;
    }

    const data = (job
      ? {...inputs, id: job.id}
      : inputs) as JobFormData;

    job
      ? updateJob(data)
      : addJob(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="jobTitle"
        name="jobTitle"
        value={inputs.jobTitle}
        label="Job Title *"
        onChange={handleChange}
        error={errors?.jobTitle ? true : false}
        helperText={errors?.jobTitle ?? ""}
        required
        slotProps={{htmlInput: {minLength: 10}}}
      />

      <h3>Skills Used</h3>
      <SkillTransferList selectedSkills={inputs.skillsUsed} onToggleSkill={handleToggleSkill} />

      {apiError
        ? <Alert severity="error">{apiError}</Alert>
        : null
      }

      <Button
        type="submit"
        loading={addIsLoading || updateIsLoading}
      >
        {!job ? "Add" : "Update"} Job
      </Button>
      {job
        ? <Button type="button" onClick={onCancel}>Cancel</Button>
        : null
      }
    </form>
  );
}

const toFormData = (job?: Job) => ({
  employerId: job?.employer.id ?? 0,
  endDate: job?.endDate,
  jobTitle: job?.jobTitle ?? "",
  responsibilities: job?.responsibilities ?? "",
  skillsUsed: job?.skillsUsed.map(s => s.id) ?? [],
  startDate: job?.startDate ?? new Date(),
  type: job?.type ?? ""
});

const sanitizeFormData = (data: JobFormData): JobFormData => ({
  ...data,
  id: data.id ?? undefined,
  jobTitle: data.jobTitle.trim(),
  responsibilities: data.responsibilities.trim()
});

export default JobForm;