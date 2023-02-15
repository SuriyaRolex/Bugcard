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

export const boilerplateAPI = createApi({
  reducerPath: "boilerplateAPI",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["boilerplate"],
  endpoints: (builder) => ({
    // Get boilerplate API
    getBoilerplate: builder.query({
      query: (payload) => ({
        url: `https://dev-api.automatly.io/api/v1/boilerplate/get?platform_id=${payload?.platform_id}`,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),

    // boilerplateUpsert API
    boilerplateUpsert: builder.mutation({
      query: (payload) => ({
        url: `boilerplate/upsert`,
        method: "POST",
        body: payload?.payload,
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),

    // boilerplateUpload API
    boilerplateUpload: builder.mutation({
      query: (payload) => ({
        url: `boilerplate/upload`,
        method: "POST",
        body: payload?.payload,
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),
    // boilerplateUpload API
    boilerplateReport: builder.mutation({
      query: (payload) => ({
        url: `get/report?server_id=${payload?.server_id}`,
        method: "POST",
        body: payload?.payload,
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLazyGetBoilerplateQuery,
  useBoilerplateUpsertMutation,
  useBoilerplateUploadMutation,
} = boilerplateAPI;
