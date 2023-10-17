import { View, Text, Image, Button } from "react-native";
import React from "react";
import { Link, Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const HomeLayout = () => {
  // return <Stack screenOptions={{ headerShown: false }}></Stack>;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default HomeLayout;
