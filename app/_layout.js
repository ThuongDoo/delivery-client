import { Stack } from "expo-router";

import React from "react";
import { store } from "../utils/store";
import { Provider } from "react-redux";
import { RootSiblingParent } from "react-native-root-siblings";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
// import { RootSiblingParent } from "react-native-root-siblings";
const Layout = () => {
  return (
    <Provider store={store}>
      <AutocompleteDropdownContextProvider>
        <RootSiblingParent>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </RootSiblingParent>
      </AutocompleteDropdownContextProvider>
    </Provider>
  );
};

export default Layout;
