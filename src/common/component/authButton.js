import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
const useStyle = makeStyles((theme) => ({
	submit: {
		padding: "5px 0px",
		fontSize: "14px",
		marginTop: "5px",
	},
}));

function AuthButton({ buttonText }) {
	const classes = useStyle();
	return (
		<>
			<Button
				type="submit"
				color="primary"
				className={classes.submit}
				variant="contained"
			>
				{buttonText}
			</Button>
		</>
	);
}

export default AuthButton;
