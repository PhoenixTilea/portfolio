import type {Employer} from "./employer";
import type {Skill} from "./skill";

export type Job = {
  id: number;
  employer: Employer;
  endDate?: Date;
  jobTitle: string;
  responsibilities: string;
  skillsUsed: Skill[];
  startDate: Date;
  type: string;
};

export type JobFormData = Omit<Job, "employer"> & {
  id?: number;
  employerId: number;
  skillsUsed: number[];
};
