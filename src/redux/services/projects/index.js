import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config";
import { LocalStorageKeys } from "../../../utils";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: config.api_url + "project/",
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = localStorage.getItem(LocalStorageKeys.authToken);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const projectAPI = createApi({
  reducerPath: "projectAPI",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Project"],
  endpoints: (builder) => ({

    // Get All Projects API
    getAllProjects: builder.query({
      query: ({ start = 0, length = 10 }) => ({ url: `get/all?start=${start}&length=${length}`, method: "GET" }),
      transformResponse: (response, meta, arg) => {
        if (response.type === "success") {
          return { projects: response.data, totalCount: response.totalRecords };
        }
        return { projects: [], totalCount: 0 };
      },
    }),

    // Get Project API
    getProject: builder.query({
      query: (payload) => ({
        url: `get?project_id=${payload.id}`,
        method: "GET",
      })
    }),

    // Create Project API
    createProject: builder.mutation({
      query: (payload) => ({
        url: `add`,
        method: "POST",
        body: payload
      }),
    }),

    // Update Project API
    updateProject: builder.mutation({
      query: (payload) => ({
        url: `project/${payload.id}/`,
        method: "PATCH",
        body: payload.body,
      }),
    }),

    // Delete Project API
    deleteProject: builder.mutation({
      query: ({ id }) => ({ url: `user/${id}/`, method: "DELETE" }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useGetProjectQuery,
  useDeleteProjectMutation,
  useUpdateProjectMutation
} = projectAPI;
