import { createSlice } from "@reduxjs/toolkit";
const initialstate = {
  user: JSON.parse(localStorage.getItem("user")) ?? false,
};
const authSlice = createSlice({
  name: "auth",
  initialstate,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = false;
    },
  },
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
