import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});
export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAllUsers();
    dispatch(setUsers(users));
  };
};

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
