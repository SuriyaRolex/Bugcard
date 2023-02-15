import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { config } from "../../../../config";
import { LocalStorageKeys } from "../../../../utils";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: config.api_url + "git/",
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

export const gitTokenAPI = createApi({
    reducerPath: "gitTokenAPI",
    baseQuery: baseQueryWithRetry,
    tagTypes: ["gitToken"],
    endpoints: (builder) => ({
        // Get All User API
        getAllgitToken: builder.query({
            query: (payload) => ({ url: `lab/token`, method: "GET" }),
            transformResponse: (response, meta, arg) => {
                if (response.type === "success") {
                    return { gitToken: response.URL }
                }
                return { gitToken: [] };
            },
        }),

        // Get User API
        getgitToken: builder.query({
            query: (payload) => ({
                url: `${payload.id ? `/${payload.id}/` : "/"}`,
                method: "GET",
            })
        }),

        // Create User API
        creategitToken: builder.mutation({
            query: () => ({
                url: `lab/token`,
                method: "GET",
            }),
        }),

        // Update User API
        updategitToken: builder.mutation({
            query: (payload) => ({
                url: `gitToken/${payload.id}/`,
                method: "PATCH",
                body: payload.body,
            }),
        }),

        // Delete User API
        deletegitToken: builder.mutation({
            query: ({ id }) => ({ url: `user/${id}/`, method: "DELETE" }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useDeletegitTokenMutation,
    useCreategitTokenMutation,
    useGetgitTokenQuery,
    useGetAllgitTokenQuery,
    useUpdategitTokenMutation
} = gitTokenAPI;
