import React from "react";
import GoogleLogin from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../../service/getEnvVariables";
import { makeStyles } from "@mui/styles";
const useStyle = makeStyles((theme) => ({
  thirdParty: {
    display: "flex",
    justifyContent: "center",
    padding: "5px 0px !important",
    fontSize: "16px !important",
    color: "white !important",
    backgroundColor: "transparent !important",
    boxShadow: "none !important",
    // borderRadius: "50% !important",
    border: "1px solid rgb(170 175 191) !important",
  },
}));

function GoogleButton({ label, responseGoogle }) {
  const classes = useStyle();
  return (
    <>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText={label}
        className={classes.thirdParty}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}

export default GoogleButton;
