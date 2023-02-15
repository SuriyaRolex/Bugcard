import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { makeStyles } from "@mui/styles";
import { SwitchAnt } from '../switch';


const styles = makeStyles((theme) => ({
    total: {
        border: "1px solid #c4c4c4",
        borderRadius: "12px",
        padding: "10px 10px",
    },
    report: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "7px 2px"
    },
    sub: {
        color: "#a1a1a1"
    }
}));



export const Report = ({ title = "", data = [], handleChange = () => { } }) => {

    const classes = styles();

    return (
        <div>
            <Box>
                <Box className={classes.total}>

                    {/* title */}
                    <Typography variant='subtitle2' sx={{ textAlign: "left", padding: "5px 0px" }}>{title}</Typography>

                    {/* content */}
                    {data.map((_, key) => <div key={key} className={classes.report}>

                        <Typography variant='subtitle2' className={classes.sub}>{_.title}</Typography>
                        <SwitchAnt checked={_.value} onChange={(e) => handleChange(_.key, e.target.checked)} />
                    </div>)}

                </Box>
            </Box>
        </div>
    )
}
