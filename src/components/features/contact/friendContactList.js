import { Box, Grid, Avatar, Typography, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { getAllUsers } from "../../../store/user/userAction";
import { UserStore } from "../../../store/user/userStore";

const useStyle = makeStyles((theme) => ({
  containerStyle: {
    border: "1px solid #293145",
    borderRadius: "5px",
    padding: " 10px 10px",
    margin: "10px 0px;",
  },
  friendListStyle: {
    borderTop: "1px solid #293145",
    padding: " 5px 0px",
    maxHeight: "83vh",
    overflow: "auto",
  },

  UserListInner: {
    display: "flex",
    justifyContent: "space-beetween",
  },
  textStyle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  btnStyle: {
    fontSize: "12px",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    textTransform: "capitalize",
    whiteSpace: "nowrap",
  },
}));

function FriendContactList() {
  const classes = useStyle();
  //==================== Context store
  const { userStore, userDispatch } = useContext(UserStore);

  // ==================== User defined states
  const [allusers, setAllUser] = useState([]);

  useEffect(() => {
    getAllUsers(userDispatch);
  }, []);

  useEffect(() => {
    setAllUser(userStore.allusers);
  }, [userStore.allusers]);

  return (
    <Box className={classes.friendListStyle}>
      {allusers &&
        allusers?.map((user, index) => {
          return (
            <Grid item container className={classes.containerStyle}>
              <Grid item xs={2}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://picsum.photos/seed/picsum/200/300"
                  sx={{ width: 48, height: 48 }}
                />
              </Grid>

              <Grid item xs={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    height: "100%",
                  }}
                  pl={1}
                >
                  <Box>
                    <Typography
                      className={classes.textStyle}
                      variant="subtitle1"
                    >
                      Yusuf Khan
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      className={classes.textStyle}
                      variant="subtitle2"
                    >
                      I have to Sacrifies
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box
                  sx={{
                    height: "100%",
                    alignItems: "center",
                    display: "flex",
                    width: "90%",
                    margin: "auto",
                  }}
                >
                  <Button className={classes.btnStyle}>Send message </Button>
                </Box>
              </Grid>
            </Grid>
          );
        })}

      {allusers &&
        allusers?.map((user, index) => {
          return (
            <Grid item container className={classes.containerStyle}>
              <Grid item xs={2}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://picsum.photos/seed/picsum/200/300"
                  sx={{ width: 48, height: 48 }}
                />
              </Grid>

              <Grid item xs={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    height: "100%",
                  }}
                  pl={1}
                >
                  <Box>
                    <Typography
                      className={classes.textStyle}
                      variant="subtitle1"
                    >
                      Yusuf Khan
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      className={classes.textStyle}
                      variant="subtitle2"
                    >
                      I have to Sacrifies
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box
                  sx={{
                    height: "100%",
                    alignItems: "center",
                    display: "flex",
                    width: "90%",
                    margin: "auto",
                  }}
                >
                  <Button className={classes.btnStyle}>Send message </Button>
                </Box>
              </Grid>
            </Grid>
          );
        })}
    </Box>
  );
}

export default FriendContactList;
