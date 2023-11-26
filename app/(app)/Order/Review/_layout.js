import React from "react";
import { Stack } from "expo-router";

const ReviewLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="[restaurant]" options={{ title: "Review" }} /> */}
    </Stack>
  );
};

export default ReviewLayout;
