import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config";
import { LocalStorageKeys } from "../../../utils";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: config.api_url + "user/",
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

export const usersAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    // Get All User API
    getAllUsers: builder.query({
      query: (payload) => ({ url: `user`, method: "GET" }),
      transformResponse: (response, meta, arg) => {
        if (response.code === 200 && response.is_success) {
          return response.data;
        }
        return [];
      },
    }),

    // Get User API
    getUser: builder.query({
      query: (payload) => ({
        url: `${payload.id ? `/${payload.id}/` : "/"}`,
        method: "GET",
      })
    }),

    // Create User API
    createUser: builder.mutation({
      query: ({ email = "", name = "", country_code = "", contact_number = ""}) => ({
        url: `user/`,
        method: "POST",
        body: { email, name, country_code, contact_number }
      }),
    }),

    // Update User API
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `user/${payload.id}/`,
        method: "PATCH",
        body: payload.body,
      }),
    }),

    // Delete User API
    deleteUser: builder.mutation({
      query: ({ id }) => ({ url: `user/${id}/`, method: "DELETE" }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersAPI;
