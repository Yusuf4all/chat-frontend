import { Box, Grid, Avatar, Typography, Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { getAllUsers, addFriend } from "../../../store/user/userAction";
import { UserStore } from "../../../store/user/userStore";
import { socket } from "../../../common/socket/socket";
// import { toast } from "react-toastify";

const useStyle = makeStyles((theme) => ({
	containerStyle: {
		border: "1px solid #293145",
		borderRadius: "5px",
		padding: " 10px 10px",
		margin: "10px 0px;",
	},
	friendListStyle: {
		borderTop: "1px solid #293145",
		padding: " 5px 0px",
		maxHeight: "83vh",
		overflow: "auto",
	},

	addFriendListStyle: {
		color: theme.palette.neutrals.main,
		backgroundColor: theme.palette.primary.main,
		fontSize: "12px",
		width: "45%",
	},
	removeFriendListStyle: {
		color: theme.palette.neutrals.main,
		backgroundColor: theme.palette.greyscale.main,
		fontSize: "12px",
		width: "45%",
	},
}));

function AddFriendList() {
	const classes = useStyle();
	//==================== Context store
	const { userDispatch, userStore } = useContext(UserStore);

	// ==================== User defined states
	const [allusers, setAllUser] = useState([]);

	useEffect(() => {
		setAllUser(userStore.allusers);
	}, [userStore.allusers]);

	const handleFriendOperation = async (event, user) => {
		switch (user.Status) {
			case "Add":
				socket.emit("addFriend", userStore.userSelfDetails, user);
				break;
			case "Accept":
				socket.emit("acceptFriendRequest", userStore.userSelfDetails, user);
				break;
			case "Friend":
				userDispatch({
					type: "SAVE_SELECTED_USER",
					payload: user,
				});
			default:
				return;
		}
	};

	const handleRemoveDeniedFriend = async (event, user, status) => {
		switch (status) {
			case "Accept":
				socket.emit("acceptFriendRequest", userStore.userSelfDetails, user);
				break;

			case "Denied":
				socket.emit("deniedFriendRequest", userStore.userSelfDetails, user);
			default:
				return;
		}
	};

	return (
		<Box className={classes.friendListStyle}>
			{allusers &&
				allusers?.map((user, index) => {
					return (
						<Grid item container className={classes.containerStyle}>
							<Grid item xs={3}>
								<Avatar
									alt="Remy Sharp"
									src="https://picsum.photos/seed/picsum/200/300"
									sx={{ width: 48, height: 48 }}
								/>
							</Grid>
							<Grid item xs={9}>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-around",
										height: "100%",
									}}
								>
									<Box>
										<Typography variant="subtitle1">
											{user?.First_Name} {user?.Last_Name}
										</Typography>
									</Box>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
										}}
									>
										<Button
											className={classes.addFriendListStyle}
											onClick={(e) => handleFriendOperation(e, user)}
										>
											{user.Status == "Friend" ? "Message" : user.Status}
										</Button>
										{user.Status !== "Friend" ? (
											<Button
												onClick={(e) =>
													handleRemoveDeniedFriend(
														e,
														user,
														user.Status === "Accept" ? "Denied" : "Remove"
													)
												}
												className={classes.removeFriendListStyle}
											>
												{user.Status === "Accept" ? "Denied" : "Remove"}
											</Button>
										) : null}
									</Box>
								</Box>
							</Grid>
						</Grid>
					);
				})}
		</Box>
	);
}

export default AddFriendList;
