import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import api from "../../../../utils/api";
import { useDispatch } from "react-redux";
import { setError } from "../../../../slices/errorSlice";
import ModalLoader from "react-native-modal-loader";
import RestaurantCard from "../../../../components/RestaurantCard";

const Category = () => {
  const local = useLocalSearchParams();
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/category/${local.category}`)
        .then((res) => setCategory(res.data.category))
        .catch((err) => {
          err?.response && dispatch(setError(err.response.status));
        });
    };
    fetchData();
  }, []);
  // console.log(category);
  console.log(local.category);
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/restaurant?category=${local.category}`)
        .then((res) => {
          setRestaurant(res.data.restaurant);
        })
        .catch((err) => console.log(err.message))
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchData();
  }, []);
  console.log(restaurant);

  return (
    <View>
      <Stack.Screen
        options={{
          title: category.name,
          headerShown: true,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <View>
        {isLoading ? (
          <ModalLoader loading={isLoading} />
        ) : (
          <View>
            {restaurant.length === 0 && (
              <View className="w-full h-full justify-center items-center">
                <Text>There is no items</Text>
              </View>
            )}
            <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
              {restaurant.map((restaurant) => (
                <RestaurantCard data={restaurant} key={restaurant._id} />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

export default Category;
