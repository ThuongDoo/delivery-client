/* eslint-disable react/prop-types */
import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { iconColor } from "../utils/constants";
import CurrencyFormatter from "./CurrencyFormatter";
import api from "../utils/api";
import { Feather } from "@expo/vector-icons";

const BasketRow = ({ data, userId, itemDelete, onChange }) => {
  // console.log(isChecked);
  const [quantity, setQuantity] = useState(data.quantity);
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isChecked, setIsChecked] = useState(data.isChecked);
  const removeFromBasket = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setQuantity(quantity - 1);
    const value = {
      // userId,
      items: [{ food: data.food._id, quantity: -1 }],
    };
    await api.patch(`/basket/${userId}`, value).finally(function () {
      setLoading(false);
    });
  };
  const addToBasket = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setQuantity(quantity + 1);
    const value = {
      items: [{ food: data.food._id, quantity: 1 }],
    };
    await api.patch(`/basket/${userId}`, value).finally(function () {
      setLoading(false);
    });
  };
  const deleteItem = async () => {
    setIsDelete(true);
    itemDelete(data.food._id);
    await api.patch(`/basket/${userId}/${data.food._id}`);
  };
  useEffect(() => {
    onChange({ _id: data.food._id, quantity, isChecked });
  }, [quantity, isChecked]);
  useEffect(() => {
    setQuantity(data.quantity);
  }, [data.quantity]);
  useEffect(() => {
    setIsChecked(data.isChecked);
  }, [data.isChecked]);

  // console.log(data);

  if (isDelete) return;
  return (
    <View className="flex-row items-center border-b border-t border-gray-200 h-32 gap-x-3">
      <TouchableOpacity className="" onPress={deleteItem}>
        <Feather name="x" size={24} color={iconColor} />
      </TouchableOpacity>
      <View className="flex-1">
        <Text className="text-lg font-bold">{data.food.name}</Text>
        <Text className="font-bold text-red-500 text-lg">
          {CurrencyFormatter({
            amount: data.food.price * (1 - data.food.discountPercentage),
          })}
        </Text>
        <View className="flex-row justify-between w-20 items-center">
          <TouchableOpacity disabled={quantity <= 0} onPress={removeFromBasket}>
            <Entypo
              name="circle-with-minus"
              size={30}
              color={quantity > 0 ? iconColor : "gray"}
            />
          </TouchableOpacity>
          <Text>{quantity || 0}</Text>
          <TouchableOpacity onPress={addToBasket}>
            <Entypo name="circle-with-plus" size={30} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="">
        <Image
          source={{ uri: data.food.image }}
          className="w-20 h-20 rounded-xl"
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          setIsChecked(!isChecked);
        }}
      >
        <MaterialCommunityIcons
          name={isChecked ? "checkbox-intermediate" : "checkbox-blank-outline"}
          size={24}
          color={iconColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BasketRow;
