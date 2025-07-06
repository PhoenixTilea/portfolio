import {Alert, Button, TextField} from "@mui/material";
import type {ChangeEvent, FC, FormEvent} from "react";
import {useEffect, useState} from "react";
import {useAddEmployerMutation, useUpdateEmployerMutation} from "../../state/hooks";
import type {Employer, EmployerFormData} from "../../types/employer";
import {getMsgFromApiError} from "../../utils/errorUtils";
import {validateEmployerFormData, Errors} from "./validators";

type Props = {
  employer?: Employer;
  onCancel: () => void;
};
type Inputs = Omit<EmployerFormData, "id">;

const EmployerForm: FC<Props> = ({employer, onCancel}) => {
  const [addEmployer, {isLoading: addIsLoading, error: addError}] = useAddEmployerMutation();
  const [updateEmployer, {isLoading: updateIsLoading, error: updateError}] = useUpdateEmployerMutation();

  const [inputs, setInputs] = useState<Inputs>(toFormData(employer));
  const [errors, setErrors] = useState<Errors<EmployerFormData>>({});
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
      [name as keyof Inputs]: value.trim()
    }));
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validateEmployerFormData(inputs);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      return;
    }

    const data = employer
      ? {...inputs, id: employer.id}
      : inputs;

    employer
      ? updateEmployer(data)
      : addEmployer(data);
  }

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
        {!employer ? "Add" : "Update"} Employer
      </Button>
      {employer
        ? <Button type="button" onClick={onCancel}>Cancel</Button>
        : null
      }
    </form>
  );
}

const toFormData = (employer?: Employer) => ({
  name: employer?.name ?? "",
  phone: employer?.phone ?? "",
  linkedIn: employer?.linkedIn ?? "",
  website: employer?.website ?? ""
});

export default EmployerForm;