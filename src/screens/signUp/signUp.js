import React from "react";
import { Typography, Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormHeader, InputField, PasswordField, FormFooter, MobileNumberInputComponent, SuccessModal } from "../../components";
import { ValidateEmail } from "../../utils"
import { AppRoutes } from "../../router/routes";
import { useSignUpMutation } from "../../redux/services/auth";
import { useDispatch } from "react-redux";

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
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 8px 69px #0000001A",
        borderRadius: 16,
        padding:24,
        margin:24
    }
}));

export const SignUp = (props) => {

    const InitialState = {
        name: "",
        companyname: "",
        country_code: "",
        mobile_no: "",
        email_id: "",
        password: "",
        confirm_password:"",
        error: {
            name: "",
            companyname: "",
            country_code: "",
            mobile_no: "",
            email_id: "",
            password: "",
            confirm_password:""
        },
        showSuccessModal: false
    };

    const classes = useStyles();
    const dispatch = useDispatch();
    const [data, setData] = React.useState({ ...InitialState });


    const [signUp, { isLoading, isError, isSuccess, error: signUpResponse }] = useSignUpMutation();

    const updateState = (key, value) => {
        let error = data.error;
        error[key] = "";
        setData({ ...data, [key]: value, error });
    };

    const validate = () => {
        let isValid = true;
        let error = data?.error;
        // checking Name
        if (data.name.length === 0) {
            isValid = false;
            error.name = "Name is required";
        }
        // checking Company Name
        if (data.companyname.length === 0) {
            isValid = false;
            error.companyname = "Company Name is required";
        }
        // checking mobile number
        if (data.mobile_no.length === 0) {
            isValid = false;
            error.mobile_no = "Mobile Number is required"
        }
        //Checking email
        if (data.email_id.length === 0) {
            isValid = false;
            error.email_id = "Email is required";
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
//Checking Confirm password
        if(data.confirm_password.length === 0 ){
            isValid = false;
            error.confirm_password = " Confirm password is required"
        }
        if(data.password !== data.confirm_password){
            isValid = false;
            error.confirm_password = "password does not matching"
        }

        setData({ ...data, error });
        return isValid;
    };

    const SignUp = () => {
        if (validate()) {
            let loginData = {
                name: data?.name,
                mobile_no: data?.mobile_no?.mobile,
                country_code: parseInt(data?.mobile_no?.mobile_code?.substr(1)),
                email_id: data?.email_id,
                password: data?.password,
            }
            //execute result
            dispatch(signUp(loginData));
        } else {
            return false;
        }
    };

    React.useEffect(() => {
        if (isSuccess) {
            setData({ ...data, showSuccessModal: true });
        }
        // eslint-disable-next-line
    }, [isSuccess])

    return <div className={classes.root}>
        {/* Automatly Title */}
        <Typography variant="h6" className={classes.title}>Automatly</Typography>

        {/* Center Card */}
        {data.showSuccessModal ?
            <SuccessModal
                para="Your Automatly account has been created cuccessfully!!!!"
                linkedtext="Sign In"
                btntext="Already have an account?"
                link={AppRoutes.login}
            />
            : <>
                <Container maxWidth="md" className={classes.centercard} >
                    
                          {/*SignUP  */}
        <FormHeader title="Sign Up" />

            <Grid container>
                <Grid xs={6} padding={1}>
                    {/* Name */}
                    <InputField
                            helperText={data?.error?.name}
                            isError={data?.error?.name?.length > 0}
                            value={data?.name}
                            onChange={(e) => updateState("name", e.target.value)}
                            isRequired
                            fullWidth
                            placeholder="Please Enter Your Name"
                            label="Name" 
                    />
                </Grid>

                    {/* Company Name */}
                    <Grid xs={6} padding={1}>
                        <InputField
                            helperText={data?.error?.companyname}
                            isError={data?.error?.companyname?.length > 0}
                            value={data?.companyname}
                            onChange={(e) => updateState("companyname", e.target.value)}
                            isRequired
                            fullWidth
                            placeholder="Please Enter Your Company Name"
                            label="Company Name" />
                            </Grid>
                    </Grid>

                  
                    <Grid container>
                        <Grid xs={6} padding={1}>

                             {/* Mobile No.*/}
                            <MobileNumberInputComponent
                            helperText={data?.error?.mobile_no}
                            isError={data?.error?.mobile_no?.length > 0}
                            value={data?.mobile_no}
                            handleChange={(e) => updateState("mobile_no", e)}
                            fullWidth
                            isRequired
                            placeholder="Please Enter Your Mobile Number"
                            label="Mobile Number"
                            />
                        </Grid>

                        {/* Email */}
                        <Grid xs={6} padding={1}>
                            <InputField
                            helperText={data?.error?.email_id}
                            isError={data?.error?.email_id?.length > 0}
                            value={data?.email_id}
                            onChange={(e) => updateState("email_id", e.target.value)}
                            isRequired
                            fullWidth
                            placeholder="Please Enter Your Email"
                            label="Email ID"
                            />
                        </Grid>
                    </Grid>

                        <Grid container>
                            <Grid xs={6} padding={1}>

                             {/* PasswordField */}
                            <PasswordField
                            helperText={data?.error?.password}
                            isError={data?.error?.password?.length > 0}
                            value={data?.password}
                            onChange={(e) => updateState("password", e.target.value)}
                            isRequired
                            fullWidth
                            placeholder="Please Enter Your Password"
                            label="Password"
                            />
                            </Grid>

                        {/*Confirm PasswordField */}
                        <Grid xs={6} padding={1}>
                            <PasswordField
                            helperText={data?.error?.confirm_password}
                            isError={data?.error?.confirm_password?.length > 0}
                            value={data?.confirm_password}
                            onChange={(e) => updateState("confirm_password", e.target.value)}
                            isRequired
                            fullWidth
                            placeholder="Please Enter Your Confirm Password"
                            label=" Confirm Password"
                            />
                        </Grid>
            </Grid>
                        
                         {/* error & Success msg  */}
                        {(isError && !isLoading) && <Typography variant="body2" color="error" >
                            {signUpResponse.data.message}
                        </Typography>} 

                        {/* btn & SignIn */}
                        <FormFooter isLoading={isLoading} isError={isError} isSuccess={isSuccess} onClick={SignUp} btnName="Sign Up" footerText="Already have an account?" linkText="Sign In" link={AppRoutes.login} />

                    {/* </Stack> */}
                </Container>
            </>}
    </div>
}
