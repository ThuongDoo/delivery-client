import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromBasket: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingItemIndex != -1) {
        if (state.items[existingItemIndex].quantity > 0) {
          state.items[existingItemIndex].quantity -= 1;
        }
        if (state.items[existingItemIndex].quantity === 0) {
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
    resetBasket: (state) => {
      state.items = [];
    },
  },
});

export const { addToBasket, removeFromBasket, resetBasket } =
  basketSlice.actions;
export const selectBasketItemById = (state, _id) =>
  state.basket.items.filter((item) => item._id === _id);
export const selectBasketItem = (state) => state.basket.items;
export const selectBasketTotal = (state) =>
  state.basket.items.reduce(
    (total, item) => (total += item.price * item.quantity),
    0
  );
export const selectBasketQuantity = (state) =>
  state.basket.items.reduce((quantity, item) => (quantity += item.quantity), 0);
export const selectBasket = (state) => state.basket.items;
export default basketSlice.reducer;
