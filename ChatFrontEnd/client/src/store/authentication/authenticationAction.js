import { navigate } from "@reach/router";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../config/configURL";
import { saveAuthToken } from "../../service/token";

export const signUp = (userData, dispatch) => {
  const data = {
    Data: userData,
  };
  axios
    .post(URL.signUpUrl, data)
    .then((response) => {
      toast.success(response?.data?.Data?.Message);
      if (response?.data?.Data?.AuthenticationType === "MANUL")
        navigate("/auth/sign-in");
      else navigate("/");
    })
    .catch((error) => {
      toast.error(error?.response?.data?.Message);
    });
};

export const signIn = (userData, dispatch) => {
  const data = {
    Data: userData,
  };
  axios
    .post(URL.signInUrl, data)
    .then((response) => {
      if (response) {
        saveAuthToken(response?.data?.Data);
        navigate("/web-chat");
      }
    })
    .catch((error) => {
      toast.error(error?.response?.data?.Message);
    });
};

export const forgotPassword = (userData, dispatch) => {
  const data = {
    Data: userData,
  };
  axios
    .put(URL.forgotPasswordUrl, data)
    .then((response) => {
      toast.success(response?.data?.Data);
    })
    .catch((error) => {
      toast.error(error?.response?.data?.Message);
    });
};

export const userResetPassword = (userData, dispatch) => {
  const data = {
    Data: {
      Password: userData?.Password,
    },
  };
  axios
    .put(URL.resetPasswordUrl, data, {
      headers: {
        AccessToken: userData.token,
      },
    })
    .then((response) => {
      toast.success(response?.data?.Data);
      navigate("/auth/sign-in");
    })
    .catch((error) => {
      toast.error(error?.response?.data?.Message);
    });
};

export const verifyEmail = (userData, dispatch) => {
  const data = {
    Data: {
      Email: userData?.Email,
      Facebook_ID: userData?.Facebook_ID,
    },
  };
  return axios
    .post(URL.verifyEmailUrl, data)
    .then((response) => {
      toast.success(response?.data?.Data);
      return response?.data;
    })
    .catch((error) => {
      toast.error(error?.response?.data?.Message);
    });
};

export const verifyOTP = (userData, dispatch) => {
  const data = {
    Data: userData,
  };
  return axios
    .post(URL.verifyOTPUrl, data)
    .then((response) => {
      toast.success(response?.data?.Data?.Message);
      return response?.data?.Data;
    })
    .catch((error) => {
      toast.error(error?.response?.data?.Message);
    });
};
