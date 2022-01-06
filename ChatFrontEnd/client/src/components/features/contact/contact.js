import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import ContactHeader from "./contactheader";
import SearchContact from "../commonfeature/searchContact";
import ChatContactList from "./chatContactList";
import FriendContactList from "./friendContactList";
import AddFriendList from "./addFriendList";
import { makeStyles } from "@mui/styles";
import { Router, navigate } from "@reach/router";
import { getUserSelfDetails } from "../../../store/user/userAction";
import { UserStore } from "../../../store/user/userStore";
import { socket } from "../../../common/socket/socket";

const useStyle = makeStyles((theme) => ({
  chatContact: {
    height: "100vh",
    marginRight: "22px",
  },
  mainParent: {
    borderRight: "1px solid #293145 !important",
  },
}));

function Contact() {
  const classes = useStyle();

  const { userDispatch } = useContext(UserStore);

  useEffect(() => {
    async function fetchAPI() {
      let response = await getUserSelfDetails(userDispatch);
      if (response) {
        socket.emit("joinRoom", response._id);
      }
    }
    fetchAPI();
  }, []);
  return (
    <Box className={classes.mainParent}>
      <Box className={classes.chatContact}>
        <ContactHeader />
        <SearchContact />

        <Router>
          <ChatContactList path="/" />
          <ChatContactList path="/chat" />
          <FriendContactList path="/friend-list" />
          <AddFriendList path="/add-frinend-list" />
        </Router>
      </Box>
    </Box>
  );
}

export default Contact;
