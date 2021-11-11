import produce from "immer";
import { createContext, useReducer } from "react";

const intialUserState = {
  allusers: [],
  userSelfDetails: {},
};

const UserStore = createContext(intialUserState);

const userReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case "SAVE_ALL_USERS":
      return produce(state, (draft) => {
        draft.allusers = action.payload;
      });
    case "USER_SELF_DETAILS":
      return produce(state, (draft) => {
        draft.userSelfDetails = action.payload;
      });

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
