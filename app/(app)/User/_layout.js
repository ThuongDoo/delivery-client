import React from "react";
import { Stack } from "expo-router";

const UserLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen options={{ title: "User" }} name="index" />
    </Stack>
  );
};

export default UserLayout;
