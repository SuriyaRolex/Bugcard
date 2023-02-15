import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    backdrop: {

    },
    sideNavBar: {
        open: false
    },
    refreshProjectListing: false,
    refreshProjectInstanceListing :false,
}

const utilsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        toogleNavBar(state, { payload }) {
            state.sideNavBar.open = !state.sideNavBar.open;
        },
        refreshProjectListing(state, { payload }) {
            state.refreshProjectListing = !state.refreshProjectListing
        },
        refreshProjectInstanceListing(state ,{payload}){
            state.refreshProjectInstanceListing = !state.refreshProjectInstanceListing
        }
    },
})

export const { toogleNavBar, refreshProjectListing ,refreshProjectInstanceListing} = utilsSlice.actions;
export default utilsSlice.reducer;