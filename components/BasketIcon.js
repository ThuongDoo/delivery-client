/* eslint-disable react/prop-types */
import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CurrencyFormatter from "./CurrencyFormatter";
import api from "../utils/api";
import { getUser } from "../slices/userSlice";

const BasketIcon = ({ data, reset }) => {
  const user = useSelector(getUser);
  const [basketQuantity, setBasketQuantity] = useState(0);
  const [basketTotalPrice, setBasketTotalPrice] = useState(0);
  console.log(data);
  useEffect(() => {
    const updateQuantity = data.reduce((total, item) => {
      return (total += item.quantity);
    }, 0);
    setBasketQuantity(updateQuantity);
  }, [data]);
  useEffect(() => {
    const updateTotalPrice = data.reduce((total, item) => {
      return (total +=
        item.quantity * (item.price * (1 - item.discountPercentage)));
    }, 0);
    setBasketTotalPrice(updateTotalPrice);
  }, [data]);
  const onSubmit = async () => {
    const filterItems = data.filter((item) => item.quantity !== 0);
    const items = filterItems.map((item) => ({
      food: item._id,
      quantity: item.quantity,
    }));
    const value = { userId: user.userId, items };
    console.log("basket");
    await api.patch(`/basket/${user.userId}`, value);
    reset(1);
  };

  if (basketQuantity === 0) return;
  return (
    <View className="absolute w-full z-50 bottom-2 left-0 right-0 ">
      <TouchableOpacity
        onPress={onSubmit}
        className="bg-customRed flex-row rounded-lg space-x-1 items-center mx-5 p-4"
      >
        <Text className="text-lg font-extrabold text-white basis-1/5">Add</Text>
        <Text className="text-lg text-white font-extrabold text-center flex-1">
          {CurrencyFormatter({ amount: basketTotalPrice })}
        </Text>
        <Text className="text-lg text-white font-extrabold text-right basis-1/5">
          {basketQuantity}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
