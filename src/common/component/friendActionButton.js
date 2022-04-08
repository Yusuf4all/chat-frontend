import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import React from "react";

const useStyle = makeStyles((theme) => ({
	buttonStyle: {
		color: theme.palette.neutrals.main,
		fontSize: "12px",
		width: "45%",
	},
}));

function FriendActionButton({ text, handleClick, bgColor, user }) {
	const classes = useStyle();
	return (
		<>
			<Button
				className={`${classes.buttonStyle} ${bgColor}`}
				onClick={() => handleClick(text, user)}
			>
				{text}
			</Button>
		</>
	);
}

export default FriendActionButton;
