import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { getAllUsers } from "../../../store/user/userAction";
import { UserStore } from "../../../store/user/userStore";
import AddFriendCard from "../commonfeature/addFriendCard";

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

function AddFriendList() {
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
          return <AddFriendCard user={user} />;
        })}
    </Box>
  );
}

export default AddFriendList;
