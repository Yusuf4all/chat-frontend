import * as React from "react";
import { Paper, InputBase, Divider, IconButton, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GifIcon from "@mui/icons-material/Gif";

import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  iconsStyle: {
    color: theme.icon.primary.main,
    padding: "10px",
    "&:hover": {
      backgroundColor: "#22262C",
    },
  },
  formStyle: {
    p: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "98%",
    height: "6vh",
    margin: "auto",
    backgroundColor: "#40444B",
  },
}));

function ChatFooter() {
  const classes = useStyle();
  return (
    <React.Fragment>
      <Box sx={{ height: "10vh", display: "flex", alignItems: "center" }}>
        <Paper component="form" className={classes.formStyle}>
          <IconButton className={classes.iconsStyle}>
            <AddCircleIcon />
          </IconButton>
          <Divider sx={{ height: "6vh" }} orientation="vertical" />
          <InputBase
            sx={{ ml: 1, flex: 1, color: "white" }}
            placeholder="Type your message here..."
            inputProps={{ "aria-label": "Type your message here..." }}
          />

          <IconButton>
            <GifIcon sx={{ backgroundColor: "#CACACA" }} />
          </IconButton>

          <IconButton className={classes.iconsStyle}>
            <EmojiEmotionsIcon />
          </IconButton>

          <IconButton type="submit" className={classes.iconsStyle}>
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </React.Fragment>
  );
}

export default ChatFooter;
