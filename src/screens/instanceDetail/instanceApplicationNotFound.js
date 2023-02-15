import React from 'react'
import { Box } from '@mui/system'
import { InfoCard } from '../../components'
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {

    }, cardbox: {
        display: "flex",
        justifyContent: "center",
        paddingTop: "80px"
    },
}))
export const InstanceApplication = ({ onAddApplicationButtonClicked = () => false }) => {

    const classes = useStyles();

   
    return (
        <Box className={classes.cardbox}>

            {/* infoCard */}
            <InfoCard
                primaryText="Howdy! You haven't added any application yet"
                actionButton="+ Add Application"
                onActionButtonClicked={onAddApplicationButtonClicked}
            />
        </Box>
    )
}
