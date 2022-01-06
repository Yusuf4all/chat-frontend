import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import AuthenticationHeader from "./authenticationHeader";
import { Typography } from "@mui/material";
import GoogleButton from "../../../common/component/googleButton";
import FacebookButton from "../../../common/component/facebookButton";
import { Link } from "@reach/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../../common/validation/authenticationSchemas";
import {
  signUp,
  verifyEmail,
  verifyOTP,
} from "../../../store/authentication/authenticationAction";
import { AuthenticationStore } from "../../../store/authentication/authenticationStore";
import ActionButton from "../../../common/component/actionButton";
import VerifyEmailModal from "../modals/verifyEmailModal";
import VerifyOTPModal from "../modals/verifyOTPModal";

const useStyle = makeStyles((theme) => ({
  formInputControl: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  },
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    width: "500px",
    margin: "auto",
    position: "relative",
  },

  form: {
    zIndex: 1,
    backdropFilter: "blur(30px)",
    width: "100%",
    boxShadow: "rgb(0 0 0 / 25%) 0px 14px 28px, rgb(0 0 0 / 22%) 0px 10px 10px",
    padding: "30px",
    borderRadius: "25px",
    background:
      "linear-gradient(142.13deg, rgba(254, 248, 255, 0.21) 1.8%, rgba(254, 248, 255, 0) 99.75%)",
  },

  formFooter: {
    marginTop: "10px",
    fontSize: "16px",
    "& a": {
      color: "#5072bd",
      textDecoration: "none",
    },
  },

  input: {
    color: "white",
    padding: "10px 0px 5px 0px",
  },

  noBorder: {
    border: "none",
    borderBottom: "1px solid #ffff !important",
    borderRadius: "0",
  },

  nameWraperStyle: {
    display: "flex",
    justifyContent: "space-between",
  },

  topCircle: {
    height: " 160px",
    width: " 160px",
    backgroundColor: " red",
    position: "absolute",
    borderRadius: " 50%",
    top: "10px",
    right: "-55px",
    background: "linear-gradient(232.74deg, #FA5D6B 19.9%, #ED078A 81.45%)",
  },
  bottomCircle: {
    height: " 160px",
    width: " 160px",
    backgroundColor: " red",
    position: "absolute",
    borderRadius: " 50%",
    bottom: "10px",
    left: "-55px",
    background: "linear-gradient(232.74deg, #BE29F7 19.9%, #FB25CC 81.45%)",
  },
}));

function SignUp() {
  const classes = useStyle();

  //=====================> Validation resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(signUpSchema),
  });
  // ==================> Context
  const { authenticationDispatch } = useContext(AuthenticationStore);

  // ===============> User Defined State
  const [isEmailModalOpen, setEmailModal] = useState(false);
  const [isVerificationCodeSend, setVerificationModal] = useState(false);
  const [facebookResponse, setFacebookResponse] = useState({});
  const [userEmail, setUserEmail] = useState("");

  const creatSignUpSchema = (data, type) => {
    return {
      First_Name: data?.First_Name,
      Last_Name: data?.Last_Name,
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

  const responseFacebook = (response) => {
    if (response?.email) {
      signUp(creatSignUpSchema(response, "FACE_BOOK"), authenticationDispatch);
    } else {
      setFacebookResponse(response);
      setEmailModal(true);
    }
  };

  const responseGoogle = (response) => {
    signUp(creatSignUpSchema(response, "GOOGLE"), authenticationDispatch);
  };

  const handleOnSubmit = (data) => {
    signUp(creatSignUpSchema(data, "MANUAL"), authenticationDispatch);
  };

  return (
    <Box className={classes.container}>
      <form
        className={classes.form}
        onSubmit={handleSubmit((data) => handleOnSubmit(data))}
        noValidate
      >
        <AuthenticationHeader title="Create your account" />

        <Box className={classes.nameWraperStyle}>
          <Box className={classes.formInputControl} sx={{ width: 200 }}>
            <label className={classes.formInputLabel}>First Name</label>
            <TextField
              type="text"
              placeholder="Enter first name"
              required
              size="small"
              name="First_Name"
              InputProps={{
                classes: { notchedOutline: classes.noBorder },
              }}
              inputProps={{
                className: classes.input,
              }}
              {...register("First_Name")}
              error={errors?.First_Name}
              helperText={errors?.First_Name?.message}
            />
          </Box>
          <Box className={classes.formInputControl} sx={{ width: 200 }}>
            <label className={classes.formInputLabel}>Last Name</label>
            <TextField
              placeholder="Enter last name"
              type="text"
              required
              size="small"
              name="Last_Name"
              InputProps={{
                classes: { notchedOutline: classes.noBorder },
              }}
              inputProps={{
                className: classes.input,
              }}
              {...register("Last_Name")}
              error={errors?.Last_Name}
              helperText={errors?.Last_Name?.message}
            />
          </Box>
        </Box>

        <Box className={classes.formInputControl}>
          <label className={classes.formInputLabel}>Email</label>
          <TextField
            placeholder="Enter email"
            type="email"
            required
            size="small"
            name="Email"
            InputProps={{
              classes: { notchedOutline: classes.noBorder },
            }}
            inputProps={{
              className: classes.input,
            }}
            {...register("Email")}
            error={errors?.Email}
            helperText={errors?.Email?.message}
          />
        </Box>
        <Box className={classes.formInputControl}>
          <label className={classes.formInputLabel}>Password</label>
          <TextField
            placeholder="Enter password"
            type="password"
            required
            size="small"
            name="Password"
            InputProps={{
              classes: { notchedOutline: classes.noBorder },
            }}
            inputProps={{
              className: classes.input,
            }}
            {...register("Password")}
            error={errors?.Password}
            helperText={errors?.Password?.message}
          />
        </Box>
        <Box className={classes.formInputControl}>
          <label className={classes.formInputLabel}>Phone</label>
          <TextField
            type="text"
            required
            size="small"
            placeholder="Enter phone no"
            name="Phone_Number"
            InputProps={{
              classes: { notchedOutline: classes.noBorder },
            }}
            inputProps={{
              className: classes.input,
            }}
            {...register("Phone_Number")}
            error={errors?.Phone_Number}
            helperText={errors?.Phone_Number?.message}
          />
        </Box>

        <Box className={classes.formInputControl}>
          <ActionButton buttonText={"CREATE ACCOUNT"} />
        </Box>

        <Box className={classes.formInputControl}>
          <GoogleButton
            label="Sign Up with Google"
            responseGoogle={responseGoogle}
          />
        </Box>

        <Box className={classes.formInputControl}>
          <FacebookButton
            label="Sign Up with Facebook"
            responseFacebook={responseFacebook}
          />
        </Box>
        <Box className={classes.formInputControl}>
          <Typography className={classes.formFooter}>
            Already have an account? <Link to="/auth/sign-in">SignIn</Link>
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
  );
}

export default SignUp;
