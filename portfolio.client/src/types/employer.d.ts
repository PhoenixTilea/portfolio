export type Employer = {
  id: number;
  linkedIn?: string;
  name: string;
  phone?: string;
  website?: string;
};

export type EmployerFormData = Employer & {
  id?: number;
};
