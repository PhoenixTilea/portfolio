import {Alert, Button, TextField} from "@mui/material";
import type {ChangeEvent, FC, FormEvent} from "react";
import {useEffect, useState} from "react";
import {useAddEmployerMutation, useUpdateEmployerMutation} from "../../state/hooks";
import type {Employer, EmployerFormData} from "../../types/employer";
import {getMsgFromApiError} from "../../utils/errorUtils";
import {isNullOrWhiteSpace} from "../../utils/stringUtils";
import {Errors, validateEmployerFormData} from "./validators";

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

    const data = (employer
      ? {...inputs, id: employer.id}
      : inputs) as EmployerFormData;

    employer
      ? updateEmployer(data)
      : addEmployer(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="empName"
        name="name"
        value={inputs.name}
        label="Employer Name *"
        onChange={handleChange}
        error={errors?.name ? true : false}
        helperText={errors?.name ?? ""}
        required
        slotProps={{htmlInput: {minLength: 5}}}
      />
      <TextField
        id="empPhone"
        type="tel"
        name="phone"
        value={inputs.phone}
        label="Employer Phone Number"
        onChange={handleChange}
        error={errors?.phone ? true : false}
        helperText={errors?.phone ?? ""}
      />
      <TextField
        id="empLinkedIn"
        type="url"
        name="linkedIn"
        value={inputs.linkedIn}
        label="Employer LinkedIn"
        onChange={handleChange}
        error={errors?.linkedIn ? true : false}
        helperText={errors?.linkedIn ?? ""}
      />
      <TextField
        id="empWebsite"
        type="url"
        name="website"
        value={inputs.website}
        label="Employer Website"
        onChange={handleChange}
        error={errors?.website ? true : false}
        helperText={errors?.website ?? ""}
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

const sanitizeFormData = (data: EmployerFormData): EmployerFormData => ({
  id: data.id ?? undefined,
  name: data.name.trim(),
  phone: isNullOrWhiteSpace(data.phone) ? undefined : data.phone!.trim(),
  linkedIn: isNullOrWhiteSpace(data.linkedIn) ? undefined : data.linkedIn!.trim(),
  website: isNullOrWhiteSpace(data.website) ? undefined : data.website!.trim()
});

export default EmployerForm;