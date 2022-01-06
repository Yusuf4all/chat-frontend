import React, { useContext, useState } from "react";
import AuthenticationHeader from "./authenticationHeader";
import { Typography, TextField, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import GoogleButton from "../../../common/component/googleButton";
import FacebookButton from "../../../common/component/facebookButton";
import { Link } from "@reach/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../../common/validation/authenticationSchemas";
import {
  signIn,
  verifyEmail,
  verifyOTP,
} from "../../../store/authentication/authenticationAction";
import { AuthenticationStore } from "../../../store/authentication/authenticationStore";
import ActionButton from "../../../common/component/actionButton";
import VerifyEmailModal from "../modals/verifyEmailModal";
import VerifyOTPModal from "../modals/verifyOTPModal";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    width: "500px",
    margin: "auto",
    position: "relative",
  },
  form: {
    width: "100%",
    padding: "30px",
    background:
      "linear-gradient(142.13deg, rgba(254, 248, 255, 0.21) 1.8%, rgba(254, 248, 255, 0) 99.75%)",
    borderRadius: "25px",
    border: "3px solid #6B5E9E",
    zIndex: "10",
    backdropFilter: "blur(30px)",
  },
  formInputControl: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  },

  formFooter: {
    marginTop: "10px",
    fontSize: "16px",
    "& a": {
      color: "#E54348",
      textDecoration: "none",
    },
  },
  formForgot: {
    fontSize: "14px",
    "& a": {
      color: "#E54348",
      textDecoration: "none",
    },
  },
  topCircle: {
    height: " 160px",
    width: " 160px",
    backgroundColor: " red",
    position: "absolute",
    borderRadius: " 50%",
    top: "60px",
    right: "-55px",
    background: "linear-gradient(232.74deg, #FA5D6B 19.9%, #ED078A 81.45%)",
  },
  bottomCircle: {
    height: " 160px",
    width: " 160px",
    backgroundColor: " red",
    position: "absolute",
    borderRadius: " 50%",
    bottom: "60px",
    left: "-55px",
    background: "linear-gradient(232.74deg, #BE29F7 19.9%, #FB25CC 81.45%)",
  },
}));

function Signin() {
  const classes = useStyle();
  // ================= Validation resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(signInSchema),
  });

  // ========== Context =====
  const { authenticationStore, authenticationDispatch } =
    useContext(AuthenticationStore);

  // ========== User defined state  =========
  const [isVerificationCodeSend, setVerificationModal] = useState(false);
  const [isEmailModalOpen, setEmailModal] = useState(false);
  const [facebookResponse, setFacebookResponse] = useState({});
  const [userEmail, setUserEmail] = useState("");

  const creatSignUpSchema = (data, type) => {
    return {
      First_Name: data?.First_Name,
      Last_Name: data?.First_Name,
      Email: data?.Email,
      Password: data?.Password,
      Phone_Number: data?.Phone_Number,
      Authentication_Type: type,
      Token: data?.tokenId || data?.accessToken,
      Facebook_ID: data?.userID,
    };
  };

  const handleEmailModal = () => {
    setEmailModal(false);
  };

  const handleOTPModal = () => {
    setVerificationModal(false);
  };

  const handeleSendVeificationCode = async (email) => {
    if ((email, facebookResponse)) {
      setUserEmail(email);
      const USER_DATA = {
        Email: email,
        Facebook_ID: facebookResponse?.userID,
      };
      const response = await verifyEmail(USER_DATA, authenticationDispatch);
      if (response?.Data) {
        setEmailModal(false);
        setVerificationModal(true);
      }
    }
  };

  const handeleSubmitVeificationCode = async (otp) => {
    if (otp) {
      const USER_DATA = {
        Authentication_Type: "FACE_BOOK",
        Token: facebookResponse.accessToken,
        Facebook_ID: facebookResponse.userID,
        Email: userEmail,
        OTP: otp,
      };
      const response = await verifyOTP(USER_DATA, authenticationDispatch);
      if (response?.Message) setVerificationModal(false);
    }
  };

  const responseGoogle = (response) => {
    signIn(creatSignUpSchema(response, "GOOGLE"), authenticationDispatch);
  };

  const responseFacebook = (response) => {
    if (response?.email) {
      signIn(creatSignUpSchema(response, "FACE_BOOK"), authenticationDispatch);
    } else {
      setFacebookResponse(response);
      setEmailModal(true);
    }
  };

  const handleOnSubmit = (data) => {
    const USER_DATA = {
      Email: data.Email,
      Password: data.Password,
      Authentication_Type: "MANUAL",
    };
    signIn(USER_DATA, authenticationDispatch);
  };
  return (
    <React.Fragment>
      <Box className={classes.container}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className={classes.form}>
          <AuthenticationHeader title="Sign in to your account" />
          <Box className={classes.formInputControl}>
            <label>Email Address</label>

            <TextField
              type="email"
              name="Email"
              {...register("Email")}
              size="small"
              error={errors?.Email}
              helperText={errors?.Email?.message}
            />
          </Box>

          <Box className={classes.formInputControl}>
            <label>Password</label>
            <TextField
              type="password"
              name="Password"
              {...register("Password")}
              size="small"
              error={errors?.Password}
              helperText={errors?.Password?.message}
            />
          </Box>
          <Box>
            <Typography className={classes.formForgot}>
              <Link to="/auth/forgot-password"> Forgot Password?</Link>
            </Typography>
          </Box>

          <Box className={classes.formInputControl}>
            <ActionButton buttonText="SIGN IN" />
          </Box>

          <Box className={classes.formInputControl}>
            <GoogleButton
              label="Sign In with Google"
              responseGoogle={responseGoogle}
            />
          </Box>

          <Box className={classes.formInputControl}>
            <FacebookButton
              label="Sign In with Facebook"
              responseFacebook={responseFacebook}
            />
          </Box>
          <Box className={classes.formInputControl}>
            <Typography variant="subtitle2" className={classes.formFooter}>
              Create Account <Link to="/auth/sign-up">SignUp</Link>
            </Typography>
          </Box>
        </form>

        <VerifyEmailModal
          isEmailModalOpen={isEmailModalOpen}
          handleEmailModal={handleEmailModal}
          handeleSendVeificationCode={handeleSendVeificationCode}
        />

        <VerifyOTPModal
          isOTPModalOpen={isVerificationCodeSend}
          handleOTPModal={handleOTPModal}
          handeleSubmitVeificationCode={handeleSubmitVeificationCode}
        />
        <Box className={classes.topCircle}></Box>
        <Box className={classes.bottomCircle}></Box>
      </Box>
    </React.Fragment>
  );
}
export default Signin;
