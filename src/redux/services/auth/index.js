import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { config } from '../../../config';
import { LocalStorageKeys } from '../../../utils';
import { setAuth } from '../../slices/auth';

export const authAPI = createApi({
    reducerPath: "authAPI",
    baseQuery: retry(fetchBaseQuery({ baseUrl: config.api_url + "users/" }), { maxRetries: 2 }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        // Login API
        login: builder.mutation({
            query: (payload) => ({ url: `login`, method: "POST", body: payload }),
            async onQueryStarted(arg, { dispatch, queryFulfilled,getState }) {
                try {
                    const { data } = await queryFulfilled;
                    //Saving the response in Auth Slice
                    dispatch(setAuth({ ...data }));

                    // Saving the auth tokens in local storage
                    localStorage.setItem(LocalStorageKeys.authToken, data?.authToken);

                    // Saving the name in local storage
                    localStorage.setItem(LocalStorageKeys.name, data?.name);
                    
                } catch (error) {
                    console.log("Error at authAPI :", error);
                }
            }
        }),

        // Sign Up API
        signUp: builder.mutation({
            query: (payload) => ({ url: `new`, method: "POST", body: payload }),
        }),

        // Refresh API
        refresh: builder.query({
            query: (payload) => ({
                url: `refresh`,
                method: "POST",
                body: { refresh: localStorage.getItem(LocalStorageKeys.authToken) },
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem(LocalStorageKeys.accessToken) }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    //Saving the response in Auth Slice
                    dispatch(setAuth({ ...data }));

                    // Saving the auth token in local storage
                    localStorage.setItem(LocalStorageKeys.authToken, data?.authToken);
                } catch (error) {
                    console.log("Error at authAPI :", error);
                    // Removing the refresh tokens in local storage
                    localStorage.removeItem(LocalStorageKeys.authToken);
                }
            }
        }),

        // Logout API
        logout: builder.mutation({
            query: (payload) => ({
                url: `logout`,
                method: "POST",
                body: { auth_token: localStorage.getItem(LocalStorageKeys.authToken) },
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem(LocalStorageKeys.authToken) }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    //Saving the response in Auth Slice
                    setAuth({});

                    // Removing the refresh and access tokens in local storage
                    localStorage.removeItem(LocalStorageKeys.authToken);
                } catch (error) {
                    console.log("Error at authAPI :", error);
                }
            }
        }),

        // Reset Password API
        resetPassword: builder.mutation({
            query: (payload) => ({ url: `password/reset`, method: "POST", body: payload })
        }),

        // Set Password API
        setPassword: builder.mutation({
            query: (payload) => ({ url: `password/reset/${payload.token}`, method: "POST", body: payload }),
        }),

        // Change Password
        changePassword: builder.mutation({
            query: (payload) => ({ url: `password/change`, method: "PATCH", body: payload, headers: { 'Authorization': "Bearer " + localStorage.getItem(LocalStorageKeys.authToken) } }),
        }),
    }),
})

// Export hooks for usage in functional components
export const { useLoginMutation, useRefreshQuery, useLogoutMutation, useResetPasswordMutation, useSetPasswordMutation, useChangePasswordMutation, useSignUpMutation } = authAPI
