import { Box, Grid, Avatar, Typography, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import FriendActionButton from "../../../common/component/friendActionButton";
import { makeStyles } from "@mui/styles";
import { socket } from "../../../common/socket/socket";
import { UserStore } from "../../../store/user/userStore";

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

	UserListInner: {
		display: "flex",
		justifyContent: "space-beetween",
	},
	textStyle: {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	btnStyle: {
		fontSize: "12px",
		backgroundColor: theme.palette.primary.main,
		color: "#fff",
		textTransform: "capitalize",
		whiteSpace: "nowrap",
	},

	friendRequestedStyle: {
		borderBottom: "1px solid  #293145",
		paddingBottom: "10px",
		marginBottom: "10px",
		borderTop: "1px solid #293145",
		padding: " 5px 0px",
	},

	friendRequrestedContainer: {
		maxHeight: "30vh",
		overflow: "auto",
	},
	friendsContainer: {
		maxHeight: "40vh",
		overflow: "auto",
	},

	primaryColor: {
		backgroundColor: theme.palette.primary.main,
	},
	greyscaleColor: {
		backgroundColor: theme.palette.greyscale.main,
	},
	containerStyle: {
		border: "1px solid #293145",
		borderRadius: "5px",
		padding: " 10px 10px",
		margin: "10px 0px;",
	},
}));

function FriendContactList() {
	const classes = useStyle();
	//==================== Context store
	const { userStore, userDispatch } = useContext(UserStore);

	// ==================== User defined states
	const [requestedUsers, setRequestedUsers] = useState([]);
	const [friendList, setFriendList] = useState([]);

	useEffect(() => {
		setRequestedUsers([...userStore.requestedUsers]);
	}, [userStore.requestedUsers]);

	useEffect(() => {
		setFriendList([...userStore.friendList]);
	}, userStore.friendList);

	const handleFriendOperation = (status, user) => {
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
			<Box className={classes.friendRequestedStyle}>
				<Box>
					<Typography>Friend requested {requestedUsers.length}</Typography>
				</Box>
				<Box className={classes.friendRequrestedContainer}>
					{requestedUsers &&
						requestedUsers.length > 0 &&
						requestedUsers.map((user) => {
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
												justifyContent: "space-between",
											}}
										>
											<Box>
												<Typography variant="subtitle1">Yusuf Khan</Typography>
											</Box>
											<Box
												sx={{
													display: "flex",
													justifyContent: "space-between",
												}}
											>
												<FriendActionButton
													text="Accept"
													handleClick={handleFriendOperation}
													bgColor={classes.primaryColor}
													user={user}
												/>
												<FriendActionButton
													text="Denied"
													handleClick={handleFriendOperation}
													bgColor={classes.greyscaleColor}
													user={user}
												/>
											</Box>
										</Box>
									</Grid>
								</Grid>
							);
						})}
				</Box>
			</Box>
			{/* =================================================== */}
			<Box className={classes.friendsContainer}>
				<Box>
					<Typography>Friends {requestedUsers.length}</Typography>
				</Box>
				<Box>
					{friendList &&
						friendList.length > 0 &&
						friendList?.map((user, index) => {
							return (
								<Grid item container className={classes.containerStyle}>
									<Grid item xs={2}>
										<Avatar
											alt="Remy Sharp"
											src="https://picsum.photos/seed/picsum/200/300"
											sx={{ width: 48, height: 48 }}
										/>
									</Grid>

									<Grid item xs={6}>
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												justifyContent: "space-around",
												height: "100%",
											}}
											pl={1}
										>
											<Box>
												<Typography
													className={classes.textStyle}
													variant="subtitle1"
												>
													{user?.First_Name} {user?.Last_Name}
												</Typography>
											</Box>
											<Box>
												<Typography
													className={classes.textStyle}
													variant="subtitle2"
												>
													I have to Sacrifies
												</Typography>
											</Box>
										</Box>
									</Grid>

									<Grid item xs={4}>
										<Box
											sx={{
												height: "100%",
												alignItems: "center",
												display: "flex",
												width: "90%",
												margin: "auto",
											}}
										>
											<Button className={classes.btnStyle}>Message </Button>
										</Box>
									</Grid>
								</Grid>
							);
						})}
				</Box>
			</Box>
		</Box>
	);
}

export default FriendContactList;
