import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import api from "../../../../utils/api";
import { useDispatch } from "react-redux";
import { setError } from "../../../../slices/errorSlice";
import ModalLoader from "react-native-modal-loader";
import RestaurantCard from "../../../../components/RestaurantCard";

const Feature = () => {
  const local = useLocalSearchParams();
  const [feature, setfeature] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/feature/${local.feature}`)
        .then((res) => {
          setfeature(res.data.feature);
          setRestaurant(res.data.feature.restaurant);
        })
        .catch((err) => {
          err?.response && dispatch(setError(err.response.status));
        })
        .finally(() => setIsLoading(false));
    };
    fetchData();
  }, []);
  console.log(restaurant);
  return (
    <View>
      <Stack.Screen
        options={{
          title: feature.name,
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

export default Feature;
