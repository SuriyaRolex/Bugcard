import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config";
import { LocalStorageKeys } from "../../../utils";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: config.api_url,
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
 
export const applicationAPI = createApi({
    reducerPath: "applicationAPI",
    baseQuery: baseQueryWithRetry,
    tagTypes: ["application"],
    endpoints: (builder) => ({
        // Get All Application API
        getAllApplications: builder.query({
            query: (payload) => ({
                url: `application/get/all?project_id=${payload?.project_id}&server_id=${payload?.server_id}&start=0&length=200`,
                method: "GET"
            }),
            transformResponse: (response, meta, arg) => {
                return response
            },
        }),
        // Create Application API
        createApplication: builder.mutation({
            query: (payload) => ({
                url: `remote/applications/deploy`,
                method: "POST",
                body: payload?.payload
            }),
            transformResponse: (response, meta, arg) => {
                return response
            },
        }),
        // Current Usage API
        currentUsage: builder.query({
            query: (payload) => ({
                url: `server/usage/get?project_id=${payload?.project_id}&server_id=${payload?.server_id}`,
                method: "GET"
            }),
            transformResponse: (response, meta, arg) => {
                return response
            },
        }),
        // Get Logs API
        getLogs: builder.query({
            query: (payload) => ({
                url: `application/get/logs?log_type=${payload?.log_type}&log_lines=100&applicationId=${payload?.application_id}`,
                method: "GET"
            }),
            transformResponse: (response, meta, arg) => {
                return response
            },
        }),
        // Get Platform API
          getPlatform: builder.query({
            query: (payload) => ({
                url: `platform/get/all?start=0&length=10`,
                method: "GET"
            }),
            transformResponse: (response, meta, arg) => {
                return response
            },
        })
    }),
});
 
// Export hooks for usage in functional components
export const {
    useLazyGetAllApplicationsQuery,
    useCreateApplicationMutation,
    useCurrentUsageQuery,
    useGetLogsQuery,
    useGetPlatformQuery
} = applicationAPI;
