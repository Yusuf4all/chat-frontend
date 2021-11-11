import React from "react";
import { Box, Avatar, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyleLeft = makeStyles((theme) => ({
  messageStyle: {
    backgroundColor: theme.palette.greyscale.main,
    padding: "15px",
    borderRadius: "5px 5px 5px 20px",
    width: "43%",
  },
}));

export function LeftMessage() {
  const classes = useStyleLeft();
  return (
    <React.Fragment>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs="auto">
          <Box>
            <Avatar
              alt="Remy Sharp"
              src="https://c4.wallpaperflare.com/wallpaper/770/462/564/pretty-girl-pictures-1920x1200-wallpaper-preview.jpg"
              sx={{ width: 45, height: 45 }}
            />
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Box>
            <Typography variant="subtitle2">2:34</Typography>
            {true ? (
              <Typography variant="body1" className={classes.messageStyle}>
                Layers of interaction are used in UI design to make it more
                user-friendly
              </Typography>
            ) : (
              <Box
                component="img"
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="The house from the offer."
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const useStyleRight = makeStyles((theme) => ({
  messageStyle: {
    backgroundColor: theme.palette.greyscale.main,
    padding: "15px",
    borderRadius: "5px 5px 20px 5px",
    width: "37%",
  },
}));
export function RightMessage() {
  const classes = useStyleRight();
  return (
    <React.Fragment>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="subtitle2">2:34</Typography>
            {true ? (
              <Typography variant="body1" className={classes.messageStyle}>
                Layers of interaction are used in UI design to make it more
                user-friendly
              </Typography>
            ) : (
              <Box
                component="img"
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="The house from the offer."
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
