import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import BasketRow from "../../../components/BasketRow";
import api from "../../../utils/api";
import { getUser } from "../../../slices/userSlice";
import CurrencyFormatter from "../../../components/CurrencyFormatter";
import { useFocusEffect } from "expo-router";
import { Formik } from "formik";
import LoadingModal from "../../../components/LoadingModal";
import ModalLoader from "react-native-modal-loader";
const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [basketQuantity, setBasketQuantity] = useState(0);
  const [basketTotalPrice, setBasketTotalPrice] = useState(0);
  const [restaurant, setRestaurant] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const shippingFee = 15000;
  const user = useSelector(getUser);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        api
          .get(`/basket/${user.userId}`)
          .then((res) => {
            // console.log(res.data.items);
            setBasket(res.data.items);
            const tempRestaurant = res.data.items.map(
              (item) => item.food.restaurant
            );

            const uniqueRestaurant = [
              ...new Set(tempRestaurant.map((item) => item._id)),
            ].map((id) => tempRestaurant.find((item) => item._id === id));
            setRestaurant(uniqueRestaurant);
          })
          .catch((err) => {
            throw new Error(err.message);
          });
      };
      fetchData();
    }, [useId])
  );
  // console.log(basket);
  // console.log(restaurant);

  const onChange = (value) => {
    const updateBasket = basket.map((item) => {
      if (item.food._id === value._id) {
        return { ...item, quantity: value.quantity };
      }
      return item;
    });
    // console.log(updateBasket);
    setBasket(updateBasket);
  };

  const handleDelete = (value) => {
    const updateBasket = [...basket];
    const deleteIndex = updateBasket.findIndex(
      (item) => item.food._id === value
    );
    if (deleteIndex === -1) {
      return;
    }
    updateBasket.splice(deleteIndex, 1);
    setBasket(updateBasket);
  };

  useEffect(() => {
    const quantity = basket.reduce((total, item) => {
      return (total += item.quantity);
    }, 0);
    setBasketQuantity(quantity);
  }, [basket]);

  useEffect(() => {
    const totalPrice = basket.reduce((total, item) => {
      return (total += item.quantity * item.food.price);
    }, 0);
    setBasketTotalPrice(totalPrice);
  }, [basket]);

  return (
    <Formik
      initialValues={{ isChecked: {} }}
      onSubmit={(values) => {
        console.log(values.isChecked);
        const checkedFoods = Object.keys(values.isChecked).filter(
          (key) => values.isChecked[key] === true
        );
        console.log(checkedFoods);
        // router.push("Basket/Payment");
        setIsLoading(true);
        console.log(basket);
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <View className="h-full">
          <ModalLoader loading={false} />

          {basketQuantity !== 0 && (
            <View className="mx-3 bg-white absolute bottom-2 left-0 right-0 z-50 h-32 rounded-md">
              <View className="mx-2">
                <View className="flex-row justify-between">
                  <Text>Subtotal</Text>
                  <Text>{CurrencyFormatter({ amount: basketTotalPrice })}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text>Shipping fee</Text>
                  <Text>{CurrencyFormatter({ amount: shippingFee })}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text>Total</Text>
                  <Text>
                    {CurrencyFormatter({
                      amount: basketTotalPrice + shippingFee,
                    })}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                className="px-3 bg-customRed flex-row rounded-lg space-x-1 items-center py-4 mx-2"
                onPress={handleSubmit}
              >
                <Text className="text-lg font-extrabold text-white basis-1/4">
                  Order
                </Text>
                <Text className="text-lg text-white font-extrabold text-center flex-1">
                  {CurrencyFormatter({ amount: basketTotalPrice })}
                </Text>
                <Text className="text-lg text-white font-extrabold text-right basis-1/4">
                  {basketQuantity}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <ScrollView
            className="px-3"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {restaurant?.map((restaurantItem) => (
              <View key={restaurantItem._id}>
                <View className="flex-row items-center space-x-2 py-2 border-b">
                  <Image
                    source={{ uri: restaurantItem.image }}
                    className="w-7 h-7"
                  />
                  <Text>{restaurantItem.name}</Text>
                </View>

                {basket
                  .filter(
                    (item) => item.food.restaurant._id === restaurantItem._id
                  )
                  .map((filteredItem) => (
                    <View key={filteredItem._id}>
                      <BasketRow
                        data={filteredItem}
                        userId={user.userId}
                        total={onChange}
                        itemDelete={handleDelete}
                        isChecked={values.isChecked[filteredItem._id] || false}
                        onCheckChange={(itemId) => {
                          // console.log(itemId);
                          setFieldValue(
                            `isChecked.${itemId}`,
                            !values.isChecked[itemId]
                          );
                          // console.log(values);
                        }}
                      />
                    </View>
                  ))}
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

export default Basket;
