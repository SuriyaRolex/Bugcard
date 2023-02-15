import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, { payload }) {
            state.userDetails = payload;
        }
    },
})

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;