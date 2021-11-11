import React, { useContext } from "react";
import { Typography, TextField, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ActionButton from "../../../common/component/actionButton";
import { Link } from "@reach/router";
import AuthenticationHeader from "./authenticationHeader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotSchema } from "../../../common/validation/authenticationSchemas";
import { forgotPassword } from "../../../store/authentication/authenticationAction";
import { AuthenticationStore } from "../../../store/authentication/authenticationStore";

const useStyle = makeStyles((theme) => ({
  formStyle: {
    width: "500px",
    margin: "auto",
    boxShadow: "rgb(0 0 0 / 25%) 0px 14px 28px, rgb(0 0 0 / 22%) 0px 10px 10px",
    padding: "30px",
  },
  formController: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  },
  formFooter: {
    marginTop: "10px",
    fontSize: "16px",
    "& a": {
      color: "#5072bd",
      textDecoration: "none",
    },
  },
}));

function ForgotPassword() {
  const classes = useStyle();
  const { authenticationDispatch } = useContext(AuthenticationStore);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(forgotSchema),
  });

  const handleOnSubmit = (data) => {
    const USER_DATA = {
      Email: data.Email,
    };
    forgotPassword(USER_DATA, authenticationDispatch);
  };

  return (
    <React.Fragment>
      <AuthenticationHeader title={"Forgot Password"} />
      <form
        className={classes.formStyle}
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Box className={classes.formController}>
          <label>Enter Email Address</label>
          <TextField
            type="text"
            required
            size="small"
            name="Email"
            {...register("Email")}
            error={errors?.Email}
            helperText={errors?.Email?.message}
          />
        </Box>

        <Box className={classes.formController}>
          <ActionButton buttonText={"Send Verification Code"} />
        </Box>
        <Box className={classes.formController}>
          <Typography className={classes.formFooter}>
            Already have an account <Link to="/auth/sign-in">Signin here</Link>{" "}
          </Typography>
        </Box>
        <Box className={classes.formController}>
          <Typography className={classes.formFooter}>
            Don't have an account <Link to="/auth/sign-up">Signup here</Link>
          </Typography>
        </Box>
      </form>
    </React.Fragment>
  );
}

export default ForgotPassword;
