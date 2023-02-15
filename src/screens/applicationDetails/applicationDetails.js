import React from 'react'
import { makeStyles } from "@mui/styles";
import { Typography, Box } from '@mui/material';
import { HealthList } from '../../components';
import { DataTabs } from '../../components/dataTabs';
import { TopNavBar } from "../../components";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        backgroundImage: "url('/images/jpg/signInSignUpBg.png')", height: "auto", backgroundSize: "cover", backgroundRepeat: "no-repeat"

    },
    instancebg: {
        textAlign: "center",
        backgroundImage: "url('/images/instance.svg')", height: "215px", backgroundSize: "cover"
    }, progressbar: {
        marginTop: "-100px",
    },
    container: {
        width: "100%",
        maxWidth: "75%"
    }
}))

export const Application = () => {

    const classes = useStyles();
const location =useLocation()

    // Component States
    let { project_id, instance_id, application_id, } = useParams();
    let params = new URLSearchParams(window.location.search);
    const searchParamsTab = params.get('tab')

    const [activeTab, setActiveTab] = React.useState(1);

    React.useEffect(()=>{
        if(searchParamsTab){
            setActiveTab(parseInt(searchParamsTab))
        }
    },[searchParamsTab])

    const tabChange = (value) => {
        window.history.replaceState(null, null, `?tab=${value}`);
        setActiveTab(value)
    }
      
    const tabs = [
        {
            label: <Typography variant="body2" gutterBottom component="div" sx={{ fontFamily: "crayond_semibold", fontSize: "14px", textTransform: "capitalize" }}>Testing Reports</Typography>,
            value: 1,
            body: <div><HealthList healthData={[
                { headerText: location?.state, secondarytext: "Performance Test Report", infotext: "", btntext: "Run", btnView:"View", view_route: `/Performance_Test_Report/${application_id}`, HideMoreBtn: true },
                { headerText: location?.state, secondarytext: "SAST Report", infotext: "", btntext: "Run",btnView:"View", view_route: `/SAST_Report/${application_id}`, HideMoreBtn: true },
                { headerText: location?.state, secondarytext: "DAST Report", infotext: "", btntext: "Run", btnView:"View", view_route: `/DAST_Report/${application_id}`, HideMoreBtn: true },
                { headerText: location?.state, secondarytext: "BDD Report", infotext: "", btntext: "Run", btnView:"View", view_route: `/BDD_Report/${application_id}`, HideMoreBtn: true }
            ]} /></div>
        },
        {
            label: <Typography variant="body2" gutterBottom component="div" sx={{ fontFamily: "crayond_semibold", fontSize: "14px", textTransform: "capitalize" }}>Logs</Typography>,
            value: 2,
            body: <div><HealthList healthData={[
                { headerText: location?.state, secondarytext: "Access Log", infotext: "", btntext: "view", route: `/applicationlog/accesslog/${project_id}/${instance_id}/${application_id}`, HideMoreBtn: true },
                { headerText: location?.state, secondarytext: "Error Log", infotext: "", btntext: "view", route: `/applicationlog/errorlog/${project_id}/${instance_id}/${application_id}`, HideMoreBtn: true },
                { headerText: location?.state, secondarytext: "Output Log", infotext: "", btntext: "view", route: `/applicationlog/outputlog/${project_id}/${instance_id}/${application_id}`, HideMoreBtn: true }
            ]} /></div>
        },
    ]

    const giveMeTopNavbarPrimaryText = () => {
        // if () {
        //     return "Loading...";
        // } else if () {
        //     return "Automatly";
        // } else {
        //     return ;
        // }
    }
    // console.log(GetLogsLoading, "isLoading: GetLogsLoading, data: GetLogsData", GetLogsData, "GetLogsisError", GetLogsIsError, "APIError?.data?.type", APIError?.data)
    return <>
        <TopNavBar showActionBtn={false}
            showTopLeftNav={true} primaryText={giveMeTopNavbarPrimaryText()} secondaryText={"Applications"} />
        <div className={classes.root}>
            <Box sx={{ paddingTop: "70px" }}>
                <DataTabs tabs={tabs} activeTab={activeTab} handleChangeTab={(val) => tabChange(val) }  />
            </Box>
        </div>
    </>
}
