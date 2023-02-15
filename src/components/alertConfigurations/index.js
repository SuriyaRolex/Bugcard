import React from 'react'
import { Typography, Box, Button } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Chip from '@mui/material/Chip';
import { InputField } from "../../components"
import { SwitchAnt } from '../switch';

const useStyles = makeStyles((theme) => ({
    total: {
        backgroundColor: "#fff",
        border: "1px solid #c4c4c4",
        borderRadius: "7px",
        padding: "10px 10px",

    },
    alert: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "4px 0px"
    }

}));

export const AlertConfigurations = ({ title = "",
    label = "", placeholder = "", helperText = "",
    iserror = "", value = "", onChange = () => false,
    onClick = () => false, handleChange = () => false,
    handleChangeValue, handleClick = () => false, handleDelete = () => false, emailIds = [] }) => {

    const classes = useStyles();

    return (
        <div>
            <Box className={classes.total} >
                <Box className={classes.alert}>

                    {/* Title */}
                    <Typography variant='subtitle2' sx={{ fontSize: "14px" }}>{title}</Typography>

                    {/* switch */}
                    <Box className={classes.alert}>
                        <SwitchAnt checked={handleChangeValue} onChange={handleChange} />
                    </Box>
                </Box>

                {/* Email */}
                <Box>
                    {
                        handleChangeValue === false ?
                            ""
                            :
                            <>
                                <Box>
                                    <InputField
                                        multiple
                                        label={label}
                                        isRequired
                                        fullWidth
                                        helperText={helperText}
                                        isError={iserror}
                                        value={value}
                                        onChange={onChange}
                                    />
                                </Box>

                                <Button variant='contained' size='small' sx={{ margin: "5px" }} onClick={onClick}>
                                    Add
                                </Button>
                                <Box>
                                    {(emailIds.length > 0) &&
                                        <>
                                            {emailIds.map((item, index) => {
                                                return (
                                                    <Chip size='small' key={index} sx={{ margin: "5px 5px" }} label={item} onClick={handleClick} onDelete={() => handleDelete(item, index)} />

                                                )
                                            })
                                            }
                                        </>
                                    }
                                </Box>
                            </>
                    }
                </Box>

            </Box>
        </div>
    )
}
