import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItem, selectBasketTotal } from "../slices/basketSlice";
import { formatCurrency } from "react-native-format-currency";
import CurrencyFormatter from "./CurrencyFormatter";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

const BasketIcon = () => {
  const basketTotal = useSelector(selectBasketTotal);
  const items = useSelector(selectBasketItem);
  if (items.length === 0) return null;
  return (
    <View className="absolute w-full z-50 bottom-24 left-0 right-0 ">
      <TouchableOpacity
        onPress={() => {
          router.push("/Basket");
        }}
        className="bg-customRed flex-row rounded-lg space-x-1 items-center mx-5 p-4"
      >
        <Text className="text-lg font-extrabold text-white flex-1">
          {items.length}
        </Text>
        <Text className="text-lg text-white font-extrabold flex-1 text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold flex-1 text-right">
          {CurrencyFormatter({ amount: basketTotal })}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
