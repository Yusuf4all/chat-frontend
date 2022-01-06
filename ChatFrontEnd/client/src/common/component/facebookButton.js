import React from "react";
import FacebookLogin from "react-facebook-login";
import { FACEBOOK_ID } from "../../service/getEnvVariables";
import { makeStyles } from "@mui/styles";
const useStyle = makeStyles((theme) => ({
  facebookStyle: {
    cursor: "pointer",
    color: "white",
    fontSize: "16px !important",
    backgroundColor: "transparent",
    width: "100%",
    borderRadius: "3px",
    padding: "12px 0px",
    border: "1px solid rgb(170 175 191)",
    "& i": {
      marginRight: "10px",
      color: "white",
      backgroundColor: "blue",
      padding: "5px",
      borderRadius: "50%",
    },
  },
}));

function FacebookButton({ label, responseFacebook }) {
  const classes = useStyle();
  return (
    <>
      <FacebookLogin
        textButton={label}
        appId={FACEBOOK_ID}
        fields="name,email,picture"
        scope="public_profile,user_friends"
        callback={responseFacebook}
        icon="fa-facebook"
        cssClass={classes.facebookStyle}
      />
    </>
  );
}

export default FacebookButton;
