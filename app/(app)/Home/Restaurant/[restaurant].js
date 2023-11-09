import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
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
  // const [popUpVisible, setPopUpVisible] = useState(false);
  const local = useLocalSearchParams();
  const dispatch = useDispatch();
  const [restaurant, setRestaurant] = useState("");
  const [items, setItems] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await api
          .get(`/restaurant/${local.restaurant}`)
          .then((res) => {
            setRestaurant(res.data.restaurant);
            const foodItem = res.data.restaurant.food.map((item) => ({
              _id: item._id,
              name: item.name,
              image: item.image,
              description: item.description,
              price: item.price,
              quantity: 0,
            }));
            setItems(foodItem);
            setIsDataLoaded(true);
          })
          .catch((err) => {
            {
              err?.response && dispatch(setError(err.response.status));
            }
          });
      };
      fetchData();
    }, [local.restaurant])
  );
  const onChange = (value) => {
    if (isDataLoaded) {
      const UpdateItems = items.map((item) => {
        if (item._id === value._id) {
          return { ...item, quantity: value.quantity };
        }
        return item;
      });
      setItems(UpdateItems);
    }
  };
  const resetData = (value) => {
    const UpdateItems = items.map((item) => ({
      ...item,
      quantity: 0,
    }));
    setItems(UpdateItems);
    // setPopUpVisible(true);
    // setTimeout(() => {
    //   setPopUpVisible(false);
    // }, 1000);
  };

  return (
    <View className="h-full">
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
      <BasketIcon data={items} reset={resetData} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
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
              {items?.map((item) => (
                <Dish
                  key={item._id}
                  _id={item._id}
                  name={item.name}
                  image={item.image}
                  description={item.description}
                  price={item.price}
                  onChange={onChange}
                  quantity={item.quantity}
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
