import { Grid } from "@mui/material";
import React from "react";
import SignUp from "../components/features/authentication/signup";
import Signin from "../components/features/authentication/signin";
import { Router } from "@reach/router";
import ForgotPassword from "../components/features/authentication/forgotPassword";
import ResetPassword from "../components/features/authentication/resetPassword";

function Authentication() {
  return (
    <>
      <Grid container direction="column" alignItme="center">
        <Grid item sx={12} sm={12}>
          <Router>
            <SignUp path="/sign-up" />
            <Signin path="/sign-in" />
            <ForgotPassword path="/forgot-password" />
            <ResetPassword path="/reset-password/:resetToken" />
          </Router>
        </Grid>
      </Grid>
    </>
  );
}

export default Authentication;
