import React from "react";
import { Modal, Typography, Card, CardActions, CardContent, Box, Backdrop, IconButton, InputLabel, Radio, FormControl, RadioGroup, FormControlLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from "@mui/lab";
import { InputField } from "../inputField";
import { Upload } from "../upload/fileupload";
import { PasswordField } from "../password";


const styles = makeStyles((theme) => ({
    radiobtn: {
        flexDirection: "row",
        display: "flex",
        "& .css-59orve-MuiTypography-root": {
            fontSize: "12px",

        }
    },
    pass: {
        margin: "15px 0px"
    },
    successbox:{
        backgroundColor:"#00b17e30", 
        color:"#00B17E",
        borderRadius:"7px",
        padding:"5px",
        textAlign:"center"
    }

}));



export const InstanceModal = ({
    title = "",
    addSaveButton = "text",
    addSaveButtonType = "contained",
    open = false,
    setOpen = () => false,
    Savebtn = () => false,
    AddTestbtn = () => false,
    onEnter = () => false,
    value = "",
    textLable = "",
    textPlaceHolder = "",
    loading = false,
    radioprimary = "",
    radiosecondary = "",
    addTestButton = "text",
    addTestButtonType = "contained",
}) => {
    const classes = styles();
    const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400 };

    const handleClose = () => {
        if (loading === false) {
            setOpen(false);
        }
    };
    const [Ivalue, setIvalue] = React.useState('a');
    const handleChange = (event) => {
        setIvalue(event.target.value);
    };

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

                    {/* input field */}
                    <CardContent sx={{ padding: "15px 8px 16px 8px", }}>
                        <Box sx={{ marginBottom: "15px" }}>
                            <InputLabel sx={{ fontSize: "14px" }}>
                                Enter server IP address
                            </InputLabel>
                            <InputField
                                onChange={(e) => onEnter(e.target.value)}
                                value={value}
                                label={textLable}
                                fullWidth
                                placeholder={textPlaceHolder}

                            />
                        </Box>
                        <Box sx={{ marginBottom: "15px" }}>
                            <InputLabel sx={{ fontSize: "14px" }}>
                                Enter Here
                            </InputLabel>
                            <InputField
                                onChange={(e) => onEnter(e.target.value)}
                                value={value}
                                label={textLable}
                                fullWidth
                                placeholder={textPlaceHolder}

                            />
                        </Box>
                    </CardContent>

                    {/* Radio button */}
                    <Box>
                        <FormControl sx={{ justifyContent: "center", display: "flex", flexDirection: "inherit" }}>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={Ivalue}
                                onChange={handleChange}
                                className={classes.radiobtn}
                            >
                                <Box> <FormControlLabel value="a" control={<Radio sx={{ padding: "0px 0px" }} />} label={radioprimary} sx={{ fontSize: "14px" }} /></Box>
                                <Box><FormControlLabel value="b" control={<Radio sx={{ padding: "0px 0px" }} />} label={radiosecondary} sx={{ fontSize: "14px" }} /></Box>

                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>

                        {
                            Ivalue === "a" ?
                                <Box>
                                    <Upload />
                                </Box>
                                :
                                <Box className={classes.pass}>
                                    <PasswordField placeholder="Password" fullWidth />
                                </Box>

                        }
                    </Box>

                    {/* Save button */}
                    <CardActions sx={{ justifyContent: "center" }}>
                        <LoadingButton loading={loading} size="small" variant={addTestButtonType} className={classes.addButton} sx={{color:"#18283E"}} onClick={AddTestbtn}>{addTestButton}</LoadingButton>
                        <LoadingButton loading={loading} size="small" variant={addSaveButtonType} className={classes.addButton} onClick={Savebtn}>{addSaveButton}</LoadingButton>
                    </CardActions>
                    
                    {/* Sucess message */}
                    {/* <Box className={classes.successbox}>
                        <Typography sx={{fontSize:"12px"}} variant="subtitle1" color="success">Great! Connection is working</Typography>
                    </Box> */}
                </Card>
            </Modal>
        </div>
    );
};

