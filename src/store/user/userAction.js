import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config/configURL";
import { getAuthToken } from "../../service/token";

export const getUserSelfDetails = async (dispatch) => {
	return axios
		.get(API_URL.getUserSelfDetails, {
			headers: {
				Authorization: `Bearer ${getAuthToken()}`,
			},
		})
		.then((response) => {
			if (response?.data?.Data?.User) {
				dispatch({
					type: "USER_SELF_DETAILS",
					payload: response.data.Data.User,
				});
				return response.data.Data.User;
			}
		})
		.catch((error) => {
			debugger;
			toast.error(error?.response?.data?.Message);
		});
};

// No need to use it. Have to remove it
export const addFriend = async (email, dispatch) => {
	const data = {
		Data: { Add_Friend_Email: email },
	};
	return axios
		.post(API_URL.addFriendUrl, data, {
			headers: {
				Authorization: `Bearer ${getAuthToken()}`,
			},
		})
		.then((response) => {
			if (response?.data?.Data?.Message) {
				toast.success(response?.data?.Data?.Message);
				return response?.data?.Data;
			}
		})
		.catch((error) => {
			toast.error(error?.response?.data?.Message);
		});
};

export const getAllUsers = (dispatch) => {
	axios
		.get(API_URL.getAllUsersUrl, {
			headers: {
				Authorization: `Bearer ${getAuthToken()}`,
			},
		})
		.then((response) => {
			if (response?.data?.Data?.ALL_USERS) {
				const USER_LIST = [];
				const REQUESTED_USER = [];
				response?.data?.Data?.ALL_USERS.forEach((user) => {
					if (user.Status === "Accept") {
						REQUESTED_USER.push(user);
						return;
					}

					if (user.Status === "Friend") {
						USER_LIST.push(user);
						return;
					}
				});

				dispatch({
					type: "SAVE_ALL_REQUESTED_USERS",
					payload: REQUESTED_USER,
				});

				dispatch({
					type: "SAVE_ALL_FRIENDS",
					payload: USER_LIST,
				});

				dispatch({
					type: "SAVE_ALL_USERS",
					payload: response.data.Data.ALL_USERS,
				});
			}
		})
		.catch((error) => {
			toast.error(error?.response?.data?.Message);
		});
};

export const getBlockedUser = (dispatch) => {
	axios
		.get(API_URL.getBlockedUser, {
			headers: {
				Authorization: `Bearer ${getAuthToken()}`,
			},
		})
		.then((response) => {
			if (response?.data?.Data?.BLOCKED_USERES) {
				dispatch({
					type: "SAVE_BLOCKED_USER",
					payload: response?.data?.Data?.BLOCKED_USERES,
				});
			}
		})
		.catch((error) => {
			toast.error(error?.response?.data?.Message);
		});
};

// export const getUsersByStatus = (status, dispatch) => {
// 	axios
// 		.get(`${API_URL.getUsersByStatus}?Status=${status}`, {
// 			headers: {
// 				Authorization: `Bearer ${getAuthToken()}`,
// 			},
// 		})
// 		.then((response) => {
// 			if (response?.data?.Data?.filteredUser) {
// 				dispatch({
// 					type: "Save_Requested_Users",
// 					payload: response.data.Data.filteredUser,
// 				});
// 			}
// 		})
// 		.catch((error) => {
// 			toast.error(error?.response?.data?.Message);
// 		});
// };
