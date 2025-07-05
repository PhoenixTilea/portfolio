import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";

export const getMsgFromApiError = (error: unknown): string => {
  if (isFetchBaseQueryError(error)) {
    return "error" in error ? error.error : JSON.stringify(error.data);
  } else if (isSerializedError(error)) {
    return error.message;
  }
  return "";
}

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === "object" && error !== null && "status" in error;
}

const isSerializedError = (error: unknown): error is Error => {
  return typeof error === "object" && error !== null && typeof (error as Error).message === "string";
}