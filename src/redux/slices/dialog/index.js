import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    title: "Dialog",
    body: "",
    positiveBtn: "Ok",
    negativeBtn: "Cancel",
    onOk: () => null,
    hideNegativeBtn: false,
    hidePositiveBtn: false
}

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDialog(state, { payload }) {
            let {
                title = "Dialog", body = "", positiveBtn = "Ok", negativeBtn = "Cancel",
                onOk = () => null, hideNegativeBtn = false, hidePositiveBtn = false
            } = payload;
            state.open = true;
            state.title = title;
            state.body = body;
            state.positiveBtn = positiveBtn;
            state.negativeBtn = negativeBtn;
            state.onOk = onOk;
            state.hideNegativeBtn = hideNegativeBtn;
            state.hidePositiveBtn = hidePositiveBtn;
        },
        closeDialog(state, { payload }) {
            state = { ...initialState, open: false };
        }
    },
})

export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;