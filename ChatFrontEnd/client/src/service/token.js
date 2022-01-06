export const getAuthToken = () => {
  return window.localStorage.getItem("Authentication");
};

export const saveAuthToken = (token) => {
  return window.localStorage.setItem("Authentication", token);
};
