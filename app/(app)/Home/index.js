import { View, ScrollView } from "react-native";
import React from "react";
import Feature from "../../../components/Feature";
import CategoryRow from "../../../components/CategoryRow";
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
