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

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const reportAPI = createApi({
  reducerPath: "reportAPI",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["reports"],
  endpoints: (builder) => ({
    // Performance Test Report API
    PerformanceTestReport: builder.query({
      query: (payload) => ({
        url: `application/report/get/performance?applicationId=${payload?.application_id}`,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),
    // SAST Report API
    SASTReport: builder.query({
      query: (payload) => ({
        url: `application/report/get/codequality?applicationId=${payload?.application_id}`,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),
    // DAST Report API
    DASTReport: builder.query({
      query: (payload) => ({
        url: `application/report/get/security?applicationId=${payload?.application_id}`,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),
    // Errorlog Report API
    ErrorLog: builder.query({
      query: (payload) => ({
        url: `application/get/logs?log_type=error&log_lines=100&applicationId=${payload?.application_id}`,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),
    // Error Download API
    ErrorDownloadLog: builder.query({
        query: (payload) => ({
          url: `application/get/logs?log_type=error&log_lines=500&applicationId=${payload?.application_id}`,
          method: "GET",
        }),
        transformResponse: (response, meta, arg) => {
          return response;
        },
      }),
    // Accesslog Report API
    AccessLog: builder.query({
      query: (payload) => ({
        url: `application/get/logs?log_type=access&log_lines=100&applicationId=${payload?.application_id}`,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),
    // Accesslog Download API
    AccessDownloadLog: builder.query({
      query: (payload) => ({
        url: `application/get/logs?log_type=access&log_lines=500&applicationId=${payload?.application_id}`,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),
    // Outputlog Report API
    OutputLog: builder.query({
      query: (payload) => ({
        url: `application/get/logs?log_type=output&log_lines=100&applicationId=${payload?.application_id}`,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),
    // Outputlog Download API
    OutputDownloadLog: builder.query({
        query: (payload) => ({
          url: `application/get/logs?log_type=output&log_lines=500&applicationId=${payload?.application_id}`,
          method: "GET",
        }),
        transformResponse: (response, meta, arg) => {
          return response;
        },
      }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLazyPerformanceTestReportQuery,
  useSASTReportQuery,
  useDASTReportQuery,
  useLazyDASTReportQuery,
  useErrorLogQuery,
  useLazyAccessLogQuery,
  useLazyAccessDownloadLogQuery,
  useLazyErrorDownloadLogQuery,
  useLazyOutputDownloadLogQuery,
  useLazyErrorLogQuery,
  useLazyOutputLogQuery,
} = reportAPI;
