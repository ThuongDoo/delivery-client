import { Stack } from "expo-router";

import { View, Text } from "react-native";
import React, { useState } from "react";
import { store } from "../utils/store";
import { Provider } from "react-redux";
const Layout = () => {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </Provider>
  );
};

export default Layout;
