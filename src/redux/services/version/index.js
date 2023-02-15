import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config";
import { LocalStorageKeys } from "../../../utils";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: config.api_url + "version/",
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = localStorage.getItem(LocalStorageKeys.authToken);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const getVersionAPI = createApi({
  reducerPath: "getVersionAPI",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["getVersionAPI"],
  endpoints: (builder) => ({
    // version in createInstance API
    getVersionUpdate: builder.query({
      query: (payload) => ({
        url: `get/all?start=${payload?.start}&length=${payload?.length}&os_master_id=${payload?.os_master_id}`,
        method: "GET",
        headers: { Authorization: "Bearer " + payload?.access_token },
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const { useLazyGetVersionUpdateQuery } = getVersionAPI;
