import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "./store";
import api from "./slices/apiSlice";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const {
  useAddEmployerMutation,
  useAddJobMutation,
  useAddSkillMutation,
  useDeleteEmployerMutation,
  useDeleteJobMutation,
  useDeleteSkillMutation,
  useGetEmployerQuery,
  useGetEmployersQuery,
  useGetEnumDataQuery,
  useGetJobQuery,
  useGetJobsQuery,
  useGetSkillQuery,
  useGetSkillsQuery,
  useUpdateEmployerMutation,
  useUpdateJobMutation,
  useUpdateSkillMutation
} = api;