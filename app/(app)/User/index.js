import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { removeAuthToken } from "../../../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../../../slices/userSlice";
import api from "../../../utils/api";
import { setError } from "../../../slices/errorSlice";
import { Feather } from "@expo/vector-icons";

const User = () => {
  const LogoutHandle = () => {
    removeAuthToken();
    router.replace("/");
  };
  const [userData, setUserData] = useState([]);
  const user = useSelector(getUser);
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/user/${user.userId}`)
        .then((res) => setUserData(res.data.user));
    };
    fetchData();
  }, [user.userId]);

  const changeImage = async () => {
    await api.patch(`/user/${user.userId}`, {
      image:
        "https://cdn.popsww.com/blog/sites/2/2022/02/naruto-co-bao-nhieu-tap.jpg",
    });
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          changeImage();
        }}
        className="bg-blue-500 self-center rounded-full border mt-5"
      >
        <Image
          source={{
            uri: userData.image,
          }}
          className="w-32 h-32 rounded-full"
        />
      </TouchableOpacity>
      <Text className="text-center text-xl font-bold py-2">{user.name}</Text>
      <TouchableOpacity
        onPress={LogoutHandle}
        className="px-2 flex-row items-center space-x-2 py-2 bg-white"
      >
        <Feather name="log-out" size={24} color="black" />
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default User;
