import {useEffect, useState} from "react";
import type {ChangeEvent, FC, FormEvent} from "react";
import type {Employer, EmployerFormData} from "../types/employer";
import {useAddEmployerMutation, useUpdateEmployerMutation} from "../state/hooks";
import {getMsgFromApiError} from "../utils/errorUtils";
import {Alert, Button, TextField} from "@mui/material";

type Props = {
  employer?: Employer;
};
type Errors = Partial<Record<keyof EmployerFormData, string>>;

const EmployerForm: FC<Props> = ({employer}) => {
  const [addEmployer, {isLoading: addIsLoading, error: addError}] = useAddEmployerMutation();
  const [updateEmployer, {isLoading: updateIsLoading, error: updateError}] = useUpdateEmployerMutation();

  const [inputs, setInputs] = useState<Omit<EmployerFormData, "id">>(toFormData(employer));
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState<string | null>();

  useEffect(() => {
    setInputs(toFormData(employer));
  }, [employer]);

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
      [name as keyof EmployerFormData]: value.trim()
    }));
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validateFormData(inputs);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      return;
    }

    const data = employer
      ? {...inputs, id: employer.id}
      : inputs;

    employer
      ? addEmployer(data)
      : updateEmployer(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="empName"
        name="name"
        label="Employer Name"
        onChange={handleChange}
        error={errors?.name ? true : false}
        helperText={errors?.name ?? ""}
      />

      {apiError
        ? <Alert severity="error">{apiError}</Alert>
        : null
      }

      <Button
        type="submit"
        loading={addIsLoading || updateIsLoading}
      >
        {employer ? "Add" : "Update"} Employer
      </Button>
    </form>
  );
}

const toFormData = (employer?: Employer) => ({
  name: employer?.name ?? "",
  phone: employer?.phone ?? "",
  linkedIn: employer?.linkedIn ?? "",
  website: employer?.website ?? ""
});

const validateFormData = (data: Omit<EmployerFormData, "id">): Errors => {
  const errors: Errors = {};
  if (data.name.trim().length < 5) {
    errors.name = "Must be at least 5 characters long.";
  }

  return errors;
};

export default EmployerForm;