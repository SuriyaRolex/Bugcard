import React from 'react'
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { ToggleButton, ToggleButtonGroup, Box, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";
import SearchField from '../searchField';

const styles = makeStyles((theme) => ({
    subnav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop:"87px",paddingLeft:"20px",paddingRight:"20px",
        [theme.breakpoints.down('sm')]: {
            display: "block",
        }
    },
    gridlisticon: {
        padding: " 0px 15px",
        [theme.breakpoints.down('sm')]: {
            padding: "10px 0px",
        }
    },
    iconm: {
        padding: "6px 6px",
        boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
        border: "1px solid #c9c9c9"
    },
    search: {
        display: "flex",
        justifyContent: "space-between",
        color: "#000",
        [theme.breakpoints.down('sm')]: {
            display: "block",
        }
    },

}));

export const NavTitle = ({ title = "", search = "", setSearch = () => { }, handleView = () => false, addprojects = () => false, searchbtn = () => { } }) => {

    const classes = styles();
    const [view, setView] = React.useState('module');

    const handleChange = (event, nextView) => {
        setView(nextView);
        handleView()
    };

    return (
        <div>
            <Box className={classes.subnav}>

                {/* title */}
                <Box>
                    <Typography variant="h6" sx={{ fontFamily: "crayond_medium" }}>{title} </Typography>
                </Box>
                {
                /* Grid-addprojects */}
                <Box className={classes.search}>
                    <SearchField search={search} onSearch={setSearch} />

                    {/* Grid-listview */}
                    <div className={classes.gridlisticon}>
                        <ToggleButtonGroup
                            orientation="horizontal"
                            value={view}
                            exclusive
                            onChange={handleChange}
                        >
                            
                            <ToggleButton className={classes.iconm} value="list" aria-label="list">
                                <ViewListIcon sx={{ color: "#6e6e6e" }} />
                            </ToggleButton>
                            <ToggleButton className={classes.iconm} value="module" aria-label="module">
                                <ViewModuleIcon sx={{ color: "#6e6e6e" }} />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    {/* addprojects-button */}
                    {/* <Button variant="contained" color='primary' sx={{fontFamily:"crayond_medium",fontSize:"14px"}} onClick={addprojects}>
                        add
                    </Button> */}
                </Box>
            </Box>
        </div >
    )
}
