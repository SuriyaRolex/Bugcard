import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config";
import { LocalStorageKeys } from "../../../utils";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: config.api_url + "server/",
    prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = localStorage.getItem(LocalStorageKeys.authToken);
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const createInstanceAPI = createApi({
    reducerPath: "createInstanceAPI",
    baseQuery: baseQueryWithRetry,
    tagTypes: ["CreateInstance"],
    endpoints: (builder) => ({

        // Get All CreateInstance API
        getAllCreateInstance: builder.query({
            query: ({ project_id = null, start = 0, length = 10 }) => ({ url: `get/all?project_id=${project_id}&start=${start}&length=${length}`, method: "GET" }),
            transformResponse: (response, meta, arg) => {
                if (response.type === "success") {
                    return { createInstance: response.data, totalCount: response.totalRecords };
                }
                return { createInstance: [], totalCount: 0 };
            },
        }),

        // Get CreateInstance API
        getCreateInstance: builder.query({
            query: (payload) => {
                return ({
                    url: `get?project_id=${payload?.project_id}&server_id=${payload?.server_id}`,
                    method: "GET",
                })
            }
        }),
      
        // Create CreateInstance API
        createCreateInstance: builder.mutation({
            query: (payload) => ({
                url: `add`,
                method: "POST",
                body: payload
            }),
        }),

        // Update CreateInstance API
        updateCreateInstance: builder.mutation({
            query: (payload) => ({
                url: `createInstance/${payload.id}/`,
                method: "PATCH",
                body: payload.body,
            }),
        }),

        // Delete CreateInstance API
        deleteCreateInstance: builder.mutation({
            query: ({ id }) => ({ url: `user/${id}/`, method: "DELETE" }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useCreateCreateInstanceMutation,
    useGetAllCreateInstanceQuery,
    useGetCreateInstanceQuery,
    useDeleteCreateInstanceMutation,
    useUpdateCreateInstanceMutation
} = createInstanceAPI;
