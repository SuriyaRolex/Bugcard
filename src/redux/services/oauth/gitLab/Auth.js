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

export const gitLabAPI = createApi({
    reducerPath: "gitLabAPI",
    baseQuery: baseQueryWithRetry,
    tagTypes: ["gitLab"],
    endpoints: (builder) => ({
        // Get All User API
        getAllgitLab: builder.query({
            query: (payload) => ({ url: `lab/authorize`, method: "GET" }),
            transformResponse: (response, meta, arg) => {
                if (response.type === "success") {
                    return { gitLab: response.URL }
                }
                return { gitLab: [] };
            },
        }),

        // Get User API
        getgitLab: builder.query({
            query: (payload) => ({
                url: `${payload.id ? `/${payload.id}/` : "/"}`,
                method: "GET",
            })
        }),

        // Create User API
        creategitLab: builder.mutation({
            query: () => ({
                url: `lab/authorize`,
                method: "GET",
            }),
        }),

        // Update User API
        updategitLab: builder.mutation({
            query: (payload) => ({
                url: `gitLab/${payload.id}/`,
                method: "PATCH",
                body: payload.body,
            }),
        }),

        // Delete User API
        deletegitLab: builder.mutation({
            query: ({ id }) => ({ url: `user/${id}/`, method: "DELETE" }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useCreategitLabMutation,
    useGetAllgitLabQuery,
    useGetgitLabQuery,
    useDeletegitLabMutation,
    useUpdategitLabMutation,
} = gitLabAPI;
