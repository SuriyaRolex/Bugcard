import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config";
// import { LocalStorageKeys } from "../../../utils";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: config.gitlab_url
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const gitlabIntegrationAPI = createApi({
    reducerPath: "gitlabIntegrationAPI",
    baseQuery: baseQueryWithRetry,
    tagTypes: ["Gitlab"],
    endpoints: (builder) => ({
        // Get All Groups API
        getAllGroups: builder.query({
            query: (payload) => ({
                url: `groups`,
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + payload?.access_token }
            }),
            transformResponse: (response, meta, arg) => {
                return response
            },
        }),
        // Get All GroupsRepo API
        getAllGroupsRepo: builder.query({
            query: (payload) => ({
                url: `groups/${payload?.id}/projects`,
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + payload?.access_token }
            }),
            transformResponse: (response, meta, arg) => {
                return response
            },
        }),
        // Get All GroupsRepoBranch API
        getAllGroupsRepoBranch: builder.query({
            query: (payload) => ({
                url: `projects/${payload?.id}/repository/branches`,
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + payload?.access_token }
            }),
            transformResponse: (response, meta, arg) => {
                return response
            },
        }),
        getAllGitUsers : builder.query({
            query: (payload) => ({
                url: `users/${payload?.id}/projects`,
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + payload?.access_token }
            }),
            transformResponse: (response, meta, arg) => {
                return response
            },
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useLazyGetAllGroupsQuery,
    useLazyGetAllGitUsersQuery,
    useLazyGetAllGroupsRepoQuery,
    useLazyGetAllGroupsRepoBranchQuery
} = gitlabIntegrationAPI;
