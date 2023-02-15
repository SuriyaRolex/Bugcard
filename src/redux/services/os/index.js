import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config";
import { LocalStorageKeys } from "../../../utils";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: config.api_url + "os/",
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

export const getOsAPI = createApi({
  reducerPath: "getOsAPI",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Os"],
  endpoints: (builder) => ({

    getOsVersion: builder.query({
      query: ({ start = 0, length = 10 }) => ({
        url: `get/all?start=${start}&length=${length}`,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        if (response.type === "success") {
          return { os: response.data };
        }
        return { os: [] };
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetOsVersionQuery } = getOsAPI;
