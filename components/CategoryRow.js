import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

const CategoryRow = () => {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("/category")
        .then((res) => setCategory(res.data.category))
        .catch((err) => setError(err.message));
    };
    fetchData();
  }, []);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row space-x-5 py-2"
    >
      {category?.map((item) => (
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/Home/Category/[category]",
              params: { category: item._id },
            });
          }}
          key={item._id}
          className="items-center"
        >
          <Image
            source={{ uri: item.image }}
            className="w-14 h-10 rounded-md"
          />
          <Text className="font-bold">{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryRow;
