import produce from "immer";
import { createContext, useReducer } from "react";

const intialUserState = {
	allusers: [],
	userSelfDetails: {},
	requestedUsers: [],
	friendList: [],
	selectedUser: {},
	blockedUsers: [],
};

const UserStore = createContext(intialUserState);

const userReducer = (state, action) => {
	const { type } = action;
	switch (type) {
		case "SAVE_ALL_USERS":
			return produce(state, (draft) => {
				if (action.payload) {
					draft.allusers = JSON.parse(JSON.stringify(action.payload));
				}
			});
		case "USER_SELF_DETAILS":
			return produce(state, (draft) => {
				if (action.payload) {
					draft.userSelfDetails = JSON.parse(JSON.stringify(action.payload));
				}
			});
		case "ADD_REQUESTED_USER":
			return produce(
				state,
				(draft) => void draft.requestedUsers.push(action.payload)
			);
		case "SAVE_ALL_REQUESTED_USERS":
			return produce(
				state,
				(draft) => void (draft.requestedUsers = action.payload)
			);
		case "ADD_FRIEND":
			return produce(
				state,
				(draft) => void draft.friendList.push(action.payload)
			);
		case "SAVE_ALL_FRIENDS":
			return produce(
				state,
				(draft) => void (draft.friendList = action.payload)
			);
		case "SAVE_SELECTED_USER":
			return produce(
				state,
				(draft) => void (draft.selectedUser = action.payload)
			);
		case "SAVE_BLOCKED_USER":
			return produce(
				state,
				(draft) => void (draft.blockedUsers = action.payload)
			);
		default:
			break;
	}
};

const UserProvider = ({ children }) => {
	const [userStore, userDispatch] = useReducer(userReducer, intialUserState);
	return (
		<UserStore.Provider value={{ userStore, userDispatch }}>
			{children}
		</UserStore.Provider>
	);
};

export { UserProvider, UserStore };
