import { View, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import logo from "../assets/logo.jpg";

const Header = () => {
  return (
    <View className="flex justify-between pb-3 px-3 pt-10 bg-customRed">
      <View className="flex-row justify-between space-x-3 ">
        <View className="flex-row items-center bg-white rounded-full px-3 flex-1">
          <Entypo name="magnifying-glass" size={24} color="black" />
          <TextInput placeholder="Restaurants and Cuisines" />
        </View>
        <Image source={logo} className="w-10 h-10 rounded-full" />
      </View>
      <View className="">
        <TextInput
          placeholder="Your Location"
          className="text-black font-semibold"
        />
        {/* <Entypo name="location-pin" size={24} color="white" /> */}
      </View>
    </View>
  );
};

export default Header;
