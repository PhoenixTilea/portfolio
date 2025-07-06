import type {EmployerFormData} from "../types/employer";
import {isNullOrWhiteSpace} from "../utils/stringUtils";

export type Errors<T> = Partial<Record<keyof T, string>>;

export const validateEmployerFormData = (data: EmployerFormData): Errors<EmployerFormData> => {
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

const isValidEmail = (str: string) =>
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(str);

const isValidLinkedIn = (str: string) =>
  !isValidUrl(str) && str.startsWith("https://www.linkedin.com/");

const isValidPhoneNumber = (str: string) =>
  /^\d{10}$/.test(str);

const isValidUrl = (str: string) =>
  /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i.test(str);