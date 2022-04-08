import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
const useStyle = makeStyles((theme) => ({
	submit: {
		padding: "10px 0px",
		fontSize: "16px",
		marginTop: "30px",
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
