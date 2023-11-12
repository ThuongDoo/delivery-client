import { View, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import logo from "../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../slices/userSlice";
import api from "../utils/api";
import { setError } from "../slices/errorSlice";
import AutocompleteInput from "react-native-autocomplete-input";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { router } from "expo-router";

const Header = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("/restaurant?field=name")
        .then((res) => {
          const tempData = res.data.restaurant.map((restaurant) => ({
            id: restaurant._id,
            title: restaurant.name,
          }));
          // console.log(tempData);
          setData(tempData);
        })
        .catch((err) => {
          err?.response && dispatch(setError(err.response.status));
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchData();
  }, [user.userId]);
  const handleSelect = (item) => {
    if (item === null) {
      return;
    }
    router.push({
      pathname: "/Home/Restaurant/[restaurant]",
      params: {
        restaurant: item.id,
      },
    });
  };

  return (
    <View className="flex justify-between pb-3 px-3 pt-10 bg-customRed z-50">
      <View className="flex-row justify-between space-x-3 ">
        <View className="flex-row items-center bg-white rounded-full px-3 flex-1">
          <Entypo name="magnifying-glass" size={24} color="black" />
          {/* <TextInput placeholder="Restaurants and Cuisines" /> */}
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            // initialValue={{ id: "2" }} // or just '2'
            onSelectItem={(item) => {
              setSelectedItem(item);
              handleSelect(item);
            }}
            dataSet={data}
            showChevron={false}
            inputContainerStyle={{ backgroundColor: "white" }}
            containerStyle={{ flex: 1 }}
            textInputProps={{ placeholder: "Restaurant" }}
          />
        </View>
        <Image source={logo} className="w-10 h-10 rounded-full" />
      </View>
      <View className="absolute top-56 left-20 right-20 z-50"></View>
      {/* <View className="">
        <TextInput
          placeholder="Your Location"
          className="text-black font-semibold"
        />
        <Entypo name="location-pin" size={24} color="white" />
      </View> */}
    </View>
  );
};

export default Header;
