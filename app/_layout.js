import { Stack } from "expo-router";

import React from "react";
import { store } from "../utils/store";
import { Provider } from "react-redux";
import { RootSiblingParent } from "react-native-root-siblings";
// import { RootSiblingParent } from "react-native-root-siblings";
const Layout = () => {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </RootSiblingParent>
    </Provider>
  );
};

export default Layout;
