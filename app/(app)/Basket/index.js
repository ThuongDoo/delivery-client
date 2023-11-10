import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BasketRow from "../../../components/BasketRow";
import api from "../../../utils/api";
import { getUser } from "../../../slices/userSlice";
import CurrencyFormatter from "../../../components/CurrencyFormatter";
import { useFocusEffect } from "expo-router";
import { Formik } from "formik";
import ModalLoader from "react-native-modal-loader";
const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [basketQuantity, setBasketQuantity] = useState(0);
  const [basketTotalPrice, setBasketTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const shippingFee = 15000;
  const user = useSelector(getUser);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        api
          .get(`/basket/${user.userId}`)
          .then((res) => {
            const inputData = res.data.items;

            const uniqueBasket = inputData.reduce((acc, item) => {
              const existingRestaurant = acc.find((restaurant) => {
                return restaurant.restaurant._id === item.food.restaurant._id;
              });
              if (existingRestaurant) {
                existingRestaurant.items.push(item);
              } else {
                acc.push({ restaurant: item.food.restaurant, items: [item] });
              }

              return acc;
            }, []);
            setBasket(uniqueBasket);
          })
          .catch((err) => {
            throw new Error(err.message);
          });
      };
      fetchData();
    }, [user.userId])
  );

  const handleChange = (value) => {
    const updateBasket = basket.map((restaurant) => {
      return {
        ...restaurant,
        items: restaurant.items.map((item) => {
          if (item.food._id === value._id) {
            return { ...item, quantity: value.quantity };
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

  useEffect(() => {
    const quantity = basket.reduce((restaurantTotal, restaurantItem) => {
      return (restaurantTotal += restaurantItem.items.reduce((total, item) => {
        return (total += item.quantity);
      }, 0));
    }, 0);
    setBasketQuantity(quantity);
  }, [basket]);
  useEffect(() => {
    const totalPrice = basket.reduce((restaurantTotal, restaurantItem) => {
      return (restaurantTotal += restaurantItem.items.reduce((total, item) => {
        return (total += item.quantity * item.food.price);
      }, 0));
    }, 0);
    setBasketTotalPrice(totalPrice);
  }, [basket]);

  return (
    <Formik
      initialValues={{ isChecked: {} }}
      onSubmit={(values) => {
        const checkedFoods = Object.keys(values.isChecked).filter(
          (key) => values.isChecked[key] === true
        );
        console.log(checkedFoods);
        // router.push("Basket/Payment");
        setIsLoading(true);
        const postData = async () => {
          api
            .post(`/order/${user.userId}`, basket)
            .then((res) => {
              console.log(res.data);
              setBasket([]);
            })
            .catch((err) => {
              throw new Error(err.message);
            })
            .finally(() => {
              setIsLoading(false);
            });
          console.log("=========");
          api.delete(`/basket/${user.userId}`).catch((err) => {
            throw new Error(err.message);
          });
        };
        postData();
        console.log(basket);
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <View className="h-full">
          <ModalLoader loading={isLoading} />

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
            {basket?.map((restaurant) => (
              <View key={restaurant.restaurant._id}>
                <View className="flex-row items-center space-x-2 py-2 border-b">
                  <Image
                    source={{ uri: restaurant.restaurant.image }}
                    className="w-7 h-7"
                  />
                  <Text>{restaurant.restaurant.name}</Text>
                </View>

                {restaurant.items.map((item) => (
                  <View key={item._id}>
                    <BasketRow
                      data={item}
                      userId={user.userId}
                      total={handleChange}
                      itemDelete={handleDelete}
                      isChecked={values.isChecked[item._id] || false}
                      onCheckChange={(itemId) => {
                        setFieldValue(
                          `isChecked.${itemId}`,
                          !values.isChecked[itemId]
                        );
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
