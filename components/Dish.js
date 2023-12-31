/* eslint-disable react/prop-types */
import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import CurrencyFormatter from "./CurrencyFormatter";
import { iconColor } from "../utils/constants";

const Dish = ({
  _id,
  name,
  image,
  description,
  price,
  quantity,
  onChange,
  discountPercentage,
}) => {
  const [loading, setLoading] = useState(false);
  const addItemToBasket = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    onChange({ _id, quantity: quantity + 1 });

    setLoading(false);
  };
  const removeItemFromBasket = () => {
    if (!quantity > 0 || loading) {
      return;
    }
    setLoading(true);
    onChange({ _id, quantity: quantity - 1 });

    setLoading(false);
  };
  return (
    <View className="flex-row items-center justify-between gap-2S border-b border-t border-gray-200  py-3">
      <View className=" flex-1">
        <Text className="text-lg font-bold">{name}</Text>
        <Text className="break-all">{description}</Text>
        <View className="flex-row items-center">
          <Text className="font-bold text-red-500 text-lg">
            {CurrencyFormatter({ amount: price * (1 - discountPercentage) })}
          </Text>
          {discountPercentage !== 0 && (
            <View className="flex-row items-center">
              <Text className="text-red-500 text-lg mb-2 mx-1 font-bold">
                -{discountPercentage * 100}%
              </Text>
              <Text className="line-through">
                {CurrencyFormatter({ amount: price })}
              </Text>
            </View>
          )}
        </View>
        <View className="flex-row justify-between w-20 items-center">
          <TouchableOpacity
            disabled={quantity <= 0}
            onPress={removeItemFromBasket}
          >
            <Entypo
              name="circle-with-minus"
              size={30}
              color={quantity > 0 ? iconColor : "gray"}
            />
          </TouchableOpacity>
          <Text>{quantity}</Text>
          <TouchableOpacity onPress={addItemToBasket}>
            <Entypo name="circle-with-plus" size={30} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="">
        <Image source={{ uri: image }} className="w-20 h-20 rounded-xl" />
      </View>
    </View>
  );
};

export default Dish;
