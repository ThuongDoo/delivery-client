import { View, Text, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItem,
  selectBasketItemById,
} from "../slices/basketSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import CurrencyFormatter from "./CurrencyFormatter";
import { iconColor } from "../utils/constants";

const Dish = ({ _id, name, image, description, price }) => {
  const items = useSelector((state) => selectBasketItemById(state, _id));
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket({ _id, name, image, description, price }));
  };
  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ _id }));
  };
  return (
    <View className="flex-row items-center justify-between gap-2S border-b border-t border-gray-200 h-32 py-3">
      <View className=" flex-1">
        <Text className="text-lg font-bold">{name}</Text>
        <Text className="break-all">{description}</Text>
        <Text className="font-bold text-red-500 text-lg">
          {CurrencyFormatter({ amount: price })}
        </Text>
        <View className="flex-row justify-between w-20 items-center">
          <TouchableOpacity
            disabled={!items.length}
            onPress={removeItemFromBasket}
          >
            <Entypo
              name="circle-with-minus"
              size={30}
              color={items.length ? iconColor : "gray"}
            />
          </TouchableOpacity>
          <Text>{items.length}</Text>
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
