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

	socket.on("roomDeleteSuccess", (user, room) => {
		debugger;
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

		const deleteUserFromRequestedList = () => {
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
			deleteUserFromRequestedList();
		}
	});

	socket.on("acceptedFriendRequest", (user, room) => {
		const REQUESTED_USER = [...userStoreRef.current.requestedUsers];
		const ALL_USERS = [...userStoreRef.current.allusers];

		const updateUser = () => {
			const USER_INDEX = ALL_USERS.findIndex((ele) => ele._id === user._id);
			if (USER_INDEX > -1) {
				ALL_USERS.splice(USER_INDEX, 1, user);
				userDispatch({
					type: "SAVE_ALL_USERS",
					payload: ALL_USERS,
				});
			}
		};

		const updateRequestedUser = () => {
			const USER_INDEX = REQUESTED_USER.findIndex(
				(ele) => ele._id === user._id
			);
			if (USER_INDEX > -1) REQUESTED_USER.splice(USER_INDEX, 1);
			userDispatch({
				type: "SAVE_ALL_REQUESTED_USERS",
				payload: REQUESTED_USER,
			});
		};

		if (userStoreRef.current.userSelfDetails._id === room.Sender_Id) {
			updateUser();
		} else {
			updateRequestedUser();
			updateUser();
		}
		userDispatch({
			type: "ADD_FRIEND",
			payload: user,
		});
	});

	socket.on("unfriendUserSuccess", (user, room) => {
		const FRIEND_LIST = [...userStoreRef.current.friendList];
		const ALL_USERS = [...userStoreRef.current.allusers];
		const INDEX = FRIEND_LIST.findIndex((ele) => ele._id === user._id);
		if (INDEX > -1) {
			FRIEND_LIST.splice(INDEX, 1);
			userDispatch({
				type: "SAVE_ALL_FRIENDS",
				payload: FRIEND_LIST,
			});
		}

		const USER_INDEX = ALL_USERS.findIndex((ele) => ele._id === user._id);
		if (USER_INDEX > -1) {
			ALL_USERS[USER_INDEX] = JSON.parse(JSON.stringify(ALL_USERS[USER_INDEX]));
			ALL_USERS[USER_INDEX].Status = "Add";
			userDispatch({
				type: "SAVE_ALL_USERS",
				payload: ALL_USERS,
			});
		}
	});

	socket.on("blockedUser", (user, room) => {
		const FRIEND_LIST = [...userStoreRef.current.friendList];
		const ALL_USERS = [...userStoreRef.current.allusers];

		console.log("test", room);

		if (
			room.Blocked_By.find(
				(id) => id === userStoreRef.current.userSelfDetails._id
			)
		) {
			let USER_INDEX = FRIEND_LIST.findIndex((ele) => ele._id === user._id);
			if (USER_INDEX > -1) {
				FRIEND_LIST.splice(USER_INDEX, 1);
				userDispatch({
					type: "SAVE_ALL_FRIENDS",
					payload: FRIEND_LIST,
				});
			}
			USER_INDEX = ALL_USERS.findIndex((ele) => ele._id === user._id);
			if (USER_INDEX > -1) {
				ALL_USERS.splice(USER_INDEX, 1);
				userDispatch({
					type: "SAVE_ALL_USERS",
					payload: ALL_USERS,
				});
			}
		}
	});

	socket.on("unblockedUser", (user) => {
		debugger;
		const FRIEND_LIST = [...userStoreRef.current.friendList];
		const BLOCKED_LIST = [...userStoreRef.current.blockedUsers];
		FRIEND_LIST.push(user);
		userDispatch({
			type: "SAVE_ALL_FRIENDS",
			payload: FRIEND_LIST,
		});
		const INDEX = BLOCKED_LIST.findIndex((ele) => ele._id === user._id);
		if (INDEX > -1) {
			BLOCKED_LIST.splice(INDEX, 1);
			userDispatch({
				type: "SAVE_BLOCKED_USER",
				payload: BLOCKED_LIST,
			});
		}
	});
};
