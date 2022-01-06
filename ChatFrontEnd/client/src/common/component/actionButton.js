import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
const useStyle = makeStyles((theme) => ({
  submit: {
    padding: "10px 0px",
    fontSize: "16px",
    marginTop: "30px",
    background: "linear-gradient(232.74deg, #BE29F7 19.9%, #FB25CC 81.45%)",
  },
}));

function ActionButton({ buttonText }) {
  const classes = useStyle();
  return (
    <>
      <Button
        type="submit"
        // color="primary"
        className={classes.submit}
        variant="contained"
      >
        {buttonText}
      </Button>
    </>
  );
}

export default ActionButton;
