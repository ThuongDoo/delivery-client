import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBasket,
  selectBasketItem,
  selectBasketQuantity,
  selectBasketTotal,
  resetBasket,
} from "../slices/basketSlice";
import { formatCurrency } from "react-native-format-currency";
import CurrencyFormatter from "./CurrencyFormatter";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import api from "../utils/api";
import { getUser } from "../slices/userSlice";

const BasketIcon = () => {
  const basketTotal = useSelector(selectBasketTotal);
  const basketQuantity = useSelector(selectBasketQuantity);
  const basket = useSelector(selectBasket);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const onSubmit = async () => {
    const items = basket.map((item) => {
      const { price, ...rest } = item;
      return rest;
    });
    const newBasket = { userId: user.userId, items: items };
    console.log(newBasket);
    await api.patch("/basket", newBasket);
    dispatch(resetBasket());
  };

  if (basketQuantity === 0) return null;
  return (
    <View className="absolute w-full z-50 bottom-24 left-0 right-0 ">
      <TouchableOpacity
        onPress={onSubmit}
        className="bg-customRed flex-row rounded-lg space-x-1 items-center mx-5 p-4"
      >
        <Text className="text-lg font-extrabold text-white basis-1/4">
          {basketQuantity}
        </Text>
        <Text className="text-lg text-white font-extrabold text-center flex-1">
          Add to basket
        </Text>
        <Text className="text-lg text-white font-extrabold text-right basis-1/4">
          {CurrencyFormatter({ amount: basketTotal })}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
