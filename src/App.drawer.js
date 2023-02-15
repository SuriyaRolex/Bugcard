import React from "react";
import { Drawer } from "@mui/material";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { closeDrawer } from "./redux/slices/drawer";
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        minWidth: 400,
        background: "#fff",
        [theme.breakpoints.down('sm')]: {
            maxWidth: 300,
            minWidth: 300,
        },
        overflowX: 'hidden'
    },
    large: {
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        position: "fixed",
        right: "410px",
        cursor: "pointer",
        top: "18px",
        color: "#6A7888",
        background: "#fff",
        padding: "5px 5px",
        "& img": {
            objectFit: "scale-down",
            backgroundColor: "#fff"
        },
        [theme.breakpoints.down('sm')]: {
            right: "313px",

        },
    },
    root_extra_large: {
        maxWidth: 1000,
        minWidth: 1000,
        background: "#fff",
        [theme.breakpoints.down('sm')]: {
            maxWidth: 300,
            minWidth: 300,
        },
        overflowX: 'hidden'
    },
    large_extra_large: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        position: "fixed",
        right: "1010px",
        cursor: "pointer",
        top: 10,
        "& img": {
            objectFit: "scale-down",
            backgroundColor: "#fff"
        },
        [theme.breakpoints.down('sm')]: {
            right: "313px",

        },
    },

    title: {
        fontFamily: 'crayond_regular',
        fontSize: '16px',
        fontWeight: '600',


    },
    move: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: "center",
        borderBottom: '1.5px solid #CBCBCB',
        padding: "16px 20px",
    },
    button: {

        borderRadius: '8px',
        padding: '4px',
        textTransform: 'capitalize',
    },


}));

export const AppDrawer = (props) => {
    const dispatch = useDispatch();

    const close = () => {
        dispatch(closeDrawer({}));
    };

    const classes = useStyles()
    const { direction, variant, open, component, isLarge, } = useSelector(state => state.drawer);

    React.useEffect(() => { }, [open])


    return <>
        {props.children}
        <Drawer anchor={direction} variant={variant} open={open} onClose={close} ModalProps={{ keepMounted: true }}>
            <CloseIcon src="/images/close.svg" className={`${classes.large} ${isLarge ? classes.large_extra_large : ""}`} onClick={close} />

            <div className={`${classes.root} ${isLarge ? classes.root_extra_large : ""}`}>{component}</div>
        </Drawer>
    </>
}