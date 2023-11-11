import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../slices/userSlice";
import { router, useFocusEffect } from "expo-router";
import api from "../../../utils/api";
import ModalLoader from "react-native-modal-loader";
import CurrencyFormatter from "../../../components/CurrencyFormatter";
import { Ionicons } from "@expo/vector-icons";
import { setError } from "../../../slices/errorSlice";

const formatDate = (createdAtString) => {
  const createdAtDate = new Date(createdAtString);

  const year = createdAtDate.getFullYear();
  const month = String(createdAtDate.getMonth() + 1).padStart(2, "0");
  const day = String(createdAtDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const Order = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChosen, setIsChosen] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await api
          .get(`/order/${user.userId}`)
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
    }, [user.userId])
  );
  console.log("hii");
  return (
    <View>
      <ModalLoader loading={isLoading} />
      {order?.length === 0 && (
        <View className="h-full flex items-center justify-center">
          <Text>You don&apos;t have any orders</Text>
        </View>
      )}
      <OrderModal
        isVisible={isVisible}
        onClose={(value) => setIsVisible(value)}
        orderId={isChosen}
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
                  created at:{formatDate(orderItem.createdAt)}
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
                <Text>Status: {orderItem.status}</Text>
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

const OrderModal = ({ isVisible, onClose, orderId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/order/singleOrder/${orderId}`)
        .then((res) => setOrder(res.data))
        .catch((err) => {
          err?.response && dispatch(setError(err.response.status));
        })
        .finally(() => {
          // setIsLoading(false);
        });
    };
    fetchData();
  }, [orderId]);
  console.log(order);
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
      <View className=" absolute top-16 h-5/6 left-0 right-0 mx-5 bg-white rounded-xl shadow-xl shadow-black">
        <TouchableOpacity
          onPress={() => onClose(false)}
          className="absolute right-0 z-50"
        >
          <Ionicons name="close" size={30} color="black" />
        </TouchableOpacity>
        <ScrollView>
          <Text>{orderId}</Text>
          {order?.items?.map((item) => (
            <View key={item._id}>
              <Text>{item.food}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default Order;
