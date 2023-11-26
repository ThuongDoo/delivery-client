import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import api from "../utils/api";
import StarRating from "react-native-star-rating";
import { iconColor } from "../utils/constants";
import FormatDate from "./FormatDate";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../slices/errorSlice";
import { getUser } from "../slices/userSlice";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState(null);
  const local = useLocalSearchParams();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await api
          .get(`/review/${local.restaurant}`)
          .then((res) => {
            const data = res.data.restaurant.reviews;
            const tempMyReview = data.find(
              (review) => review.user._id === user.userId
            );
            const tempReviews = data.filter(
              (item) => item.user._id !== user.userId
            );
            setMyReview(tempMyReview);
            setReviews(tempReviews);
          })
          .catch((err) => {
            err?.response && dispatch(setError(err.response.status));
          });
      };
      fetchData();
    }, [])
  );

  return (
    <View className="my-2 bg-white rounded-2xl px-3 py-4">
      <Text className="text-lg font-bold">Reviews</Text>
      <View className="py-4">
        {myReview && (
          <View className="flex-row space-x-2 border-b border-t border-gray-200 py-3">
            <Image
              source={{ uri: myReview.user.image }}
              className="w-10 h-10 rounded-full"
            />
            <View className="flex-1">
              <Text>{myReview.user.name}</Text>
              <StarRating
                rating={myReview.rating}
                disabled={true}
                fullStarColor={iconColor}
                emptyStarColor={iconColor}
                containerStyle={{ width: 120 }}
                starSize={20}
              />
              <Text>{FormatDate(myReview.updatedAt)}</Text>
              <Text className="text-lg">{myReview.comment}</Text>
            </View>
            <TouchableOpacity
              className=" border w-1/4 h-8 items-center justify-center rounded-lg"
              onPress={() => {
                console.log("hha");
                router.push({
                  pathname: "Order/Review/[restaurant]",
                  params: {
                    restaurant: local.restaurant,
                  },
                });
              }}
            >
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
        {reviews.map((item) => (
          <View
            key={item._id}
            className="flex-row space-x-2 border-b border-t border-gray-200 py-3"
          >
            <Image
              source={{ uri: item.user.image }}
              className="w-10 h-10 rounded-full"
            />
            <View>
              <Text>{item.user.name}</Text>
              <StarRating
                rating={item.rating}
                disabled={true}
                fullStarColor={iconColor}
                emptyStarColor={iconColor}
                containerStyle={{ width: 120 }}
                starSize={20}
              />
              <Text>{FormatDate(item.updatedAt)}</Text>
              <Text className="text-lg">{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Review;
