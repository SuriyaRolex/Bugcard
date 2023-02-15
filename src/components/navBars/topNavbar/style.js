import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        zIndex: theme.zIndex.drawer + 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    title: {
        display: 'block',
    },
    titleContainer: {
        marginLeft: theme.spacing(2)
    },
    menuIcon: {
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    header: {
        textAlign: "left",
        color: "#18283E",
        fontFamily: "crayond_Bold",
        fontSize: "20px"
    },
    profile: {
        textAlign: "right",
        color: "#18283E",
        fontFamily: "crayond_Bold",
        display: "flex",
        alignItems: "center",
        fontSize: "18px",
        cursor: "pointer",
        justifyContent: "space-between"
    },
    automatly: {
        textAlign: "center",
        color: "#18283E",
        fontFamily: "crayond_Bold",
        fontSize: "20px"
    },
    card: {
        // boxShadow: "0px 5px 4px #00000029",
        boxShadow: "0px -6px 8px 5px #00000014",
        backGround: "#FFFFFF 0% 0% no-repeat padding-box",
        backgroundColor:"#fff",
        position:"fixed",width:"100%",zIndex:"999",
        display: 'flex',
        justifyContent: 'space-between',
        padding: "11px 24px",
        alignItems: "center",


    },
    dropdown: {
        color: "#000",
        display: "flex",
        justifyContent: "space-between",
        marginLeft: 0,
        fontSize: "18px",
        fontFamily: "crayond_medium",
        alignItems: "center",
    },
    Menu: {
        marginTop: 10,
        "& .MuiList-root": {
            padding: "4px"
        },
        "& .MuiPopover-paper": {
            borderRadius: "8px"
        },
    },
    projects: {
        borderBottom: "1px solid #00000029",
        padding: "10px"
    },
    logout: {
        padding: "10px"
    },
    move: {
        marginLeft: 10
    },
    icon: {
        padding: "0px 0px",
        marginLeft: 0,

    },
    profileicon: {
        width: "30px",
        height: "30px",
        margin: "0px 5px",
        padding: "2px 2px",
        "&:hover":{
            color:"#0065e6"
        }

    },
    downloadbtnSx:{
        backgoundColor:'#0063E7'
    },
    iconSx:{
        color:'#0063E7'
    }
}));