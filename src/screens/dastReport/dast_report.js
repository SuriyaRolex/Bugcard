
import React from 'react'
import { makeStyles } from "@mui/styles";
import { Box, Container, Grid, Typography, CircularProgress } from '@mui/material';
import { ProgressBar, AutocompleteCmp } from '../../components';
import { TopNavBar } from "../../components";
// import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useLazyDASTReportQuery } from "../../redux/services";

import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';



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
    }, aicon: {
        fontSize: "17px",
        margin: "-5px 5px",
    },
    issues: {
        padding: "0px 6px"
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
    applicationSx: {
        fontSize: "16px",
        fontweight: "500",
        color: "#000",
        paddingTop: "12px",
        paddingLeft: "32px",
      },
}))

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
            : 'rgba(0, 0, 0, .03)',
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

export const DASTReport = () => {

    const classes = useStyles();
    // const dispatch = useDispatch();

    // Component States
    let { application_id } = useParams();

    const [DASTDATA, setDASTData] = React.useState(null);
    const [isLoading, setisLoading] = React.useState(true);
    const [isError, setisError] = React.useState(false);
    const [DASTReport, ...DASTReportParams] = useLazyDASTReportQuery();



    const [DASTFilterValue, setDASTFilterValue] = React.useState(null);
    const [ACCDATA, setACCDATA] = React.useState([]);

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [instance_expanded, setInstanceExpanded] = React.useState('panel1');

    const handleChangeInstanceExpand = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setInstanceExpanded(newExpanded ? panel : false);
    };

    const riskcode = DASTDATA?.data?.site[0]?.alerts?.map((i) => { return i?.riskcode });

    const Informational_Medium_riskcode = riskcode?.filter((i) => { return i === "0" })?.length;

    const Low_riskcode = riskcode?.filter((i) => { return i === "1" })?.length;

    const Medium_riskcode = riskcode?.filter((i) => { return i === "2" })?.length;

    const high_riskcode = riskcode?.filter((i) => { return i === "3" })?.length;

    const onChangeBDD = (e, Newval) => {
        setDASTFilterValue(Newval);
    }

    React.useEffect(() => {
        setACCDATA(DASTDATA?.data?.site[0]?.alerts?.filter((i) => { if (DASTFilterValue === null) { return i } else { return i?.riskcode === DASTFilterValue?.value } }))
        // eslint-disable-next-line
    }, [DASTDATA?.data?.site[0]?.alerts, DASTFilterValue, ACCDATA])


    const getDASTData = async () => {

        let dataDAST = await DASTReport({ application_id: application_id })

        setDASTData(dataDAST?.data)
        setisError(DASTReportParams[0]?.isError)
        setisLoading(DASTReportParams[0]?.isLoading)

    }

    React.useEffect(() => {
        getDASTData();
        // eslint-disable-next-line
    }, [application_id])

    return <>
        <TopNavBar
        isDownloadRefreshRequired
            showTopLeftNav={true}
            primaryText={DASTDATA?.data?.site[0]["@host"] ? DASTDATA?.data?.site[0]["@host"] : (isLoading ? "Loading...!" : "report not available!")}
            secondaryText={"host"} />
        <div className={classes.root}>
            {(isError === false) && (isLoading === false) && (DASTDATA !== (null || undefined)) && <div>

                <Typography className={classes.applicationSx}>
                Applicatican Name V2
              </Typography>
                {/* //Health-BG */}
                <Box className={classes.instancebg} sx={{ padding: "50px" }}></Box>

                {/* //ProgressBar */}
                <Box className={classes.progressbar}>
                    <Container className={classes.container} sx={{ width: "100%", maxWidth: "95%" }}>
                        <Box sx={{ display: "flex" }}>
                            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 8, md: 12 }} sx={{ padding: "20px" }}>
                                <Grid item xs={2} sm={4} md={3}>
                                    <ProgressBar title={'Informational'} countBar={Informational_Medium_riskcode} type={"countBar"} />
                                </Grid>
                                <Grid item xs={2} sm={4} md={3}>
                                    <ProgressBar title={'Low risk'} countBar={Low_riskcode} type={"countBar"} />
                                </Grid>
                                <Grid item xs={2} sm={4} md={3}>
                                    <ProgressBar title={'Medium risk'} countBar={Medium_riskcode} type={"countBar"} />
                                </Grid>
                                <Grid item xs={2} sm={4} md={3}>
                                    <ProgressBar title={'high risk'} countBar={high_riskcode} type={"countBar"} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Box>

                {/* //addInstance */}
                <Box sx={{ padding: '35px 35px' }}>
                    <>
                        {<div style={{ display: 'flex', width: "100%", alignItems: 'flex-end', justifyContent: 'end' }}>
                            <div style={{ padding: "20px" }}>
                                <AutocompleteCmp
                                    // multiple={true}
                                    limitTags={2}
                                    id={"BDD_filter"}
                                    value={DASTFilterValue}
                                    onChange={onChangeBDD}
                                    options={[{ label: "Informational", value: "0" }, { label: "Low risk", value: "1" }, { label: "Medium risk", value: "2" }, { label: "High risk", value: "3" }]}
                                    label={"Risk filter"}
                                    placeholder={"select filter"}
                                    width={"320px"}
                                />
                            </div>
                        </div>}



                        {ACCDATA?.length > 0 && ACCDATA?.map((item, index) => {

                            return <Accordion expanded={expanded === index} onChange={handleChange(index)}>
                                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                    <Typography>{item?.alert + " "}</Typography><Avatar sx={{ width: item?.instances?.length > 99 ? 24 : 20, height: item?.instances?.length > 99 ? 24 : 20 }} style={{ fontSize: item?.instances?.length > 99 ? "10px" : "13px", marginLeft: "5px", marginTop: "3px" }}>{item?.instances?.length}</Avatar>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {item?.instances?.map((instance, index) => {
                                        return <Accordion expanded={instance_expanded === index} onChange={handleChangeInstanceExpand(index)}>
                                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                                <Typography>{"Instance " + index}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>

                                                <div className={classes.parentDiv}>

                                                    <div className={classes.parentDiv1}>
                                                        <div className={classes.instanceContentHeadingsDiv}><Typography variant="subtitle2" className={classes.instanceContentHeadings}>{"Uri"}</Typography> </div>
                                                        <div className={classes.instanceContentHeadingsDiv}><Typography variant="subtitle2" className={classes.instanceContentHeadings}>{"Evidence"}</Typography> </div>
                                                        <div className={classes.instanceContentHeadingsDiv}><Typography variant="subtitle2" className={classes.instanceContentHeadings}>{"Otherinfo"}</Typography> </div>
                                                        <div className={classes.instanceContentHeadingsDiv}><Typography variant="subtitle2" className={classes.instanceContentHeadings}>{"Reference INFO"}</Typography> </div>
                                                        <div className={classes.instanceContentHeadingsDiv}><Typography variant="subtitle2" className={classes.instanceContentHeadings}>{"solution"}</Typography> </div>
                                                    </div>

                                                    <div className={classes.parentDiv2}>
                                                        <div className={classes.instanceContentDiv}><Typography variant="body2" className={classes.instanceContent}><a href={instance?.uri}>{instance?.uri}</a></Typography> </div>
                                                        <div className={classes.instanceContentDiv}><Tooltip title={instance?.evidence} placement="top"><Typography variant="body2" className={classes.instanceContent}>{instance?.evidence}</Typography></Tooltip> </div>
                                                        <div className={classes.instanceContentDiv}><Tooltip title={item?.otherinfo ? item?.otherinfo : "-"} placement="top"><Typography variant="body2" className={classes.instanceContent}>{item?.otherinfo ? item?.otherinfo : "-"}</Typography></Tooltip> </div>
                                                        <div className={classes.instanceContentDiv}><Tooltip title={item?.reference ? item?.reference : "-"} placement="top"><Typography variant="body2" className={classes.instanceContent}>{item?.reference ? item?.reference : "-"}</Typography></Tooltip> </div>
                                                        <div className={classes.instanceContentDiv}><Tooltip title={item?.solution ? item?.solution : "-"} placement="top"><Typography variant="body2" className={classes.instanceContent}>{item?.solution ? item?.solution : "-"}</Typography></Tooltip></div>
                                                    </div>

                                                </div>
                                            </AccordionDetails>
                                        </Accordion>

                                    })}
                                </AccordionDetails>
                            </Accordion>

                        })}


                    </>
                </Box>
            </div>}
        </div>
        {(isError === false) && (isLoading === true) && (DASTDATA === null) && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90%" }}><CircularProgress color="inherit" /></div>}
        {(isError === true) && (isLoading === false) && (DASTDATA === null) && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90%" }}>{"OOPS Something Went Wrong !"}</div>}
        {(isError === false) && (isLoading === false) && (DASTDATA === (null || undefined)) && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90%" }}>{"NO DATA AVAILABLE !"}</div>}
    </>

}

