import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "../slices/restaurantSlice";
import errorReducer from "../slices/errorSlice";
import basketReducer from "../slices/basketSlice";

export const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    error: errorReducer,
    basket: basketReducer,
  },
});
