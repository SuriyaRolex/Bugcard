import React from "react";
import { Grid, Typography, CircularProgress, Backdrop } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { closeBackdrop } from "./redux/slices/backdrop";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export const AppBackDrop = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const { open, message } = useSelector((state) => state.backdrop);

    const close = () => { dispatch(closeBackdrop()) }

    return <>
        {props.children}
        <Backdrop className={classes.backdrop} open={open} onClick={close}>
            <Grid container direction="column" alignItems="center" justifyContent="center">
                <Grid item>
                    <CircularProgress color="inherit" />
                </Grid>
                <Grid item>
                    <Typography variant="h6" color="inherit" >{message}</Typography>
                </Grid>
            </Grid>
        </Backdrop>
    </>;
}