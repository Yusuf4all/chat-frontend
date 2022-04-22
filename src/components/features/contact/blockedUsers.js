import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import FriendCard from "../../../common/component/friendCard";
import { UserStore } from "../../../store/user/userStore";
import { getBlockedUser } from "../../../store/user/userAction";
import { ConfirmationModal } from "../../../common/component/confirmationModal";
import { socket } from "../../../common/socket/socket";

const useStyle = makeStyles((theme) => ({
	friendsContainer: {
		maxHeight: "40vh",
		overflow: "auto",
	},
	friendListStyle: {
		borderTop: "1px solid #293145",
		padding: " 5px 0px",
		maxHeight: "83vh",
		overflow: "auto",
		marginTop: "5px",
	},
}));
function BlockedUsers() {
	const classes = useStyle();
	const { userStore, userDispatch } = useContext(UserStore);
	const [blockedUsers, setBlockedUsers] = useState([]);
	const [dialogText, setDialogText] = useState(null);
	const [isUnblockDialog, setUnblockDialog] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	useEffect(() => {
		getBlockedUser(userDispatch);
	}, []);

	useEffect(() => {
		setBlockedUsers(userStore.blockedUsers);
	}, [userStore.blockedUsers]);

	const handleUnblockDialog = (user) => {
		const TEXT = {
			header: `Are you sure to unblock ${user && user.First_Name}  ${
				user && user.Last_Name
			}?`,
			body: "Selected user will be able to chat with you.",
			leftBtn: "Unblock",
			rightBtn: "Cancle",
		};
		setDialogText(TEXT);
		setUnblockDialog(!isUnblockDialog);
		setSelectedUser(user);
	};
	const handleUnblock = (user) => {
		socket.emit("unblockUser", userStore.userSelfDetails, user);
		setUnblockDialog(!isUnblockDialog);
	};

	return (
		<React.Fragment>
			<Box className={classes.friendListStyle}>
				<Box className={classes.friendsContainer}>
					<Box>
						<Typography>Blocked Users {blockedUsers.length} </Typography>
					</Box>
					{blockedUsers &&
						blockedUsers.map((user) => (
							<FriendCard
								user={user}
								handleOnClick={handleUnblockDialog}
								text="Unblock"
							/>
						))}
				</Box>
			</Box>
			<ConfirmationModal
				handleConfirmationDialog={handleUnblockDialog}
				isConfirmationDialog={isUnblockDialog}
				handleConfirmation={handleUnblock}
				text={dialogText}
				user={selectedUser}
			/>
		</React.Fragment>
	);
}

export default BlockedUsers;
