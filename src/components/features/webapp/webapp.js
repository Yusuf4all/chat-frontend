import React, { useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import Chat from "../chat/chat";
import Contact from "../contact/contact";
import { Grid, Typography } from "@mui/material";
import { socket } from "../../../common/socket/socket";
import { toast } from "react-toastify";
import NoChat from "../chat/noChat";
import { UserStore } from "../../../store/user/userStore";

const useStyles = makeStyles((theme) => ({
	parentHead: {
		display: "flex",
		justifyContent: "space-Between",
	},
	"@global": {
		"*::-webkit-scrollbar": {
			width: "0.5em",
		},
		"*::-webkit-scrollbar-thumb": {
			backgroundColor: "#505ACA",
			outline: "none",
			borderRadius: "5px",
		},
	},
}));

function WebAppContainer() {
	const classes = useStyles();
	const { userStore, userDispatch } = useContext(UserStore);
	console.log("test", userStore);

	useEffect(() => {
		initializeSocketOperation();
	}, []);

	const initializeSocketOperation = () => {
		socket.on("errorResponse", (message) => {
			toast.error(message);
		});
		socket.on("successResponse", (message) => {
			toast.success(message);
		});
	};

	return (
		<React.Fragment>
			<Grid container>
				<Grid item md={3}>
					<Contact />
				</Grid>
				<Grid item md={9} style={{ backgroundColor: "#100130" }}>
					{Object.keys(userStore.selectedUser).length > 0 ? (
						<Chat />
					) : (
						<NoChat />
					)}
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export default WebAppContainer;
