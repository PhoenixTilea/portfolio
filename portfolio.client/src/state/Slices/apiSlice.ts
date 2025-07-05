import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {Employer, EmployerFormData} from "../../types/employer";
import type {Job, JobFormData} from "../../types/job";
import type {Skill, SkillFormData} from "../../types/skill";
import type {Enums} from "../../types/staticData";

const endpoints = {
  data: "data",
  employers: "employers",
  jobs: "jobs",
  skills: "skills"
};
const listId = "LIST";
const tags = {
  data: "DATA",
  emp: "Employers",
  job: "Jobs",
  skill: "Skills"
};

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/"
  }),
  tagTypes: Array.from(Object.values(tags)),
  endpoints: builder => ({
    /* Data */
    getEnumData: builder.query<Enums, void>({
      query: () => `${endpoints.data}/enums`,
      providesTags: [tags.data]
    }),

    /* Employer */
    addEmployer: builder.mutation<null, EmployerFormData>({
      query: body => ({
        url: `${endpoints.employers}/add`,
        method: "POST",
        body
      }),
      invalidatesTags: [{type: tags.emp, id: listId}]
    }),

    deleteEmployer: builder.mutation<null, number>({
      query: id => ({
        url: `${endpoints.employers}/delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (_result, _error, id) => [
        {type: tags.emp, id: listId},
        {type: tags.emp, id}
      ]
    }),

    getEmployers: builder.query<Employer[], void>({
      query: () => `${endpoints.employers}/get`,
      providesTags: result => (
        result
          ? [
            ...result.map(({id}) => ({type: tags.emp, id})),
            {type: tags.emp, id: listId}
          ]
          : [{type: tags.emp, id: listId}]
      )
    }),

    getEmployer: builder.query<Employer, number>({
      query: id => `${endpoints.employers}/get/${id}`,
      providesTags: (_result, _error, id) => [{type: tags.emp, id}]
    }),

    updateEmployer: builder.mutation<null, EmployerFormData>({
      query: body => ({
        url: `${endpoints.employers}/update/${body.id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: (_result, _error, body) => [{type: tags.emp, id: body.id}]
    }),

    /* Jobs */
    addJob: builder.mutation<null, JobFormData>({
      query: body => ({
        url: `${endpoints.jobs}/add`,
        method: "POST",
        body
      }),
      invalidatesTags: [{type: tags.job, id: listId}]
    }),

    deleteJob: builder.mutation<null, number>({
      query: id => ({
        url: `${endpoints.jobs}/delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (_result, _error, id) => [
        {type: tags.job, id: listId},
        {type: tags.job, id}
      ]
    }),

    getJobs: builder.query<Job[], void>({
      query: () => `${endpoints.jobs}/get`,
      providesTags: result => (
        result
          ? [
            ...result.map(({id}) => ({type: tags.job, id})),
            {type: tags.job, id: listId}
          ]
          : [{type: tags.job, id: listId}]
      )
    }),

    getJob: builder.query<Job, number>({
      query: id => `${endpoints.jobs}/get/${id}`,
      providesTags: (_result, _error, id) => [{type: tags.job, id}]
    }),

    updateJob: builder.mutation<null, JobFormData>({
      query: body => ({
        url: `${endpoints.jobs}/update/${body.id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: (_result, _error, body) => [{type: tags.job, id: body.id}]
    }),

    /* Skills */
    addSkill: builder.mutation<null, SkillFormData>({
      query: body => ({
        url: `${endpoints.skills}/add`,
        method: "POST",
        body
      }),
      invalidatesTags: [{type: tags.skill, id: listId}]
    }),

    deleteSkill: builder.mutation<null, number>({
      query: id => ({
        url: `${endpoints.skills}/delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (_result, _error, id) => [
        {type: tags.skill, id: listId},
        {type: tags.skill, id}
      ]
    }),

    getSkills: builder.query<Skill[], void>({
      query: () => `${endpoints.skills}/get`,
      providesTags: result => (
        result
          ? [
            ...result.map(({id}) => ({type: tags.skill, id})),
            {type: tags.skill, id: listId}
          ]
          : [{type: tags.skill, id: listId}]
      )
    }),

    getSkill: builder.query<Skill, number>({
      query: id => `${endpoints.skills}/get/${id}`,
      providesTags: (_result, _error, id) => [{type: tags.skill, id}]
    }),

    updateSkill: builder.mutation<null, SkillFormData>({
      query: body => ({
        url: `${endpoints.skills}/update/${body.id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: (_result, _error, body) => [{type: tags.skill, id: body.id}]
    })
  })
});

export default api;