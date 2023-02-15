import React from "react";
import { InputField } from "../inputField";
import { Report } from "../reportConfiguration";
import { ThresholdConfiguration } from "../thresholdConfiguration";
import { AlertConfigurations } from "../alertConfigurations";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DrawerHeader } from "../drawerHeader";
import { useCreateProjectMutation } from '../../redux/services';
import { useSnackbar } from 'notistack';
import { useDispatch } from "react-redux";
import { refreshProjectListing } from "../../redux/slices/utils";
import { closeDrawer } from "../../redux/slices/drawer";
import { ValidateEmail } from "../../utils";

const styles = makeStyles((theme) => ({
    totalbox: {
        padding: "10px 20px",
    },
    head: {

    },
    totalcontent: {
        paddingTop: "70px"
    },
    snackbar: {

    },
    root: {
        '& .SnackbarContent-root': {
            background: 'red'
        }
    }
}));

export const AddProjectDrawer = () => {
    const InitialState = {
        project_name: '',
        project_description: '',
        dest: true,
        sast: true,
        performance_test: true,
        alert: false,
        cpu: 80,
        memory: 80,
        disk: 80,
        emailId: "",
        emailIds: [],
        error: {
            project_name: '',
            project_description: '',
            cpu: '',
            memory: '',
            disk: '',
            dest: '',
            sast: '',
            performance_test: '',
            emailId: ""
        }
    };

    // General Hooks
    const classes = styles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    // Component States
    const [state, setState] = React.useState({ ...InitialState });
    // Redux Hooks for API Integeration
    const [createProject, { isLoading, isError, isSuccess }] = useCreateProjectMutation();


    const onCreateProject = () => {
        if (validate()) {
            dispatch(createProject(
                {
                    "name": state.project_name,
                    "desc": state.project_description,
                    "need_testing": state.dest || state.sast || state.performance_test,
                    "sast": state.sast,
                    "dast": state.dest,
                    "performance": state.performance_test,
                    "need_usage_alert": state.alert,
                    "cpu_usage_threshold": state.cpu,
                    "disk_usage_threshold": state.disk,
                    "memory_usage_threshold": state.memory,
                    "alert_email": state.emailId
                }
            ))
        }
    }

    React.useEffect(() => {
        if (isSuccess) {
            enqueueSnackbar('New Project has been successfully created', { variant: "success", anchorOrigin: { horizontal: "center", vertical: "top" }, className: classes.snackbar, });
            dispatch(refreshProjectListing());
            dispatch(closeDrawer());
            setState({ ...InitialState });
        }
        // eslint-disable-next-line
    }, [isSuccess]);

    React.useEffect(() => {
        if (isError) {
            enqueueSnackbar("Something went wrong, Unable to create Project.", { variant: "error" })
        }
        // eslint-disable-next-line
    }, [isError]);

    const updateState = (key, value) => {

        let error = state.error;
        error[key] = "";

        const numType = ['cpu', 'memory', 'disk'];

        if (numType.includes(key)) {
            setState({ ...state, [key]: parseFloat(value), error });
        } else {
            setState({ ...state, [key]: value, error });
        }

    };

    const validate = () => {
        let isValid = true;
        let error = state?.error;
        //Checking email
        if (state.project_name.trim().length === 0) {
            isValid = false;
            error.project_name = "This field is mandatory";
        }
        setState({ ...state, error });
        return isValid;
    };

    const addEmail = () => {
        let isValid = true;
        let error = state?.error;

        //checking email validate
        if (!ValidateEmail(state?.emailId)) {
            isValid = false;
            error.emailId = "Invalid email";
            setState({ ...state, error });
            return false
        }
        if (isValid) {
            setState({ ...state, emailIds: [...state.emailIds, state.emailId.toLowerCase()], emailId: "" });
        }
    }

    const handleDelete = (res, index) => {
        let newEmailIds = state.emailIds;
        newEmailIds.splice(index, 1);
        setState({ ...state, emailIds: newEmailIds });
    }

    return (
        <Box className={classes.root}>

            {/*AddProjectHeader*/}
            <div className={classes.head}>
                <DrawerHeader title="Create project" btnName="Save" onSave={onCreateProject} isLoading={isLoading} />
            </div>

            {/*AddProjectContent*/}
            <div className={classes.totalcontent}>

                {/*ProjectName*/}
                <Box className={classes.totalbox} >
                    <InputField
                        label="Project Name"
                        placeholder=""
                        fullWidth
                        value={state.project_name}
                        onChange={(e) => updateState("project_name", e.target.value)}
                        helperText={state.error.project_name}
                        isError={state.error.project_name.length > 0}
                    />
                </Box>

                {/*DescriptionName*/}
                <Box className={classes.totalbox}>
                    <InputField
                        label="Project Description"
                        placeholder=""
                        fullWidth
                        isMulti
                        value={state.project_description}
                        helperText={state.error.project_description}
                        isError={state.error.project_description.length > 0}
                        onChange={(e) => updateState("project_description", e.target.value)}
                    />
                </Box>

                {/*ReportConfiguraion*/}
                <Box className={classes.totalbox}>
                    <Report
                        title="Report Configuration"
                        data={[
                            { title: "DAST", value: state.dest, key: "dest" },
                            { title: "SAST", value: state.sast, key: "sast" },
                            { title: "Performance Testing", value: state.performance_test, key: "performance_test" }
                        ]}
                        handleChange={updateState}
                    />
                </Box>

                {/*AlertConfiguraion*/}
                <Box className={classes.totalbox}>
                    <AlertConfigurations
                        title="Alerts Configuration"
                        handleChangeValue={state?.alert}
                        handleChange={(e) => updateState("alert", e.target.checked)}
                        label="Email ID"
                        placeholder="Enter your Email ID"
                        value={state.emailId}
                        helperText={state.error.emailId}
                        iserror={state.error.emailId.length > 0}
                        onChange={(e) => updateState("emailId", e.target.value)}
                        onClick={addEmail}
                        emailIds={state.emailIds}
                        handleDelete={handleDelete}
                    />
                </Box>

                {/*ThresholdConfiguration*/}
                <Box className={classes.totalbox}>
                    <ThresholdConfiguration dataAlert={[
                        { label: "Cpu", key: "cpu", value: state.cpu, helperText: state.error.cpu, placeholder: "Enter Here", isError: state.error.cpu.length > 0, type: "number" },
                        { label: "Memory", key: "memory", value: state.memory, helperText: state.error.memory, placeholder: "Enter Here", isError: state.error.memory.length > 0, type: "number" },
                        { label: "Disk", key: "disk", value: state.disk, helperText: state.error.disk, placeholder: "Enter Here", isError: state.error.disk.length > 0, type: "number" }

                    ]}
                        handleChange={updateState} />
                </Box>
            </div>

        </Box>
    )
} 
