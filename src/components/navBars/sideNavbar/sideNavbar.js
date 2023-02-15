import React from 'react';
import { makeStyles } from "@mui/styles";
import {Paper, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import { matchPath, useNavigate, useLocation } from 'react-router-dom';

// const drawerWidth = 56;

const useStyles = makeStyles((theme) => ({
    root: {
        // width: props => props?.isMobile ? 240 : drawerWidth,
        position: 'absolute',
    },
    // drawer: {
    //     height: props => props?.isMobile ? `100vh` : `calc(100vh - 64px)`,
    //     width: props => props?.isMobile ? 240 : drawerWidth,
    // },
    drawerContainer: {
        overflow: 'hidden',
    },
}));

export const SideNavBar = (props) => {

    const classes = useStyles(props);

    const navigate = useNavigate();
    const location = useLocation();

    const isSelected = (data) => {
        if (data.link) {
            return matchPath(location.pathname, {
                path: data.link
            })
        }
    }

    const onListClick = (data) => {
        if (data.link) {
            navigate(data.link)
        }
    }

    return (
        <div className={classes.root}>
            <Paper
                className={classes.drawer}
                square
            >
                <div className={classes.drawerContainer}>
                    <List>
                        {[].map((navBar, index) => (
                            <ListItem onClick={(e) => onListClick(navBar)}
                                button
                                key={index}
                                selected={isSelected(navBar)}>

                                <ListItemIcon>{navBar.icon}</ListItemIcon>

                                <ListItemText primary={navBar.name} />

                            </ListItem>
                        ))}
                    </List>
                </div>
            </Paper>
        </div>
    );
}
