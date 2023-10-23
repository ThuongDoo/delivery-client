import { View, Text, Image, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Link, router } from "expo-router";
import { selectError, setError } from "../slices/errorSlice";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

const Feature = () => {
  const [feature, setFeature] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("/feature")
        .then((res) => setFeature(res.data.feature))
        .catch((err) => {
          err?.response && dispatch(setError(err.response.status));
        });
    };
    fetchData();
  }, []);
  return (
    <View className="space-y-10">
      {feature?.map((item) => (
        <View key={item._id}>
          <Text className="font-bold text-lg">{item.name}</Text>
          <Text className="text-gray-500">{item.description}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="space-x-5 mt-3"
          >
            <Image
              source={{ uri: item.image }}
              className="h-56 w-80 rounded-3xl"
            />
            {item.restaurant?.map((restaurant) => (
              <TouchableOpacity
                key={restaurant._id}
                onPress={() => {
                  router.push({
                    pathname: "/Home/Restaurant/[restaurant]",
                    params: {
                      restaurant: restaurant._id,
                    },
                  });
                }}
              >
                <Image
                  source={{ uri: restaurant.image }}
                  className="h-56 w-80 rounded-3xl"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
    </View>
  );
};

export default Feature;
