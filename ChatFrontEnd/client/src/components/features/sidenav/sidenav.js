import * as React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Drawer, Button } from "@mui/material";
import { navigate } from "@reach/router";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ChatIcon from "@mui/icons-material/Chat";
import Avatar from "@mui/material/Avatar";

const useStyle = makeStyles((theme) => ({
  paper: {
    background: theme.palette.primary.main,
  },
  iconStyle: {
    color: "#fff",
    transform: "scale(1.2)",
  },
  listStyle: {
    marginBottom: "80px",
    padding: "10px 37px",
    "&:hover": {
      backgroundColor: theme.palette.tertiary.main,
    },
    divider: theme.palette.divider.main,
  },
}));

function SideNav() {
  const classes = useStyle();

  const itemList = [
    {
      text: "Chat",
      icon: <ChatIcon className={classes.iconStyle} />,
      onClick: () => navigate("/web-chat/chat"),
    },
    {
      text: "Friend",
      icon: <GroupIcon className={classes.iconStyle} />,
      onClick: () => navigate("/web-chat/friend-list"),
    },
    {
      text: "Add Friend",
      icon: <PersonAddIcon className={classes.iconStyle} />,
      onClick: () => navigate("/web-chat/add-frinend-list"),
    },
  ];

  return (
    <React.Fragment>
      <Drawer
        classes={{ paper: classes.paper }}
        sx={{
          width: 100,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 100,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar
          title="TITLE"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            cursor: "pointer",
          }}
        >
          <img src="/assets/images/chatAppLogo.png" alt="Kitten" />
        </Toolbar>

        <Divider classes={classes.divider} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Box>
            <List>
              {itemList.map((item, index) => (
                <ListItem
                  hover
                  button
                  key={item.text}
                  className={classes.listStyle}
                >
                  <ListItemIcon
                    sx={{ minWidth: "100%" }}
                    onClick={item.onClick}
                  >
                    {item.icon}
                  </ListItemIcon>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box>
            <Avatar
              alt="Remy Sharp"
              src="https://c4.wallpaperflare.com/wallpaper/770/462/564/pretty-girl-pictures-1920x1200-wallpaper-preview.jpg"
              sx={{ width: 56, height: 56 }}
            />
          </Box>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default SideNav;
