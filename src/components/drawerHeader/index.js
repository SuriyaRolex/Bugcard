import React from 'react'
import { Typography, Box,IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';


const useStyles = makeStyles((theme) => ({
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
        backgroundColor: "#fff",
        position: "fixed",
        width: "100%",
        maxWidth: "392px",
        zIndex: "99"
    },
    button: {
        borderRadius: '8px',
        padding: '4px',
        textTransform: 'capitalize',
    },
  
  
}));

export const DrawerHeader = ({ showBackBtn = true,
    onBackBtnClicked=()=>{}, title = "", onSave = () => false, btnName = "", isLoading = false }) => {

    const classes = useStyles();

    return (
        <div className={classes.total}>
            <Box className={classes.move}>
                <Box sx={{display:"flex",alignItems:"center"}}>
                    {showBackBtn === false && <Box sx={{marginLeft:"-18px",marginRight:"8px"}}>
                        <IconButton sx={{}} onClick={onBackBtnClicked}>
                            <KeyboardBackspaceRoundedIcon />
                        </IconButton> </Box>
                    }
                    <Typography className={classes.title}>{title}</Typography>
                </Box>
           
                <LoadingButton loading={isLoading} className={classes.button} onClick={onSave} variant="contained">{btnName}</LoadingButton>
            </Box>
        </div>
    )
}
