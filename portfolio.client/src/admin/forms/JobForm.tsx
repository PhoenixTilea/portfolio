import {Alert, Button, MenuItem, TextField} from "@mui/material";
import type {ChangeEvent, FC, FormEvent} from "react";
import {useCallback, useEffect, useState} from "react";
import {useAddJobMutation, useGetEmployersQuery, useGetEnumDataQuery, useUpdateJobMutation} from "../../state/hooks";
import type {Job, JobFormData} from "../../types/job";
import {getMsgFromApiError} from "../../utils/errorUtils";
import JobDateRange from "./JobDateRange";
import SkillTransferList from "./SkillTransferList";
import {Errors, validateJobFormData} from "./validators";

type Props = {
  job?: Job;
  onCancel: () => void;
};
type Inputs = Omit<JobFormData, "id">;

const JobForm: FC<Props> = ({job, onCancel}) => {
  const {data: enums} = useGetEnumDataQuery();
  const {data: employers} = useGetEmployersQuery();
  const [addJob, {isLoading: addIsLoading, error: addError}] = useAddJobMutation();
  const [updateJob, {isLoading: updateIsLoading, error: updateError}] = useUpdateJobMutation();

  const [inputs, setInputs] = useState<Inputs>(toFormData(job));
  const [datesValid, setDatesValid] = useState<boolean>(false);
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
    const val = name === "employmentType"
      ? parseInt(value, 10)
      : value;
    setInputs(prev => ({
      ...prev,
      [name as keyof Inputs]: value.trim()
    }));
  }

  const handleDateChange = useCallback((start: Date, end?: Date, valid = false) => {
    setInputs(prev => ({
      ...prev,
      startDate: start,
      endDate: end
    }));
    setDatesValid(valid);
  }, [setInputs, setDatesValid]);

  const handleToggleSkill = useCallback((id: number) => {
    setInputs(prev => ({
      ...prev,
      skillsUsed: prev.skillsUsed.includes(id)
        ? prev.skillsUsed.filter(s => s !== id)
        : [...prev.skillsUsed, id]
    }));
  }, [setInputs]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validateJobFormData(inputs);
    setErrors(errs);
    if (!datesValid || Object.keys(errs).length > 0) {
      return;
    }

    const data = (job
      ? {...inputs, id: job.id}
      : inputs) as JobFormData;

    job
      ? updateJob(data)
      : addJob(data);
  }

  console.log(enums);
  if (!enums || !Array.isArray(employers)) {
    return <h1>Loading</h1>;
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
      <TextField
        id="jobEmp"
        name="employerId"
        value={inputs.employerId}
        onChange={handleChange}
        label="Employer *"
        error={errors.employerId ? true : false}
        helperText={errors.employerId ?? ""}
        select
        required
      >
        <MenuItem value={0} disabled>-- Select --</MenuItem>
        {employers.map(e => (
          <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
        ))}
      </TextField>
      <TextField
        id="jobType"
        name="type"
        value={inputs.type}
        onChange={handleChange}
        label="Employment Type *"
        select
        required
      >
        {enums.employmentTypes.map((name, id) => (
          <MenuItem key={id} value={id}>{name}</MenuItem>
        ))}
      </TextField>
      <h3>Dates Employed</h3>
      <JobDateRange startDate={inputs.startDate} endDate={inputs.endDate} onDateChange={handleDateChange} />
      <TextField
        id="jobResp"
        name="Responsibilities"
        value={inputs.responsibilities}
        onChange={handleChange}
        label="Responsibilities *"
        multiline
        minRows={6}
        error={errors.responsibilities ? true : false}
        helperText={errors.responsibilities ?? ""}
        required
      />
      <h3>Skills Used</h3>
      <SkillTransferList selectedSkills={inputs.skillsUsed} onToggleSkill={handleToggleSkill} />

      {apiError
        ? <Alert severity="error">{apiError}</Alert>
        : null
      }

      <Button
        type="submit"
        disabled={!datesValid}
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
  type: job?.type ?? 0
});

const sanitizeFormData = (data: JobFormData): JobFormData => ({
  ...data,
  id: data.id ?? undefined,
  jobTitle: data.jobTitle.trim(),
  responsibilities: data.responsibilities.trim()
});

export default JobForm;