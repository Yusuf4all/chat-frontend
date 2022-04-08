export const friendOperationSocket = (socket, userStoreRef, userDispatch) => {
	// When user send friend request
	socket.on("friendRequestSent", (updatedRoom) => {
		const ALL_USERS = [...userStoreRef.current.allusers];

		// This section handle by sender user who sent the friend request
		if (updatedRoom.Sender_Id === userStoreRef.current.userSelfDetails._id) {
			for (let user = 0; user < ALL_USERS.length; user++) {
				if (ALL_USERS[user]._id === updatedRoom.To_User) {
					ALL_USERS[user] = JSON.parse(JSON.stringify(ALL_USERS[user]));
					ALL_USERS[user].Status = "Pendding";
					break;
				}
			}
		} else {
			// This section handle by receiver user who get the frient request
			for (let user = 0; user < ALL_USERS.length; user++) {
				if (ALL_USERS[user]._id === updatedRoom.Sender_Id) {
					ALL_USERS[user] = JSON.parse(JSON.stringify(ALL_USERS[user]));
					ALL_USERS[user].Status = "Accept";
					userDispatch({
						type: "ADD_REQUESTED_USER",
						payload: ALL_USERS[user],
					});
					break;
				}
			}
		}
		userDispatch({ type: "SAVE_ALL_USERS", payload: ALL_USERS });
	});

	socket.on("roomDeleteSuccess", (user) => {
		const updatedAllUserList = () => {
			const ALL_USERS = [...userStoreRef.current.allusers];
			for (let count = 0; count < ALL_USERS.length; count++) {
				if (ALL_USERS[count]._id === user._id) {
					ALL_USERS[count] = JSON.parse(JSON.stringify(ALL_USERS[count]));
					ALL_USERS[count].Status = "Add";
					userDispatch({
						type: "SAVE_ALL_USERS",
						payload: ALL_USERS,
					});
					break;
				}
			}
		};

		const deleteUserFromFriendList = () => {
			const REQUESTED_USER = [...userStoreRef.current.requestedUsers];
			let fileteredUser = REQUESTED_USER.filter(
				(reqUser) => reqUser._id !== user._id
			);

			userDispatch({
				type: "SAVE_ALL_REQUESTED_USERS",
				payload: fileteredUser,
			});
		};

		// Upadate status who send the friend request
		if (userStoreRef.current.userSelfDetails._id === user.Sender_Id) {
			updatedAllUserList();
		} else {
			// Upadate status who recieve the friend request
			updatedAllUserList();
			deleteUserFromFriendList();
		}
	});

	socket.on("acceptedFriendRequest", (user) => {
		debugger;
		const REQUESTED_USER = [...userStoreRef.current.requestedUsers];
		const ALL_USERS = [...userStoreRef.current.allusers];
		if (userStoreRef.current.userSelfDetails._id === user.Sender_Id) {
			for (let count = 0; count < ALL_USERS.length; count++) {
				if (ALL_USERS[count]._id === user._id) {
					ALL_USERS[count] = JSON.parse(JSON.stringify(ALL_USERS[count]));
					ALL_USERS[count].Status = "Friend";
					userDispatch({
						type: "SAVE_ALL_USERS",
						payload: ALL_USERS,
					});
					break;
				}
			}
		} else {
			const USERINDEX = REQUESTED_USER.findIndex((ele) => ele._id === user._id);
			if (USERINDEX) REQUESTED_USER.splice(USERINDEX, 1);
			userDispatch({
				type: "SAVE_ALL_REQUESTED_USERS",
				payload: REQUESTED_USER,
			});
		}
		userDispatch({
			type: "ADD_FRIEND",
			payload: user,
		});
	});
};
