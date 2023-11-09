import React from "react";
import { Stack } from "expo-router";

const RestaurantLayout = () => {
  // return <Stack screenOptions={{ headerShown: false }}></Stack>;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="index" options={{ headerShown: true }} /> */}
    </Stack>
  );
};

export default RestaurantLayout;
