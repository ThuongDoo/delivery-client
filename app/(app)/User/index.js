import { View, Text, Image, Button } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { removeAuthToken } from "../../../utils/auth";
import { useSelector } from "react-redux";
import { getUser } from "../../../slices/userSlice";

const User = () => {
  const LogoutHandle = () => {
    removeAuthToken();
    router.replace("/");
  };
  const user = useSelector(getUser);
  console.log(user);
  return (
    <View>
      <Text>Hello {user.name}</Text>
      <Link href="/Home" asChild>
        <Image
          source={{
            uri: "https://img-l3.xvideos-cdn.com/videos/thumbs169poster/e8/aa/53/e8aa53fe236b94e2c9bdff2bbd416311/e8aa53fe236b94e2c9bdff2bbd416311.5.jpg",
          }}
          className="w-full h-32"
        />
      </Link>
      <Button onPress={LogoutHandle} title="Log out" />
    </View>
  );
};

export default User;
