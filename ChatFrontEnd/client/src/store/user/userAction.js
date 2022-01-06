import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../config/configURL";
import { getAuthToken } from "../../service/token";

export const getAllFriends = async (dispatch) => {
  return axios
    .get(URL.getAllFriends, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
    .then((response) => {
      if (response?.data?.Data?.Friend_List) {
        dispatch({
          type: "SAVE_ALL_FRIEND_LIST",
          payload: response.data.Data.Friend_List,
        });
      }
    })
    .catch((error) => {
      toast.error(error?.response?.data?.Message);
    });
};

export const getUserSelfDetails = async (dispatch) => {
  return axios
    .get(URL.getUserSelfDetails, {
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
    .post(URL.addFriendUrl, data, {
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
    .get(URL.getAllUsersUrl, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
    .then((response) => {
      if (response?.data?.Data?.ALL_USERS) {
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
