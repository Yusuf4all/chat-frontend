import React from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box, Avatar, Typography, Badge, Stack, Divider } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const useStyle = makeStyles((theme) => ({
  iconsStyle: {
    color: theme.icon.primary.main,
  },
  chatHeaderStyle: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 10px",
  },
}));

function ChatHeader() {
  const classes = useStyle();
  return (
    <React.Fragment>
      <Box className={classes.chatHeaderStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box mr={1}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt="Remy Sharp"
                src="https://c4.wallpaperflare.com/wallpaper/770/462/564/pretty-girl-pictures-1920x1200-wallpaper-preview.jpg"
                sx={{ width: 45, height: 45 }}
              />
            </StyledBadge>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Typography variant="subtitle1">Charlette</Typography>
            <Typography variant="subtitle2">Online</Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Stack direction="row" spacing={2}>
            <SearchIcon className={classes.iconsStyle} />
            <PhoneIcon className={classes.iconsStyle} />
            <VideocamIcon className={classes.iconsStyle} />
            <MoreVertIcon className={classes.iconsStyle} />
          </Stack>
        </Box>
      </Box>
      <Divider />
    </React.Fragment>
  );
}

export default ChatHeader;
