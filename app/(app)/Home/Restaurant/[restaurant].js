import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import api from "../../../../utils/api";
import { useDispatch } from "react-redux";
import Dish from "../../../../components/Dish";
import { setError } from "../../../../slices/errorSlice";
import BasketIcon from "../../../../components/BasketIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { iconColor } from "../../../../utils/constants";

const Restaurant = () => {
  const local = useLocalSearchParams();
  const dispatch = useDispatch();
  const [restaurant, setRestaurant] = useState("");
  console.log("ha");
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/restaurant/${local.restaurant}`)
        .then((res) => {
          setRestaurant(res.data.restaurant);
        })
        .catch((err) => {
          {
            err?.response && dispatch(setError(err.response.status));
          }
        });
    };
    fetchData();
  }, []);
  console.log("ha");
  return (
    <View>
      <View className="z-50 top-9 h-20 ">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          className="left-3"
        >
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: restaurant.image }}
        className="w-full h-52 absolute"
      />
      <BasketIcon />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
        className=""
      >
        <View className=" mx-5 ">
          <View className="bg-white rounded-2xl px-3 py-4 flex gap-y-2 mt-0">
            <View className="flex-row justify-between items-center">
              <Text className="text-2xl font-bold">{restaurant.name}</Text>
            </View>
            <Text>{restaurant.address}</Text>
            <View className="flex-row justify-evenly py-3 bg-slate-100">
              <View className="items-center w-24 ">
                <View className="flex-row items-center gap-1">
                  <AntDesign name="star" size={20} color={iconColor} />
                  <Text className="font-bold text-lg">
                    {restaurant.avarageRating}
                  </Text>
                </View>
                <Text>Ratings</Text>
              </View>
              <View className="border-r border-gray-400" />
              <View className="items-center w-24 ">
                <View className="flex-row items-center gap-1">
                  <Ionicons name="location-sharp" size={20} color={iconColor} />
                  <Text className="font-bold text-lg">1.18km</Text>
                </View>
                <Text>Distance</Text>
              </View>
              <View className="border-r border-gray-400" />
              <View className="items-center w-24">
                <View className="flex-row items-center gap-1">
                  <MaterialIcons
                    name="rate-review"
                    size={20}
                    color={iconColor}
                  />

                  <Text className="font-bold text-lg">
                    {restaurant.numOfReviews}
                  </Text>
                </View>
                <Text>Reviews</Text>
              </View>
            </View>
            <Text>{restaurant.description}</Text>
            <Text>Recommended</Text>
            <View>
              {restaurant.food?.map((item) => (
                <Dish
                  _id={item._id}
                  name={item.name}
                  image={item.image}
                  description={item.description}
                  price={item.price}
                  restaurantId={restaurant._id}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Restaurant;