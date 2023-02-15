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
export const ProjectsNotfound = ({
    onAddProjectButtonClicked = () => false
}) => {

    const classes = useStyles();

    return (
        <Box className={classes.cardbox}>
            {/* Info Card */}
            <InfoCard
                primaryText="Howdy! You haven't added any projects yet"
                actionButton="Add Project"
                onActionButtonClicked={onAddProjectButtonClicked}
            />
        </Box>
    )
}
