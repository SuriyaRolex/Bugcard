import React from "react";
import { makeStyles } from "@mui/styles";
import { AppRoutes } from "../../router/routes";
import { ValidateEmail } from "../../utils";
import { FormHeader, InputField, FormFooter } from "../../components"
import { Container, Stack, Typography } from "@mui/material";
import { useLoginMutation } from "../../redux/services/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles ((theme) => ({
    root: {
        backgroundImage: "url('/images/jpg/signInSignUpBg.png')", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center", backgroundSize: "cover"
    },
    title: {
        top: 16, left: 16,
        fontFamily: "crayond_medium",
        position: "absolute"
    },
    centercard: {
        backgroundColor: theme.palette.background.default,
        boxShadow: "0px 8px 69px #0000001A",
        borderRadius: 16,
        padding: 24,
        margin: 24
    },
}));

const InitialState ={
    email_id:"",
    error: {
      email_id:"",
    }
}

export const ForgotPassword = (props) => {

    const classes = useStyles();
    const [data, setData] = React.useState({...InitialState});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logIn, { isLoading, isSuccess, }] = useLoginMutation();

   
    const updateState = (key, value) => {
        let error = data.error;
        error[key] = "";
        setData({ ...data, [key]: value, error });
    };

    const validate = () => {
        let isValid = true;
        let error = data?.error;
        //Checking email
        if (data.email_id.length === 0) {
            isValid = false;
            error.email_id = "Email is Required";
        }
        //validate email
        if (data.email_id.length > 0 && !ValidateEmail(data?.email_id)) {
            isValid = false;
            error.email_id = "Invalid email";
        }

        setData({ ...data, error });
        return isValid;
    };

    const SignIn = () => {
        if (validate()) {
            dispatch(logIn(data));
        } else {
            return false;
        }
    };

    React.useEffect(() => {
        if (isSuccess) {
            navigate(AppRoutes.home);
        }
    }, [isSuccess, navigate])

    
    return <div className={classes.root}>

<Typography variant="h6" className={classes.title}>Automatly</Typography>

    
        {/* Center Card */}
        <Container maxWidth="xs">
            <Stack spacing={2}  className={classes.centercard}>

                {/*SignUP  */}
                <FormHeader title="Forgot Password" subTitle="please provide your registered Email ID to proceed further" />

                {/* Email */}
                <InputField
                    helperText={data?.error?.email_id}
                    isError={data?.error?.email_id?.length > 0}
                    value={data?.email_id}
                    onChange={(e) => updateState("email_id", e.target.value)}
                    label="Email ID"
                    isRequired
                    fullWidth
                    placeholder="Please Enter Your Email"
                />

              

                {/* Error Message
                {(isError && !isLoading) && <Typography variant="body2" color="error" >
                    {"Invalid Credentials"}
                </Typography>} */}

                {/* btn & SignIn   */}
                <FormFooter isLoading={isLoading} onClick={SignIn} btnName="Send OTP" footerText="Back to" linkText="Sign In" link={AppRoutes.login} />

            </Stack>
        </Container>
    </div>
}