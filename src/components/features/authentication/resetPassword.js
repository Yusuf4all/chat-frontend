import React, { useContext, useEffect, useState } from "react";
import { Typography, TextField, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ActionButton from "../../../common/component/actionButton";
import { Link, useParams } from "@reach/router";
import AuthenticationHeader from "./authenticationHeader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../../common/validation/authenticationSchemas";
import { userResetPassword } from "../../../store/authentication/authenticationAction";
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

function ResetPassword() {
  const classes = useStyle();
  const { authenticationDispatch } = useContext(AuthenticationStore);
  const param = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  // User defined state
  const [resetToken, setResetToken] = useState("");

  useEffect(() => {
    setResetToken(param?.resetToken);
  }, []);

  const handleOnSubmit = (data) => {
    const USER_DATA = {
      token: resetToken,
      Password: data.Password,
    };
    userResetPassword(USER_DATA, authenticationDispatch);
  };

  return (
    <React.Fragment>
      <AuthenticationHeader title={"Reset Password"} />
      <form
        className={classes.formStyle}
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Box className={classes.formController}>
          <label>Enter new password</label>
          <TextField
            type="password"
            required
            size="small"
            name="Password"
            {...register("Password")}
            error={errors?.Password}
            helperText={errors?.Password?.message}
          />
        </Box>

        <Box className={classes.formController}>
          <label>Re-Enter password</label>
          <TextField
            type="password"
            required
            size="small"
            name="CPassword"
            {...register("CPassword")}
            error={errors?.CPassword}
            helperText={errors?.CPassword?.message}
          />
        </Box>

        <Box className={classes.formController}>
          <ActionButton buttonText={"Reset Password"} />
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

export default ResetPassword;
