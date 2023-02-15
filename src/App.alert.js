import React from "react";
import { SnackbarProvider } from 'notistack';

export const AppAlert = (props) => {
    return <SnackbarProvider maxSnack={3}>
        {props.children}
    </SnackbarProvider>
}