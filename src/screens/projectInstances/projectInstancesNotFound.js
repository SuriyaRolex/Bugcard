import React from 'react'
import { Box } from '@mui/system'
import { InfoCard } from '../../components'
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
    root: {

    }, cardbox: {
        display: "flex",
        justifyContent: "center",
        paddingTop: "90px"
    },
}))
export const ProjectInstancesNotFound = ({
    onAddInstanceButtonClicked = () => false
}) => {

    const classes = useStyles();

    return (
        <Box className={classes.cardbox}>

            {/* Info Card */}
            <InfoCard
                primaryText="Howdy! You haven't added any Instance yet"
                actionButton="Add Instance"
                onActionButtonClicked={onAddInstanceButtonClicked}
            />
        </Box>
    )
}
