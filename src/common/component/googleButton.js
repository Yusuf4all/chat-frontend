import React from "react";
import GoogleLogin from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../../service/getEnvVariables";
import { makeStyles } from "@mui/styles";
const useStyle = makeStyles((theme) => ({
	thirdParty: {
		display: "flex",
		justifyContent: "center",
		padding: "10px 0px",
		fontSize: "14px !important",
		color: "#524444 !important",
		boxShadow: "none !important",
		width: "100%",
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
				autoLoad={false}
				cookiePolicy={"single_host_origin"}
			/>
		</>
	);
}

export default GoogleButton;
