import { Stack } from "expo-router";

import { View, Text } from "react-native";
import React, { useState } from "react";
import { store } from "../utils/store";
import { Provider, useDispatch } from "react-redux";
// import { RootSiblingParent } from "react-native-root-siblings";
const Layout = () => {
  return (
    <Provider store={store}>
      {/* <RootSiblingParent> */}
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      {/* </RootSiblingParent> */}
    </Provider>
  );
};

export default Layout;
