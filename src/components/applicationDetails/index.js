import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography, Box } from "@mui/material";
import { InputField } from "../inputField";


const useStyles = (makeStyles)((theme) => ({
    border: {
        border: '1.3px solid #CBCBCB',
        padding: '12px',
        borderRadius: '8px'
    },
    InputField: {
        marginBottom: '4px'
    },
}));


export const ApplicationDetails = ({ dataAlert = [], handleChange = () => { } }) => {




    const classes = useStyles();
    return (
        <div className={classes.border}>

            {/* Title */}
            <Typography variant='subtitle2' gutterBottom >Application Details</Typography>

            {dataAlert.map((_, key) => {
                return <div key={key} className={classes.report}>
                    <Box className={classes.InputField} >
                        <InputField
                            label={_?.label}
                            isMulti={_?.isMulti}
                            placeholder={_?.placeholder}
                            fullWidth
                            helperText={_?.helperText}
                            isError={_?.isError}
                            value={_?.value}
                            type={_?.type}
                            onChange={(e) => handleChange(_?.key, e.target.value)}
                            select={_.select}
                            selectOption={_?.selectOptions}
                        />
                    </Box>
                </div>
            }

            )}

        </div>
    )

}

