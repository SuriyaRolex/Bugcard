import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    message: ""
}

const backdropSlice = createSlice({
    name: 'backdrop',
    initialState,
    reducers: {
        openBackdrop(state, { payload }) {
            state.open = true;
            state.message = payload;
        },
        closeBackdrop(state, { payload }) {
            state.open = false;
            state.message = ""
        }
    },
})

export const { openBackdrop, closeBackdrop } = backdropSlice.actions;
export default backdropSlice.reducer;