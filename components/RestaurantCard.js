/* eslint-disable react/prop-types */
import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const RestaurantCard = ({ data }) => {
  return (
    <TouchableOpacity
      className="flex-row space-x-3 px-2 py-2 items-center"
      onPress={() => {
        router.push({
          pathname: "/Home/Restaurant/[restaurant]",
          params: {
            restaurant: data._id,
          },
        });
      }}
    >
      <Image source={{ uri: data.image }} className="w-20 h-20 rounded-xl" />
      <View className="flex-1">
        <Text className="text-xl text-customRed">{data.name}</Text>
        <Text className="text-xs text-gray-500">{data.description}</Text>
        <Text>{data.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
