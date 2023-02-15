
import React from 'react'
import { makeStyles } from "@mui/styles";
import { Box, Grid, Typography, Paper, CircularProgress, circularProgressClasses, Button } from '@mui/material';

import { TopNavBar } from "../../components";

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { bdd_data } from "./bdd_dummy_data";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';


const useStyles = makeStyles((theme) => ({
    root: {
        // textAlign: "center",
        backgroundImage: "url('/images/jpg/signInSignUpBg.png')", height: "100vh", backgroundSize: "cover", backgroundRepeat: "no-repeat",
        paddingTop: "70px",
    },
    parentDiv: {
        width: "100%",
        display: 'flex'
    },
    parentDiv1: {
        width: "30%",
        backgroundColor: "#e4f4f8"
    },
    parentDiv2: {
        width: "70%"
    },
    instanceContentHeadingsDiv: {
        display: 'flex',
        height: "50px",
        alignItems: 'center'
    },
    instanceContentHeadings: {
        whiteSpace: "nowrap",
        textAlign: 'left',
        marginLeft: "12px"
    },
    instanceContentDiv: {
        height: "50px",
        borderBottom: "1px solid #e3e3e3",
        alignItems: 'center',
        display: 'flex'
    },
    instanceContent: {
        whiteSpace: "nowrap",
        textAlign: 'left',
        textOverflow: "ellipsis",
        overflow: "hidden",
        marginLeft: "8px"
    },
    gridContainer: {
        width: "100%"
    },
    featureGrid: {
        padding: "14px"
    },
    featurePaper: {
        height: "230px",
        borderBottom: "1px solid black"
    },
    featureDiv: {
        paddingLeft: "6px",
        width: "100%",
        height: "50px",
        display: 'flex',
        alignItems: 'center',
        background: "#0063E70A 0% 0% no-repeat padding-box"
    },
    featureTypo: {
        color: "#18283E",
        opacity: 1,
        fontWeight: 600
    },
    featureCircDiv: {
        height: "180px",
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scenarioGrid: {
        padding: "14px"
    },
    scenarioPaper: {
        height: "230px"
    },
    scenarioDiv: {
        paddingLeft: "6px",
        width: "100%",
        height: "50px",
        display: 'flex',
        alignItems: 'center',
        background: "#0063E70A 0% 0% no-repeat padding-box"
    },
    scenarioTypo: {
        color: "#18283E",
        opacity: 1,
        fontWeight: 600
    },
    scenarioCircDiv: {
        height: "180px",
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    metaGrid: {
        padding: "14px"
    },
    metaPaper: {
        height: "230px"
    },
    metaDiv: {
        paddingLeft: "6px",
        width: "100%",
        height: "50px",
        display: 'flex',
        alignItems: 'center',
        background: "#0063E70A 0% 0% no-repeat padding-box"
    },
    metaTypo: {
        color: "#18283E",
        opacity: 1,
        fontWeight: 600
    },
    metaContParentDiv: {
        height: '180px',
        width: "100%"
    },
    metaContParentSubDiv1: {
        height: '90px',
        width: "100%",
        display: 'flex'
    },
    metaContAppDiv: {
        height: '89px',
        width: "33.3%",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        paddingLeft: "12px"
    },
    metaContApVeTypo: {

        paddingBottom: "2px"
    },
    metaContApVeVrTypo: {
        paddingTop: "2px",
        color: "#18283E",
        opacity: 1,
        fontWeight: 600
    },
    metaContBrowserDiv: {
        height: '89px',
        width: "33.3%",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        paddingLeft: "12px"
    },
    metaContBrowserTypo: {
        paddingBottom: "2px"
    },
    metaContBrowserVr: {
        paddingTop: "2px",
        color: "#18283E",
        opacity: 1,
        fontWeight: 600
    },
    metaContScenariosDiv: {
        height: '89px',
        width: "33.3%",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        paddingLeft: "12px"
    },
    metaContParaTypo: {
        paddingBottom: "2px"
    },
    metaContScenrTypo: {
        paddingTop: "2px",
        color: "#18283E",
        opacity: 1,
        fontWeight: 600
    },
    metaContParentSubDiv2: {
        height: '90px',
        width: "100%",
        display: 'flex'
    },
    metaContStagingDiv: {
        height: '89px',
        width: "33.3%",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        paddingLeft: "12px"
    },
    metaContTeTypo: {
        paddingBottom: "2px"
    },
    metaContStagTypo: {
        paddingTop: "2px",
        color: "#18283E",
        opacity: 1,
        fontWeight: 600
    },
    metaContPlatDiv: {
        height: '89px',
        width: "33.3%",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        paddingLeft: "12px"
    },
    metaContPlatTypo: {
        paddingBottom: "2px"
    },
    metaContPlatOsTypo: {
        paddingTop: "2px",
        color: "#18283E",
        opacity: 1,
        fontWeight: 600
    },
    metaContExeDiv: {
        height: '89px',
        width: "33.3%",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        paddingLeft: "12px"
    },
    metaContExeTypo: {
        paddingBottom: "2px"
    },
    metaContRemoTypo: {
        paddingTop: "2px",
        color: "#18283E",
        opacity: 1,
        fontWeight: 600
    },
    bddAcord: {
        padding: "14px"
    },
    applicationSx: {
        fontSize: "16px",
        fontweight: "500",
        color: "#000",
        paddingTop: "12px",
        paddingLeft: "32px",
      },

}));

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : '#0063E70A',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


const getColorForScenario = (val) => {
    let statusArray = val?.steps?.map((s) => { return s?.result?.status });
    // console.log(val,"cal")
    // temp2.filter((i) => { return i === "passed" })
    return <div style={{ display: 'flex' }}>
        {statusArray?.filter((i) => { return i === "passed" })?.length > 0 && <Typography
            style={{
                height: "25px",
                width: "25px",
                backgroundColor: "#1cb45f",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                border: "1px",
                borderRadius: "3px",
                color:"white"
            }}>{statusArray?.filter((i) => { return i === "passed" })?.length}</Typography>}

        {statusArray?.filter((i) => { return i === "failed" })?.length > 0 && <Typography
            style={{
                height: "25px",
                width: "25px",
                backgroundColor: "#f44336",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                border: "1px",
                borderRadius: "3px",
                marginLeft: "4px",
                color:"white"
            }}>{statusArray?.filter((i) => { return i === "failed" })?.length}</Typography>}

        {statusArray?.filter((i) => { return i === "skipped" })?.length > 0 && <Typography
            style={{
                height: "25px",
                width: "25px",
                backgroundColor: "#ffc107",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                border: "1px",
                borderRadius: "3px",
                marginLeft: "4px",
                color:"white"
            }}>{statusArray?.filter((i) => { return i === "skipped" })?.length}</Typography>}
    </div>

};

const getColorForFeature = (val) => {
    return val?.elements?.map((i) => { return i?.steps?.map((s) => { return s?.result?.status }) })[0]?.includes('failed') ? "#f44336" : "#1cb45f";
};

let getFlag = (val) => {
    if (val === "passed") {
        return <CheckCircleIcon style={{ color: "#1cb45f" }} />
    }
    if (val === "failed") {
        return <CancelIcon style={{ color: "#f44336" }} />
    }
    if (val === "skipped") {
        return <DoNotDisturbOnIcon style={{ color: "#ffc107" }} />
    }
};


export const BDDReport = () => {

    const classes = useStyles();
   
    const [progress, setProgress] = React.useState(10);
    const [viewScreenShot, setViewScreenShot] = React.useState(false);

    const CircularProgressWithLabel = (props) => {
        return (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                    className={props?.className}
                    variant={props.variant ?? "determinate"}
                    size={props?.size}
                    value={props?.value}
                    thickness={props.thickness}
                    sx={{
                        color: props?.color,
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                        },
                    }}



                />
                <Box
                    sx={{
                        top: 0, left: 0, bottom: 0, right: 0,
                        position: 'absolute', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    <Typography variant="caption" component="div" color="textPrimary" sx={{ fontSize: "20px", lineHeight: "12px" }} >
                        {progress + "%"}
                    </Typography>
                </Box>
            </Box>
        );
    }

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [instance_expanded, setInstanceExpanded] = React.useState('panel1');

    const handleChangeInstanceExpand = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setInstanceExpanded(newExpanded ? panel : false);
    };

    const setViewScreenShotFunc = () => {
        setViewScreenShot(!viewScreenShot)
    }   

    return <>
        <TopNavBar
        isDownloadRefreshRequired
            showTopLeftNav={true}
            
            primaryText={"BDD Report"}
            secondaryText={"host"} />
        <div className={classes.root}>
        <Typography className={classes.applicationSx}>
                Applicatican Name V2
              </Typography>
            <Grid container className={classes.gridContainer}>
           
                <Grid item xs={6} sm={6} md={3} lg={3} className={classes.featureGrid}>
                    <Paper className={classes.featurePaper}>
                        <div className={classes.featureDiv} >
                            <Typography variant="subtitle2" className={classes.featureTypo}>{"Features"}</Typography>
                        </div>
                        <div className={classes.featureCircDiv}>
                            <div>
                                <CircularProgressWithLabel
                                    value={progress}
                                    className={classes.bar}
                                    color={"#11C61D"}
                                    size={100}
                                    variant={"determinate"}
                                    thickness={5}
                                />
                            </div>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={6} sm={6} md={3} lg={3} className={classes.scenarioGrid}>
                    <Paper className={classes.scenarioPaper}>
                        <div className={classes.scenarioDiv}>
                            <Typography variant="subtitle2" className={classes.scenarioTypo}>{"Scenario"}</Typography>
                        </div>
                        <div className={classes.scenarioCircDiv}>
                            <div>
                                <CircularProgressWithLabel
                                    value={progress}
                                    className={classes.bar}
                                    color={"#2FBBE6"}
                                    size={100}
                                    variant={"determinate"}
                                    thickness={5}
                                />
                            </div>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} className={classes.metaGrid}>
                    <Paper className={classes.metaPaper}>
                        <div className={classes.metaDiv}>
                            <Typography variant="subtitle2" className={classes.metaTypo}>{"Meta Data"}</Typography>
                        </div>
                        <div className={classes.metaContParentDiv}>
                            <div className={classes.metaContParentSubDiv1}>


                                <div className={classes.metaContAppDiv}>
                                    <Typography className={classes.metaContApVeTypo} variant="body2">App Version</Typography>
                                    <Typography className={classes.metaContApVeVrTypo} variant="subtitle2">0.3.2</Typography>
                                </div>

                                <div className={classes.metaContBrowserDiv}>
                                    <Typography className={classes.metaContBrowserTypo} variant="body2">Browser</Typography>
                                    <Typography className={classes.metaContBrowserVr} variant="subtitle2">Chrome 0.3.2</Typography>
                                </div>


                                <div className={classes.metaContScenariosDiv}>
                                    <Typography className={classes.metaContParaTypo} variant="body2">Parallel</Typography>
                                    <Typography className={classes.metaContScenrTypo} variant="subtitle2">Scenarios</Typography>
                                </div>

                            </div>

                            <div className={classes.metaContParentSubDiv2}>

                                <div className={classes.metaContStagingDiv}>
                                    <Typography className={classes.metaContTeTypo} variant="body2">Test Environment</Typography>
                                    <Typography className={classes.metaContStagTypo} variant="subtitle2">STAGING</Typography>
                                </div>

                                <div className={classes.metaContPlatDiv} >
                                    <Typography className={classes.metaContPlatTypo} variant="body2">Platfom</Typography>
                                    <Typography className={classes.metaContPlatOsTypo} variant="subtitle2">Windows 10</Typography>
                                </div>


                                <div className={classes.metaContExeDiv}>
                                    <Typography className={classes.metaContExeTypo} variant="body2">Executed</Typography>
                                    <Typography className={classes.metaContRemoTypo} variant="subtitle2">Remote</Typography>
                                </div>

                            </div>
                        </div>
                    </Paper>
                </Grid>


                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.bddAcord}>
                    {bdd_data.map((item, index) => {
                        return <Accordion expanded={expanded === index} onChange={handleChange(index)}>
                            <AccordionSummary key={index} aria-controls="panel1d-content" id="panel1d-header">
                                <Typography key={index}>{item?.name + " "}</Typography><div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}><Typography
                                    style={{
                                        height: "25px",
                                        width: "25px",
                                        backgroundColor: getColorForFeature(item),
                                        textAlign: "center",
                                        justifyContent: "center",
                                        display: "flex",
                                        border: "1px",
                                        borderRadius: "3px",
                                        color:"white"
                                    }}>{item?.line}</Typography></div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {item?.elements?.map((el, index) => {
                                    return <Accordion key={index} expanded={instance_expanded === index} onChange={handleChangeInstanceExpand(index)}>
                                        <AccordionSummary key={index} aria-controls="panel1d-content" id="panel1d-header">
                                            <Typography key={index} >{el?.name}</Typography><div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>{getColorForScenario(el)}</div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {el.steps?.map((st, index) => {
                                                return <>
                                                    <div key={index} style={{ display: "flex", flexDirection: "column" }}>
                                                        <div style={{ display: 'flex', width: "100%" }}>
                                                            <div style={{ width: "5%" }}>{getFlag(st?.result?.status)}</div>
                                                            <div style={{ width: "85%" }}>{st?.name}</div>
                                                            <div style={{ width: "10%" }}>{st?.result?.duration}</div>
                                                        </div>
                                                        <div>{st?.embeddings?.length > 0 ? <Button onClick={() => { setViewScreenShotFunc() }}>{"view screenshot"}</Button> : <></>}</div>
                                                        {st?.embeddings?.length > 0 ? <div style={{ width: "100%" }}>
                                                            {viewScreenShot ? <img src={"data:" + st?.embeddings[0]?.mime_type + ";base64," + st?.embeddings[0]?.data} alt="img"></img> : <></>}
                                                        </div> : <></>}
                                                    </div>
                                                </>
                                            })}
                                        </AccordionDetails>
                                    </Accordion>
                                })}
                            </AccordionDetails>
                        </Accordion>
                    })}
                </Grid>
            </Grid>
        </div>
    </>

}

