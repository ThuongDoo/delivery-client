import React from "react";
import { Stack } from "expo-router";

const BasketLayout = () => {
  // return <Stack screenOptions={{ headerShown: false }}></Stack>;
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
          title: "Your Basket",
        }}
      />
      <Stack.Screen name="Payment" options={{}} />
    </Stack>
  );
};

export default BasketLayout;
