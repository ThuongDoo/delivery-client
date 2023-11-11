import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasketRow from "../../../components/BasketRow";
import api from "../../../utils/api";
import { getUser } from "../../../slices/userSlice";
import CurrencyFormatter from "../../../components/CurrencyFormatter";
import { router, useFocusEffect } from "expo-router";
import { Formik } from "formik";
import ModalLoader from "react-native-modal-loader";
import { setError } from "../../../slices/errorSlice";
const Basket = () => {
  const [basket, setBasket] = useState([]);
  const dispatch = useDispatch();
  const [basketQuantity, setBasketQuantity] = useState(0);
  const [basketTotalPrice, setBasketTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const shippingFee = 15000;
  const user = useSelector(getUser);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await api
          .get(`/basket/${user.userId}`)
          .then((res) => {
            const inputData = res.data.items;

            const uniqueBasket = inputData.reduce((acc, item) => {
              const existingRestaurant = acc.find((restaurant) => {
                return restaurant.restaurant._id === item.food.restaurant._id;
              });
              if (existingRestaurant) {
                existingRestaurant.items.push({ ...item, isChecked: true });
              } else {
                acc.push({
                  restaurant: item.food.restaurant,
                  items: [{ ...item, isChecked: true }],
                });
              }

              return acc;
            }, []);
            setBasket(uniqueBasket);
            // console.log(uniqueBasket[0].items);
          })
          .catch((err) => {
            err?.response && dispatch(setError(err.response.status));
          });
      };
      fetchData();
    }, [user.userId])
  );

  const handleChange = (value) => {
    console.log("change");
    const updateBasket = basket.map((restaurant) => {
      return {
        ...restaurant,
        items: restaurant.items.map((item) => {
          if (item.food._id === value._id) {
            return {
              ...item,
              quantity: value.quantity,
              isChecked: value.isChecked,
            };
          }
          return item;
        }),
      };
    });
    setBasket(updateBasket);
  };

  const handleDelete = (value) => {
    const updateBasket = [...basket];
    updateBasket.map((restaurant, index) => {
      const deleteIndex = restaurant.items.findIndex(
        (item) => item.food._id === value
      );
      if (deleteIndex === -1) {
        return;
      }
      restaurant.items.splice(deleteIndex, 1);
      if (restaurant.items.length === 0) {
        updateBasket.splice(index, 1);
      }
    });
    setBasket(updateBasket);
  };
  const handleSubmit = () => {
    setIsLoading(true);

    console.log(basket);
    let updateBasket = [...basket];
    let value = JSON.parse(JSON.stringify(basket));

    value.forEach((restaurant, restaurantIndex) => {
      restaurant.items = restaurant.items.filter(
        (item) => item.isChecked === true
      );
    });
    value = value.filter((restaurant) => restaurant.items.length !== 0);
    console.log(value);

    const postData = async () => {
      await api
        .post(`/order/${user.userId}`, value)
        .then((res) => {
          console.log(res.data);
          updateBasket.forEach((restaurant) => {
            restaurant.items = restaurant.items.filter(
              (item) => item.isChecked === false
            );
          });
          updateBasket = updateBasket.filter(
            (restaurant) => restaurant.items.length !== 0
          );
          setBasket(updateBasket);
        })
        .catch((err) => {
          throw new Error(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
      console.log("=========");
      console.log(updateBasket);
      await api
        .patch(`/basket/update/${user.userId}`, updateBasket)
        .catch((err) => {
          throw new Error(err.message);
        });
      console.log(value);
    };
    postData();
  };

  useEffect(() => {
    const quantity = basket.reduce((restaurantTotal, restaurantItem) => {
      return (restaurantTotal += restaurantItem.items.reduce((total, item) => {
        if (item.isChecked === true) {
          return (total += item.quantity);
        }
        return total;
      }, 0));
    }, 0);
    setBasketQuantity(quantity);
  }, [basket]);
  useEffect(() => {
    const totalPrice = basket.reduce((restaurantTotal, restaurantItem) => {
      return (restaurantTotal += restaurantItem.items.reduce((total, item) => {
        if (item.isChecked === true) {
          return (total += item.quantity * item.food.price);
        }
        return total;
      }, 0));
    }, 0);
    setBasketTotalPrice(totalPrice);
  }, [basket]);
  return (
    <View className="h-full">
      <ModalLoader loading={isLoading} />

      {basketQuantity !== 0 && (
        <View className="mx-3 bg-white absolute bottom-2 left-0 right-0 z-50 rounded-md flex justify-between py-2 px-2 space-y-2">
          <View className="">
            <View className="flex-row justify-between">
              <Text>Subtotal</Text>
              <Text>{CurrencyFormatter({ amount: basketTotalPrice })}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text>Shipping fee</Text>
              <Text>{CurrencyFormatter({ amount: shippingFee })}</Text>
            </View>
            {/* <View className="flex-row justify-between">
              <Text>Total</Text>
              <Text>
                {CurrencyFormatter({
                  amount: basketTotalPrice + shippingFee,
                })}
              </Text>
            </View> */}
          </View>
          <TouchableOpacity
            className="px-3 bg-customRed flex-row rounded-lg space-x-1 items-center py-4"
            onPress={handleSubmit}
          >
            <Text className="text-lg font-extrabold text-white basis-1/4">
              Order
            </Text>
            <Text className="text-lg text-white font-extrabold text-center flex-1">
              {CurrencyFormatter({ amount: basketTotalPrice + shippingFee })}
            </Text>
            <Text className="text-lg text-white font-extrabold text-right basis-1/4">
              {basketQuantity}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {basket?.length === 0 && (
        <View className="h-full flex items-center justify-center">
          <Text>There is no item in your basket</Text>
        </View>
      )}
      <ScrollView
        className="px-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {basket?.map((restaurant) => (
          <View key={restaurant.restaurant._id}>
            <View className="flex-row items-center justify-between py-2 border-b">
              <View className="flex-row items-center space-x-2">
                <Image
                  source={{ uri: restaurant.restaurant.image }}
                  className="w-7 h-7"
                />
                <Text>{restaurant.restaurant.name}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/Home/Restaurant/[restaurant]",
                    params: {
                      restaurant: restaurant.restaurant._id,
                    },
                  });
                }}
              >
                <Text className="text-red-500 text-lg">Change</Text>
              </TouchableOpacity>
            </View>

            {restaurant.items.map((item) => (
              <View key={item._id}>
                <BasketRow
                  data={item}
                  userId={user.userId}
                  onChange={handleChange}
                  itemDelete={handleDelete}
                  isChecked={false}
                />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Basket;
