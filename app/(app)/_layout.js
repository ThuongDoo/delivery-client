import { Tabs, router } from "expo-router";
import React, { useEffect } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { selectError, setError } from "../../slices/errorSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeAuthToken } from "../../utils/auth";
import api from "../../utils/api";
import { setUser } from "../../slices/userSlice";
const AppLayout = () => {
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("/user/showMe")
        .then((res) => {
          dispatch(setUser(res.data.user));
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    };
    fetchData();
  }, []);

  if (error.error === 401) {
    console.log("error");
    removeAuthToken();
    dispatch(setError(null));
    return router.replace("/");
  } else if (error.error) {
    console.log("ERROR");
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
          tabBarLabel: "Basket",
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
