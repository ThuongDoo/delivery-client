import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../../assets/logo.jpg";
import { TextInput } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import Feature from "../../../components/Feature";
import { Link, Stack } from "expo-router";
import CategoryRow from "../../../components/CategoryRow";
import { useSelector } from "react-redux";
import { getUser } from "../../../slices/userSlice";
const Home = () => {
  return (
    <View>
      <View className="flex-row justify-between pb-3 px-3 pt-10 space-x-3 bg-customRed">
        <View className="flex-row items-center bg-white rounded-full px-3 flex-1">
          <Entypo name="magnifying-glass" size={24} color="black" />
          <TextInput placeholder="Restaurants and Cuisines" />
        </View>
        <Image source={logo} className="w-10 h-10 rounded-full" />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        className="mx-3"
      >
        <CategoryRow />
        <Feature />
      </ScrollView>
    </View>
  );
};

export default Home;
