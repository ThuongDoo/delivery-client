import React from "react";
import { Stack } from "expo-router";

const OrderLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Orders",
        }}
      />
      {/* <Stack.Screen name="Payment" options={{}} /> */}
    </Stack>
  );
};

export default OrderLayout;
