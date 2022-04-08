import { Box, Grid, Avatar, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { getAllUsers } from "../../../store/user/userAction";
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
}));

function ChatContactList() {
	const classes = useStyle();
	//==================== Context store
	const { userStore, userDispatch } = useContext(UserStore);

	// ==================== User defined states

	return (
		<Box className={classes.friendListStyle}>
			{/* {allusers &&
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
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
										}}
									>
										<Typography variant="subtitle1">Yusuf Khan</Typography>
										<Typography variant="subtitle2">06:30 AM</Typography>
									</Box>
									<Box>
										<Typography variant="subtitle2">
											I have a dream Yusuf Khan
										</Typography>
									</Box>
								</Box>
							</Grid>
						</Grid>
					);
				})} */}
		</Box>
	);
}

export default ChatContactList;
