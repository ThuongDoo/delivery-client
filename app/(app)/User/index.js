import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { removeAuthToken } from "../../../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../../../slices/userSlice";
import api from "../../../utils/api";
import { setError } from "../../../slices/errorSlice";

const User = () => {
  const LogoutHandle = () => {
    removeAuthToken();
    router.replace("/");
  };
  const [userData, setUserData] = useState([]);
  const user = useSelector(getUser);
  useEffect(() => {
    const fetchData = async () => {
      api.get(`/user/${user.userId}`).then((res) => setUserData(res.data.user));
    };
    fetchData();
  }, [user.userId]);

  const changeImage = async () => {};
  return (
    <View>
      <Text>Hello {user.name}</Text>
      <TouchableOpacity
        onPress={() => {
          changeImage();
        }}
        className="bg-blue-500 self-center rounded-full border"
      >
        <Image
          source={{
            uri: userData.image,
          }}
          className="w-32 h-32 rounded-full"
        />
      </TouchableOpacity>
      <Button onPress={LogoutHandle} title="Log out" />
    </View>
  );
};

export default User;
