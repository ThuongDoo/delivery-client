import { Tabs, router } from "expo-router";
import { View, Text, Button } from "react-native";
import React from "react";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { selectError } from "../../slices/errorSlice";
import { useSelector } from "react-redux";
import { removeAuthToken } from "../../utils/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
const AppLayout = () => {
  const error = useSelector(selectError);
  if (error.error === 401) {
    removeAuthToken();
    return router.replace("/");
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 15, fontWeight: 600 },
        tabBarActiveTintColor: "red",
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          href: "/Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? "red" : "black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Basket"
        href="Basket"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "basket" : "basket-outline"}
              size={24}
              color={focused ? "red" : "black"}
            />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          title: "Your Basket",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
              className="px-3"
            >
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="User"
        href="User"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name={focused ? "user" : "user-o"}
              size={focused ? 24 : 20}
              color={focused ? "red" : "black"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
