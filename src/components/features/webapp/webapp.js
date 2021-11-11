import React from "react";
import { makeStyles } from "@mui/styles";
import Chat from "../chat/chat";
import Contact from "../contact/contact";
import { Grid, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  parentHead: {
    display: "flex",
    justifyContent: "space-Between",
  },
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.5em",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#505ACA",
      outline: "none",
      borderRadius: "5px",
    },
  },
}));
function WebAppContainer() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container>
        <Grid item md={3}>
          <Contact />
        </Grid>
        <Grid item md={9} style={{ backgroundColor: "#100130" }}>
          <Chat />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default WebAppContainer;
