import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import api from "../utils/api";

const Category = () => {
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
        <View key={item._id} className="items-center">
          <Image
            source={{ uri: item.image }}
            className="w-14 h-10 rounded-md"
          />
          <Text className="font-bold">{item.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Category;
