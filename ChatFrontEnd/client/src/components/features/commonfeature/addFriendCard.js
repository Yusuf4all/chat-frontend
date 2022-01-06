import { Box, Grid, Avatar, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import { UserStore } from "../../../store/user/userStore";
import { socket } from "../../../common/socket/socket";

const useStyle = makeStyles((theme) => ({
  containerStyle: {
    border: "1px solid #293145",
    borderRadius: "5px",
    padding: " 10px 10px",
    margin: "10px 0px;",
  },

  addFriendListStyle: {
    color: theme.palette.neutrals.main,
    backgroundColor: theme.palette.primary.main,
    fontSize: "12px",
    width: "45%",
  },
  removeFriendListStyle: {
    color: theme.palette.neutrals.main,
    backgroundColor: theme.palette.greyscale.main,
    fontSize: "12px",
    width: "45%",
  },
}));

function AddFriendCard({ user }) {
  const classes = useStyle();
  const { userStore, userDispatch } = useContext(UserStore);

  const handleFriendOperation = async (event, user) => {
    debugger;
    switch (user.Status) {
      case "Add":
        // let cloneAllUser = [...userStore.allusers];
        // let userIndex = cloneAllUser.findIndex(
        //   (ele) => ele.Friend_Id === user.Friend_Id
        // );
        // if (userIndex != -1) {
        //   cloneAllUser.splice(userIndex, 1);
        //   userDispatch({ type: "SAVE_ALL_USERS", payload: cloneAllUser });
        //   socket.emit("addFriend", userStore.userSelfDetails, user);
        // }
        socket.emit("addFriend", userStore.userSelfDetails, user);
        break;
      case "Accept":
        const filterFriendList = userStore.friendList.filter(
          (ele) => ele._id != user._id
        );
        userDispatch({
          type: "SAVE_ALL_FRIEND_LIST",
          paylaod: [...filterFriendList],
        });
        socket.emit("acceptFriendRequest", userStore.userSelfDetails, user);
        break;
      default:
        return;
    }
  };

  const handleRemoveDeniedFriend = async (event, user) => {
    debugger;
    if (user.Status === "Accept") {
      socket.emit("deniedFriendRequest", userStore.userSelfDetails, user);
    }
  };

  return (
    <Grid item container className={classes.containerStyle}>
      <Grid item xs={3}>
        <Avatar
          alt="Remy Sharp"
          src="https://picsum.photos/seed/picsum/200/300"
          sx={{ width: 48, height: 48 }}
        />
      </Grid>
      <Grid item xs={9}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "100%",
          }}
        >
          <Box>
            <Typography variant="subtitle1">
              {user?.First_Name} {user?.Last_Name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              className={classes.addFriendListStyle}
              onClick={(e) => handleFriendOperation(e, user)}
            >
              {/* {user.Status? user.Status} */}
              {user.Status}
            </Button>
            {user.Status !== "Friend" ? (
              <Button
                onClick={(e) => handleRemoveDeniedFriend(e, user)}
                className={classes.removeFriendListStyle}
              >
                {user.Status === "Accept" ? "Denied" : "Remove"}
              </Button>
            ) : null}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AddFriendCard;
