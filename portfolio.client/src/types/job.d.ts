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
  type: number;
};

export type JobFormData = Omit<Job, "employer" | "skillsUsed"> & {
  id?: number;
  employerId: number;
  skillsUsed: number[];
};
