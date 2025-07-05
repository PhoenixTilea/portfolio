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

export type JobFormData = {
  id?: number;
  employerId: number;
  endDate?: Date;
  jobTitle: string;
  responsibilities: string;
  skillsUsed: number[];
  startDate: Date;
  type: number;
};