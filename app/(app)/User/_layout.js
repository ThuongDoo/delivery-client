import React from "react";
import { Stack } from "expo-router";

const UserLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    ></Stack>
  );
};

export default UserLayout;
