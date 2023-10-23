import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import api from "../../../../utils/api";
import { useDispatch } from "react-redux";
const Category = () => {
  const local = useLocalSearchParams();
  const [category, setCategory] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/restaurant?category=${local.category}`)
        .then((res) => {
          // setCategory(res.data.restarant);
        })
        .catch((err) => console.log(err.message));
    };
    fetchData();
  }, []);

  return (
    <View>
      <Stack.Screen options={{ title: category.name }} />
      <Text>Category</Text>
    </View>
  );
};

export default Category;
