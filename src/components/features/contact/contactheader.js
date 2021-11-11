import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  iconStyling: {
    minWidth: "46px !important",
    marginRight: "6px",
    minHeight: "36px !important",
    borderColor: " #293145",
  },
  iconPlus: {
    minWidth: "46px !important",
    minHeight: "36px !important",
    borderColor: " #293145",
  },
  iconDesign: {
    color: theme.palette.neutrals,
    fontSize: "16px",
  },
}));

function ContactHeader() {
  const classes = useStyle();
  return (
    <React.Fragment>
      <Grid container justifyContent="space-between" alignItems="center" py={3}>
        <Grid item>
          <Typography variant="h5" component="h5">
            Chats
          </Typography>
        </Grid>

        <Grid item justify="space-between" alignItems="center">
          <Button variant="outlined" className={classes.iconStyling}>
            <PeopleOutlineIcon className={classes.iconDesign} />
          </Button>
          <Button variant="outlined" className={classes.iconPlus}>
            <AddCircleOutlineIcon className={classes.iconDesign} />
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ContactHeader;
