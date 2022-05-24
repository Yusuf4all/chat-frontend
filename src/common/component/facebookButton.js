import React from "react";
import FacebookLogin from "react-facebook-login";
import { FACEBOOK_ID } from "../../service/getEnvVariables";
import { makeStyles } from "@mui/styles";
const useStyle = makeStyles((theme) => ({
	facebookStyle: {
		color: "white",
		cursor: "pointer",
		fontSize: "14px !important",
		backgroundColor: "#3C5A96",
		width: "100%",
		borderRadius: "3px",
		border: "1px solid rgb(97 115 173)",
		padding: "0px 10px 0px 0px",
		padding: "12px",
		"& i": {
			fontSize: "16px ",
			marginRight: "5px",
			marginRight: "10px",
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
