import { BASE_URL } from "../service/getEnvVariables";

export const URL = {
  signUpUrl: `${BASE_URL}/user/sign-up`,
  signInUrl: `${BASE_URL}/user/sign-in`,
  forgotPasswordUrl: `${BASE_URL}/user/forgot-password`,
  resetPasswordUrl: `${BASE_URL}/user/reset-password`,
  verifyEmailUrl: `${BASE_URL}/user/verify-email`,
  verifyOTPUrl: `${BASE_URL}/user/verify-otp`,
  getAllUsersUrl: `${BASE_URL}/user/get-all-users`,
  addFriendUrl: `${BASE_URL}/user/add-friend`,
  getUserSelfDetails: `${BASE_URL}/user/get-user-self-details`,
  getAllFriends: `${BASE_URL}/user/get-all-friends`,
};
