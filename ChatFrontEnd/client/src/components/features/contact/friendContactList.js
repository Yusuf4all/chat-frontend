import { Box, Typography, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import FriendCard from "../commonfeature/friendCard";
import AddFriendCard from "../commonfeature/addFriendCard";
import { makeStyles } from "@mui/styles";
import { getAllFriends } from "../../../store/user/userAction";
import { UserStore } from "../../../store/user/userStore";
import { socket } from "../../../common/socket/socket";

const useStyle = makeStyles((theme) => ({
  friendListContainer: {
    padding: " 5px 0px",
    overflow: "auto",
    maxHeight: "83vh",
  },

  listHeading: {
    fontSize: "16px",
    fontWeight: "600",
  },
}));

function FriendContactList() {
  const classes = useStyle();
  //==================== Context store
  const { userStore, userDispatch } = useContext(UserStore);

  // ==================== User defined states
  const [friendList, setFriendList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [actionType, setActionType] = useState([]);
  const [actionPayload, setActionPayload] = useState([]);

  useEffect(() => {
    debugger;
    const Friend_Requests = [],
      Friends = [];
    userStore.friendList.forEach((user) => {
      if (user.Status === "Accept") Friend_Requests.push(user);
      else Friends.push(user);
    });
    setFriendRequestList(Friend_Requests);
    setFriendList(Friends);
  }, [userStore.friendList]);

  useEffect(() => {
    debugger;
    switch (actionType) {
      case "SAVE_ALL_FRIEND_LIST":
        userDispatch({
          type: actionType,
          payload: [...userStore.friendList, actionPayload],
        });
        break;
      default:
        break;
    }
  }, [actionType]);

  useEffect(() => {
    getAllFriends(userDispatch);
    handleSocketOperation();
  }, []);

  const handleSocketOperation = () => {
    socket.on("acceptFriendResponse", (response) => {
      debugger;
      console.log(response);
    });

    socket.on("addFriendRequest", (response) => {
      setActionPayload(response);
      setActionType("SAVE_ALL_FRIEND_LIST");
    });
  };

  return (
    <Box className={classes.friendListContainer}>
      {/* Print friend request list */}
      {friendRequestList.length > 0 ? (
        <Box className={classes.newFriendListStyle}>
          <Typography className={classes.listHeading}>
            Friend Request
          </Typography>
          {friendRequestList.map((user, index) => {
            return <AddFriendCard user={user} />;
          })}
        </Box>
      ) : null}

      {/* Print friend  list */}
      {friendList.length > 0 ? (
        <Box className={classes.friendListStyle}>
          <Typography className={classes.listHeading}>Friends</Typography>
          {friendList.map((user, index) => {
            return <FriendCard user={user} />;
          })}
        </Box>
      ) : null}
    </Box>
  );
}

export default FriendContactList;
