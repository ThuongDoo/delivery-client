import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userId: null,
  name: null,
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
    deleteUser: (state) => {
      state.userId = null;
      state.name = null;
      state.role = null;
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;

export const getUser = (state) => state.user;

export default userSlice.reducer;
