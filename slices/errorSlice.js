import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setError } = errorSlice.actions;

export const selectError = (state) => state.error;

export default errorSlice.reducer;
