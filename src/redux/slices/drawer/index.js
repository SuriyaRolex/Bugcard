import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    children: <></>,
    component:<></>,
    direction:"right",
    title: "Dialog",
    onSave: () => false
}

const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        openDrawer(state, { payload }) {
            state.open = true;
            state.children = payload?.children;
            state.title = payload?.title ?? initialState.title;
            state.btnName = payload?.btnName ?? initialState.btnName;
            state.component = payload?.component ?? initialState.component;    
            state.onSave = payload?.onSave ?? initialState.onSave;    
        },
        closeDrawer(state, { payload }) {
            state.open = false;
            state = initialState;
        }
    },
})

export const { openDrawer, closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;