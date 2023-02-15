import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({

    tab: {
        '&.Mui-selected': {
            color: '#000',
        },

    },

    underTab: {
        "& .MuiTabs-indicator": {
            backgroundColor: "#0065e6",
            height: "3px",
            // borderRadius:"3px"

        }
    }


}));
export const DataTabs = ({ tabs = [], activeTab, handleChangeTab }) => {

    const classes = useStyles();

    const handleChange = (event, newValue) => {
        handleChangeTab(newValue);
    };

    return (
        <div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={activeTab} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "#fff", padding: "0px 30px" }}>
                        <TabList className={classes.underTab} onChange={handleChange} aria-label="lab API tabs example">
                            {
                                tabs?.map(tab => (
                                    <Tab className={classes.tab} label={tab.label} value={tab.value} />
                                ))
                            }
                        </TabList>
                    </Box>
                    <TabPanel sx={{padding:"0px"}} value={activeTab}>{tabs?.find(tab => tab.value === activeTab)?.body}</TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}
