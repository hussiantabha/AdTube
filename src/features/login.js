import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLoggedIn: false,
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginState: (state, action) => {
      state.userLoggedIn = action.payload.value;
    },
  },
});
export const { loginState } = loginSlice.actions;
export default loginSlice.reducer;
