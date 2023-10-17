import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  name: null,
  image: null,
  description: null,
  averageRating: null,
  numOfReviews: null,
  food: null,
  address: null,
  user: null,
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      const {
        _id,
        name,
        image,
        description,
        averageRating,
        numOfReviews,
        food,
        address,
        user,
      } = action.payload;

      state._id = _id;
      state.name = name;
      state.image = image;
      state.description = description;
      state.averageRating = averageRating;
      state.numOfReviews = numOfReviews;
      state.food = food;
      state.address = address;
      state.user = user;
    },
  },
});

export const { setRestaurant } = restaurantSlice.actions;

export const selectRestaurant = (state) => state.restaurant;

export default restaurantSlice.reducer;
