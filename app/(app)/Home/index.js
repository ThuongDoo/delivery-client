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
import Header from "../../../components/Header";
const Home = () => {
  return (
    <View>
      <Header />
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
