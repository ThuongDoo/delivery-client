/* eslint-disable react/prop-types */
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../slices/userSlice";
import api from "../../../utils/api";
import ModalLoader from "react-native-modal-loader";
import CurrencyFormatter from "../../../components/CurrencyFormatter";
import { Ionicons } from "@expo/vector-icons";
import { setError } from "../../../slices/errorSlice";
import FormatDate from "../../../components/FormatDate";
import { router, useFocusEffect } from "expo-router";
import { iconColor } from "../../../utils/constants";

const statusColor = (status) => {
  let color;
  switch (status) {
    case "Pending":
      color = "blue";
      break;

    case "Completed":
      color = "blue";
      break;

    case "Cancelled":
      color = "red";
      break;

    case "Shipped":
      color = "green";
      break;

    default:
      break;
  }
  return color;
};

const Order = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChosen, setIsChosen] = useState("");
  const [reload, setReload] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        let apiUrl = `/order/${user.userId}`;

        if (selectedFilter !== null) {
          apiUrl += `?status=${selectedFilter}`;
        }
        await api
          .get(apiUrl)
          .then((res) => {
            setOrder(res.data);
          })
          .catch((err) => {
            err?.response && dispatch(setError(err.response.status));
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
      fetchData();
    }, [user.userId, reload, selectedFilter])
  );
  const handleButtonPress = (value) => {
    setSelectedFilter(value);
  };
  return (
    <View>
      <ModalLoader loading={isLoading} />
      <View className="flex-row justify-between border border-white">
        <TouchableOpacity
          className="flex-1 p-2 items-center"
          style={{
            backgroundColor: selectedFilter === null ? iconColor : "white",
          }}
          onPress={() => handleButtonPress(null)}
        >
          <Text style={{ color: selectedFilter === null ? "white" : "black" }}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 p-2 items-center"
          style={{
            backgroundColor: selectedFilter === "Pending" ? iconColor : "white",
          }}
          onPress={() => handleButtonPress("Pending")}
        >
          <Text
            style={{ color: selectedFilter === "Pending" ? "white" : "black" }}
          >
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 p-2 items-center"
          style={{
            backgroundColor:
              selectedFilter === "Completed" ? iconColor : "white",
          }}
          onPress={() => handleButtonPress("Completed")}
        >
          <Text
            style={{
              color: selectedFilter === "Completed" ? "white" : "black",
            }}
          >
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 p-2 items-center"
          style={{
            backgroundColor:
              selectedFilter === "Cancelled" ? iconColor : "white",
          }}
          onPress={() => handleButtonPress("Cancelled")}
        >
          <Text
            style={{
              color: selectedFilter === "Cancelled" ? "white" : "black",
            }}
          >
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>
      {order?.length === 0 && (
        <View className="h-full flex items-center justify-center">
          <Text>You don&apos;t have any orders</Text>
        </View>
      )}
      <OrderModal
        isVisible={isVisible}
        onClose={(value) => setIsVisible(value)}
        orderId={isChosen}
        onChange={() => {
          setReload(!reload);
        }}
      />
      <ScrollView
        className="px-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0 }}
      >
        {order?.map((orderItem) => (
          <View
            key={orderItem._id}
            className="border-b border-gray-200 py-2 space-y-2"
          >
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-gray-500 text-xs">
                  ID: {orderItem._id}
                </Text>
                <Text className="text-gray-500 text-xs">
                  created at: {FormatDate(orderItem.createdAt)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setIsChosen(orderItem._id);
                  setIsVisible(true);
                }}
                className="w-20 flex justify-center items-center border border-gray-500"
              >
                <Text>VIEW</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex items-start">
                <Text className="text-lg text-customRed">
                  {orderItem.restaurant.name}
                </Text>
                <Text>
                  Total: {CurrencyFormatter({ amount: orderItem.total })}
                </Text>
                <Text style={{ color: statusColor(orderItem.status) }}>
                  Status: {orderItem.status}
                </Text>
              </View>
              <Image
                source={{ uri: orderItem.restaurant.image }}
                className="w-20 h-20"
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const OrderModal = ({ isVisible, onClose, orderId, onChange }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/order/singleOrder/${orderId}`)
        .then((res) => {
          console.log(res.data);
          setOrder(res.data);
        })
        .catch((err) => {
          err?.response && dispatch(setError(err.response.status));
        })
        .finally(() => {
          setIsLoading(false);
          console.log("completed");
        });
    };
    if (isVisible) {
      fetchData();
    }
  }, [orderId]);
  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      transparent={true}
      onRequestClose={() => onClose(false)}
    >
      <TouchableOpacity
        className="h-full "
        onPress={() => onClose(false)}
      ></TouchableOpacity>
      {!isLoading && (
        <View className=" absolute top-16 h-5/6 left-0 right-0 mx-5 bg-white rounded-xl shadow-xl shadow-black">
          <TouchableOpacity
            onPress={() => onClose(false)}
            className="absolute right-0 z-50 "
          >
            <View className="bg-white w-3 h-3 absolute top-2 left-2"></View>
            <Ionicons
              name="close-circle"
              size={30}
              color="red" // Màu của biểu tượng
            />
          </TouchableOpacity>
          <Image
            source={{ uri: order?.restaurant?.image }}
            className="w-full h-20 rounded-t-xl"
          />
          <View className="flex-row justify-between px-3 py-1">
            <View className="">
              <Text className=" text-xs text-gray-500">ID: {orderId}</Text>
              <Text className=" text-xs text-gray-500">
                created at: {FormatDate(order.createdAt)}
              </Text>
            </View>
            <Text className="text-xl font-extrabold ">
              {order.restaurant?.name}
            </Text>
          </View>
          <ScrollView className="px-3">
            {order?.items?.map((item) => (
              <View
                key={item._id}
                className="flex-row items-center justify-between gap-2S border-b border-t border-gray-200 h-32 py-3"
              >
                <View className=" flex-1">
                  <Text className="text-lg font-bold">{item.food?.name}</Text>
                  <Text className="font-bold text-red-500 text-lg">
                    {CurrencyFormatter({
                      amount:
                        item?.food?.price * (1 - item.food.discountPercentage),
                    })}
                  </Text>
                  <View className="flex-row justify-between w-20 items-center">
                    <Text>quantity: {item.quantity}</Text>
                  </View>
                </View>
                <View className="">
                  <Image
                    source={{ uri: item.food?.image }}
                    className="w-20 h-20 rounded-xl"
                  />
                </View>
              </View>
            ))}
          </ScrollView>
          <View className="flex justify-between p-3 gap-3 ">
            <View className="rounded-xl flex-row items-center justify-between space-x-2">
              <Text className="items-start flex-1">
                TOTAL: {CurrencyFormatter({ amount: order?.total })}
              </Text>
              <Text className="items-start flex-1">STATUS: {order.status}</Text>
            </View>
            <View className="flex-row justify-between h-10 space-x-2">
              <TouchableOpacity
                onPress={() => {
                  onClose(false);
                  router.push({
                    pathname: "/Order/Review/[restaurant]",
                    params: {
                      restaurant: order?.restaurant._id,
                    },
                  });
                }}
                className="border rounded-xl flex-1 items-center justify-center"
              >
                <Text className="font-bold">REVIEW</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  const value = { status: "Cancelled" };
                  await api.patch(`/order/${orderId}`, value).then((res) => {
                    console.log(res.data);
                  });
                  onChange(true);
                  onClose(false);
                }}
                className="bg-red-500 rounded-xl flex-1 items-center justify-center"
              >
                <Text className="text-white font-bold">CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default Order;
