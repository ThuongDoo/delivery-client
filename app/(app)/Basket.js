import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBasketItem, selectBasketTotal } from "../../slices/basketSlice";
import { selectRestaurant } from "../../slices/restaurantSlice";
import BasketRow from "../../components/BasketRow";
import api from "../../utils/api";
import { getUser } from "../../slices/userSlice";
import CurrencyFormatter from "../../components/CurrencyFormatter";
import { Entypo } from "@expo/vector-icons";
import { iconColor } from "../../utils/constants";
import { useFocusEffect } from "expo-router";

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const user = useSelector(getUser);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        api
          .get(`/basket/${user.userId}`)
          .then((res) => setBasket(res.data.items))
          .catch((err) => {
            throw new Error(err.message);
          });
      };
      fetchData();
      console.log("haa");
    }, [useId])
  );

  const onChange = (value) => {
    console.log("hah");
    console.log(value);
  };

  return (
    <View>
      <TouchableOpacity className="px-3 bg-customRed absolute bottom-0 left-0 right-0 z-50 flex-row rounded-lg space-x-1 items-center mx-5 py-4">
        <Text className="text-lg font-extrabold text-white basis-1/4">
          {"ha"}
        </Text>
        <Text className="text-lg text-white font-extrabold text-center flex-1">
          Order
        </Text>
        <Text className="text-lg text-white font-extrabold text-right basis-1/4">
          {CurrencyFormatter({ amount: 20 })}
        </Text>
      </TouchableOpacity>
      <ScrollView className="px-3">
        {basket?.map((item) => (
          <BasketRow
            key={item._id}
            data={item}
            userId={user.userId}
            total={onChange}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Basket;
