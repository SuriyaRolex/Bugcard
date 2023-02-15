import { Typography, Container, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormHeader, InputField, PasswordField, FormFooter } from "../../components"
import { useLoginMutation } from "../../redux/services/auth";
import { AppRoutes } from "../../router/routes";
import { ValidateEmail } from "../../utils"

const useStyles = makeStyles((theme) => ({
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
    forgotpassword:{
       cursor:'pointer'
    }
    
}));

const InitialState = {
    email_id: "",
    password: "",
    error: {
        email_id: "",
        password: ""
    }
};

export const Login = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = React.useState({ ...InitialState });

    const [logIn, { isLoading, isError, isSuccess, }] = useLoginMutation();

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
        //Checking password
        if (data.password.length === 0) {
            isValid = false;
            error.password = "Password is required";
        }

        setData({ ...data, error });
        return isValid;
    };

    const forgotPassword=()=>{
        navigate(AppRoutes.forgotPassword)
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
        {/* Automatly Title */}
        <Typography variant="h6" className={classes.title}>Automatly</Typography>

        {/* Center Card */}
        <Container maxWidth="xs">
            <Stack spacing={2} className={classes.centercard}>

                {/*SignUP  */}
                <FormHeader title="Sign In" subTitle="Sign In with your email and password" />

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

                {/* PasswordField */}
                <PasswordField
                    helperText={data?.error?.password}
                    isError={data?.error?.password?.length > 0}
                    value={data?.password}
                    onChange={(e) => updateState("password", e.target.value)}
                    label="Password"
                    isRequired
                    fullWidth
                    placeholder="Please Enter Your Password"
                />
                
                <Typography  className={classes.forgotpassword} textAlign="right" variant="body2" color="textSecondary"onClick={forgotPassword}> Forgot Password? </Typography> 
               
                {/* Error Message */}
                {(isError && !isLoading) && <Typography variant="body2" color="error" >
                    {"Invalid Credentials"}
                </Typography>}

                {/* btn & SignIn */}
                <FormFooter isLoading={isLoading} onClick={SignIn} btnName="Sign In" footerText="Don't have an account?" linkText="Sign Up" link={AppRoutes.signUp} />

            </Stack>
        </Container>
    </div>
}
