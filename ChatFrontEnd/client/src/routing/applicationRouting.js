import React from "react";
import { Router } from "@reach/router";
import SideNav from "../components/features/sidenav/sidenav";
import WebAppContainer from "../components/features/webapp/webapp";
import { Grid } from "@mui/material";
function Application() {
  return (
    <Grid container>
      <Grid item xs="1">
        <SideNav />
      </Grid>
      <Grid item xs="11">
        <Router>
          <WebAppContainer path="/*" />
        </Router>
      </Grid>
    </Grid>
  );
}

export default Application;
