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
				response?.data?.Data?.ALL_USERS.forEach((user) => {
					if (user.Status === "Accept") {
						dispatch({
							type: "ADD_REQUESTED_USER",
							payload: user,
						});
					}
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
