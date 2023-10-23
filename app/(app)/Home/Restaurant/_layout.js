import { View, Text, Image, Button } from "react-native";
import React from "react";
import { Link, Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
