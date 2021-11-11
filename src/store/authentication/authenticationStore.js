import { createContext, useReducer } from "react";

const initialAuthenticationState = {
  profileData: {},
};

const AuthenticationStore = createContext(initialAuthenticationState);

const authenticationReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    // Remove it
    case "Test":
      return state;
    default:
      return state;
  }
};

const AuthenticationProvider = ({ children }) => {
  const [authenticationStore, authenticationDispatch] = useReducer(
    authenticationReducer,
    initialAuthenticationState
  );
  return (
    <AuthenticationStore.Provider
      value={{ authenticationStore, authenticationDispatch }}
    >
      {children}
    </AuthenticationStore.Provider>
  );
};

export { AuthenticationStore, AuthenticationProvider };
