import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { text: null, variant: null },
  reducers: {
    changeNotification(state, action) {
      return action.payload;
    },
  },
});
export const setNotification = (text, variant) => {
  return (dispatch) => {
    dispatch(changeNotification({ text: text, variant: variant }));

    setTimeout(() => {
      dispatch(changeNotification({ text: null, variant: null }));
    }, 3000);
  };
};

export const { changeNotification, setNotificationVariant } =
  notificationSlice.actions;
export default notificationSlice.reducer;
