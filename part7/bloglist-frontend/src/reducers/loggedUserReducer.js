import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "../reducers/notificationReducer";

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload;
    },
  },
});
export const logIn = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setLoggedUser(user));
      dispatch(setNotification(`Welcome, ${user.username}`, "success"));
    } catch (exception) {
      dispatch(setNotification("Wrong username or password", "danger"));
    }
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch(setLoggedUser(null));
    blogService.setToken("");
    window.localStorage.removeItem("loggedUser");
  };
};

export const getLoggedUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setLoggedUser(user));
    }
  };
};

export const { setLoggedUser } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;
