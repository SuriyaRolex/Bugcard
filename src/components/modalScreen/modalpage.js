import React from "react";
import { Modal, Typography, Card, CardActions, CardContent, Box, Backdrop, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { InputField } from ".."
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from "@mui/lab";

const styles = makeStyles((theme) => ({
    addButton: {
        marginBottom: "4px",
        padding: "6px 16px",
    },
    headerText: {
        fontFamily: "crayond_bold"
    },
    cancelIcon: {
        backgroundColor: "#FAFAFA",
        borderRadius: "50%",
        fontSize: "initial",
        border: "1px solid #CBCBCB",
    }
}));


export const ModalPage = ({
    title = "",
    addContinueButton = "text",
    addContinueButtonType = "contained",
    open = false,
    setOpen = () => false,
    Addbtn = () => false,
    onEnter = () => false,
    value = "",
    textLable = "",
    textPlaceHolder = "",
    loading = false,
}) => {
    const classes = styles();
    const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400 };
    const handleClose = () => {
        if(loading===false){
            setOpen(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          console.log('do validate')
        }
      }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >

                <Card sx={{ ...style, maxWidth: 390, borderRadius: "16px", padding: "16px", boxShadow: "0px 8px 69px #0000001A", }}>

                    {/* header with cancel icon */}
                    <Box display={"flex"} justifyContent={"space-between"} sx={{ alignItems: "center" }}>
                        <Typography className={classes.headerText} variant="body2" color="text.primary" textAlign={"center"}>
                            {title}
                        </Typography>

                        {/* cancel icon */}
                        <IconButton onClick={handleClose}>
                            <CloseIcon className={classes.cancelIcon} />
                        </IconButton>
                    </Box>

                    {/* image */}
                    <center>
                        <img src="/images/modalLogo.png" alt="logo" />
                    </center>

                    {/* input field */}
                    <CardContent sx={{ padding: "0px 8px 16px 8px" }}>
                        <InputField
                            onChange={(e) => onEnter(e.target.value)}
                            value={value}
                            label={textLable}
                            fullWidth
                            placeholder={textPlaceHolder}
                        />
                    </CardContent>

                    {/* continue button */}
                    <CardActions>
                        <LoadingButton loading={loading} size="small" variant={addContinueButtonType} onKeyDown={handleKeyDown} fullWidth className={classes.addButton}  onClick={Addbtn} type="submit">{addContinueButton}</LoadingButton>
                    </CardActions>
                </Card>
            </Modal>
        </div>
    );
};

