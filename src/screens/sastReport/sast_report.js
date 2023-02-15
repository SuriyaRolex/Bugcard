import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BugIcon } from "../../assets/icon";
import { LockIcon } from "../../assets/lockIcon";
import { ModeIcon } from "../../assets/modeIcon";
import { ProtectIcon } from "../../assets/protect";
import StatCard from "../../components/cards";
import Chart from "../../components/chartComponent/chartComponent";
import CodeSmall from "../../components/codeSmall";
import { DataTabs } from "../../components/dataTabs";
import Issues from "../../components/issues/issues";
import { TopNavBar } from "../../components/navBars/topNavbar";
import { useSASTReportQuery } from "../../redux/services";
import { colorCodes, numberToEncodedLetter, numberToText } from "../../utils";
import { bugStyle } from "./style";



export const SASTReport = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [open, setOpen] = useState(true);


  let { application_id } = useParams();
  const { data, refetch: SASTReport } = useSASTReportQuery({application_id:application_id});

  const handleClick = () => {
    setOpen(false);
  };

const filteredData=[
{key:"bugs",icon: <BugIcon/>,card_key:"bugs",color:"#BF0F9C",metric_key: "reliability_rating"},
{key:"vulnerabilities",card_key:"vulnerabilities", icon: <LockIcon/>, color:"#4A0FBF",metric_key: "security_rating"},
{key:"code_smells",card_key:"code_smells",icon: <ModeIcon/>,color:"#0F9CBF",metric_key: "sqale_rating"},
{key:"security_hotspots",card_key:"security_hotspots",s_key:"security_hotspots_reviewed",metric_key: "security_review_rating",icon:<ProtectIcon/>,color:"#0F9CBF",subTitle:"Reviewed"},
];


const response= filteredData.map(_item=>{
  const m =data?.data?.component?.measures?.find(c=>c.metric===_item?.metric_key)
  const value =data?.data?.component?.measures?.find(c=>c.metric===_item?.card_key)
return {
  ...data?.data?.metrics?.find(c=>c.key===_item?.key),

  metricData: m ?numberToEncodedLetter(parseInt(m?.value)):"",
  BackgroundColor: m ?colorCodes[numberToEncodedLetter(parseInt(m?.value))]?.BackgroundColor:"",
  Color: m ?colorCodes[numberToEncodedLetter(parseInt(m?.value))]?.Color:"",
  [_item?.s_key]:data?.data?.metrics?.find(c=>c.key===_item?.s_key),
  cardValue :value?.value,
  icon:_item.icon,
  color:_item?.color,
  subTitle:_item?.subTitle
}
})


const filtereDublicatedData=[
  {d_key:"duplicated_blocks",prs:"duplicated_lines_density",value:"duplicated_blocks",ncloc:"ncloc",color: "#0063E7",}
];

const dublicatedResponce = filtereDublicatedData.map(item=>{

  const dublicate_value = data?.data?.component?.measures?.find(child=>child.metric === item?.value)
  const dublicate_prs = data?.data?.component?.measures?.find(child=>child.metric === item?.prs)
  const dublicate_ncloc = data?.data?.component?.measures?.find(child=>child.metric === item?.ncloc)

  return{
    ...data?.data?.metrics?.find(child=>child.key === item?.d_key),

    dublicateValue : dublicate_value?.value,
    dublicatePrs : dublicate_prs?.value,
    dublicateNcloc : dublicate_ncloc? [numberToText(parseInt(dublicate_ncloc?.value))] : "",
    color:item?.color


  }
})

console.log(dublicatedResponce,"dublicaredResponce");

console.log('response',response)
  const tabs = [
    {
      label: <Typography variant="body2" gutterBottom component="div" sx={{ fontFamily: "crayond_semibold", fontSize: "14px", textTransform: "capitalize" }}>Overview</Typography>,
      value: 1,
      body: (
        <div>
          <Box sx={bugStyle.outSX }>
            <Grid container spacing={1.8}>
              {response.map((val, i) => (
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <StatCard
                   {...val}
                  />
                </Grid>
              ))}
              <Grid item xs={12} mt={1}>
                <Chart dublicatedResponce={dublicatedResponce}/>
              </Grid>
            </Grid>
          </Box>
        </div>
      ),
    },
    {
      label: <Typography variant="body2" gutterBottom component="div" sx={{ fontFamily: "crayond_semibold", fontSize: "14px", textTransform: "capitalize" }}>Issues</Typography>,
      value: 2,
      body: (
        <div>
          {/* <VerBar issueData={issueData} /> */}
          <Box>
            {open ? (
              <Issues handleClick={handleClick} />
            ) : (
              <CodeSmall setOpen={setOpen} />
            )}
          </Box>
        </div>
      ),
    },
  ];


  React.useEffect(()=>{
    SASTReport()
     },[])


     const giveMeTopNavbarPrimaryText = () => {
      return "SAST Report";
    };

  return (
    <>
      <TopNavBar
              isDownloadRefreshRequired
              showActionBtn={false}
              showTopLeftNav={true}
      primaryText={giveMeTopNavbarPrimaryText()}
      secondaryText={"Applications"}/>
      <Box
        sx={{ paddingTop: "75px", }}
      >
        <DataTabs
          tabs={tabs}
          activeTab={activeTab}
          handleChangeTab={(val) => setActiveTab(val)}
        />
      </Box>
    </>
  );
};
