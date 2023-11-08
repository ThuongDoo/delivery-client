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
  const [basketQuantity, setBasketQuantity] = useState(0);
  const [basketTotalPrice, setBasketTotalPrice] = useState(0);
  const [restaurant, setRestaurant] = useState([]);
  const user = useSelector(getUser);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        api
          .get(`/basket/${user.userId}`)
          .then((res) => {
            console.log(res.data.items);
            setBasket(res.data.items);
            const tempRestaurant = res.data.items.map(
              (item) => item.food.restaurant
            );

            const uniqueRestaurant = [
              ...new Set(tempRestaurant.map((item) => item._id)),
            ].map((id) => tempRestaurant.find((item) => item._id === id));
            setRestaurant(uniqueRestaurant);
          })
          .catch((err) => {
            throw new Error(err.message);
          });
      };
      fetchData();
    }, [useId])
  );
  // console.log(basket);
  console.log(restaurant);

  const onChange = (value) => {
    const updateBasket = basket.map((item) => {
      if (item.food._id === value._id) {
        return { ...item, quantity: value.quantity };
      }
      return item;
    });
    console.log(updateBasket);
    setBasket(updateBasket);
  };

  const handleDelete = (value) => {
    const updateBasket = [...basket];
    const deleteIndex = updateBasket.findIndex(
      (item) => item.food._id === value
    );
    if (deleteIndex === -1) {
      return;
    }
    updateBasket.splice(deleteIndex, 1);
    setBasket(updateBasket);
  };
  useEffect(() => {
    const quantity = basket.reduce((total, item) => {
      return (total += item.quantity);
    }, 0);
    setBasketQuantity(quantity);
  }, [basket]);

  useEffect(() => {
    const totalPrice = basket.reduce((total, item) => {
      return (total += item.quantity * item.food.price);
    }, 0);
    setBasketTotalPrice(totalPrice);
  }, [basket]);

  return (
    <View className="h-full">
      {basketQuantity !== 0 && (
        <TouchableOpacity className="px-3 bg-customRed absolute bottom-2 left-0 right-0 z-50 flex-row rounded-lg space-x-1 items-center mx-5 py-4">
          <Text className="text-lg font-extrabold text-white basis-1/4">
            Order
          </Text>
          <Text className="text-lg text-white font-extrabold text-center flex-1">
            {CurrencyFormatter({ amount: basketTotalPrice })}
          </Text>
          <Text className="text-lg text-white font-extrabold text-right basis-1/4">
            {basketQuantity}
          </Text>
        </TouchableOpacity>
      )}
      <ScrollView
        className="px-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {restaurant?.map((restaurantItem) => (
          <View key={restaurantItem._id}>
            <View className="flex-row items-center space-x-2 py-2 border-b">
              <Image
                source={{ uri: restaurantItem.image }}
                className="w-7 h-7"
              />
              <Text>{restaurantItem.name}</Text>
            </View>
            {basket
              .filter((item) => item.food.restaurant._id === restaurantItem._id)
              .map((filteredItem) => (
                <BasketRow
                  key={filteredItem._id}
                  data={filteredItem}
                  userId={user.userId}
                  total={onChange}
                  itemDelete={handleDelete}
                />
              ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Basket;
