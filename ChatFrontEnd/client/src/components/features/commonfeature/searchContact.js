import { IconButton, Paper, InputBase } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";

const useStyle = makeStyles((theme) => ({
  formStyle: {
    p: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: theme.palette.greyscale.main,
  },
  iconsStyle: {
    color: theme.icon.primary.main,
    padding: "10px",
  },
}));

function SearchContact() {
  const classes = useStyle();
  return (
    <>
      <Paper component="form" className={classes.formStyle}>
        <InputBase
          sx={{ ml: 1, flex: 1, color: "#fff" }}
          placeholder="Search user"
          inputProps={{ "aria-label": "Search user" }}
        />
        <IconButton
          type="submit"
          className={classes.iconsStyle}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
}

export default SearchContact;
