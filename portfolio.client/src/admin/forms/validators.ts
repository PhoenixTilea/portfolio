import type {EmployerFormData} from "../../types/employer";
import type {JobFormData} from "../../types/job";
import type {SkillFormData} from "../../types/skill";
import type {Enums} from "../../types/staticData";
import {isNullOrWhiteSpace} from "../../utils/stringUtils";

export type Errors<T> = Partial<Record<keyof T, string>>;

export const validateEmployerFormData = (data: Omit<EmployerFormData, "id">): Errors<EmployerFormData> => {
  const errors: Errors<EmployerFormData> = {};
  if (data.name.trim().length < 5) {
    errors.name = "Must be at least 5 characters long.";
  }
  if (!isNullOrWhiteSpace(data.phone) && !isValidPhoneNumber(data.phone as string)) {
    errors.phone = "Entr a valid 10-digit phone number.";
  }
  if (!isNullOrWhiteSpace(data.linkedIn) && !isValidLinkedIn(data.linkedIn as string)) {
    errors.linkedIn = "Enter a valid LinkedIn profile URL.";
  }
  if (!isNullOrWhiteSpace(data.website) && !isValidUrl(data.website as string)) {
    errors.website = "Website must be a valid URL.";
  }

  return errors;
}

export const validateJobFormData = (job: Omit<JobFormData, "id">): Errors<JobFormData> => {
  const errors: Errors<JobFormData> = {};
  if (job.jobTitle.trim().length < 10) {
    errors.jobTitle = "Job title is required and must be at least 10 characters long.";
  }
  if (job.employerId < 1) {
    errors.employerId = "Employer is required.";
  }
  if (job.responsibilities.trim().length < 10) {
    errors.responsibilities = "Responsibilities are required and must be at least 10 characters long.";
  }

  return errors;
}

export const validateSkillFormData = (skill: Omit<SkillFormData, "id">): Errors<SkillFormData> => {
  const errors: Errors<SkillFormData> = {};
  if (skill.name.length < 2) {
    // If I ever learn C or R for some reason, I will update this logic.
    errors.name = "Skill name must be at least 2 characters long.";
  }
  const currentYear = new Date().getFullYear();
  if (skill.yearLearned && (skill.yearLearned < 2017 || skill.yearLearned > currentYear)) {
    errors.yearLearned = `Year learned must be between 2017 and ${currentYear}.`;
  }

  return errors;
}

const isValidEmail = (str: string) =>
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(str);

const isValidLinkedIn = (str: string) =>
  !isValidUrl(str) && str.startsWith("https://www.linkedin.com/");

const isValidPhoneNumber = (str: string) =>
  /^\d{10}$/.test(str);

const isValidUrl = (str: string) =>
  /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i.test(str);