import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import StarRating from "react-native-star-rating";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import api from "../../../../utils/api";
import { getUser } from "../../../../slices/userSlice";

const Review = () => {
  const local = useLocalSearchParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const user = useSelector(getUser);
  const handleRatingChange = (rating) => {
    setRating(rating);
  };
  const handleSubmit = async () => {
    await api
      .patch(`review/${local.restaurant}`, {
        user: user.userId,
        rating,
        comment,
      })
      .finally(() => {
        router.back();
      });
  };
  return (
    <View className="h-full items-center justify-center p-20 flex space-y-3">
      <StarRating
        rating={rating}
        disabled={false}
        fullStarColor="gold"
        emptyStarColor="gold"
        starSize={50}
        selectedStar={(rating) => handleRatingChange(rating)}
      />
      <TextInput
        className="border w-full p-3 rounded-2xl h-2/5"
        placeholder="Comment"
        value={comment}
        onChangeText={(text) => {
          setComment(text);
        }}
        multiline
        textAlignVertical="top"
      />
      <TouchableOpacity
        className="bg-customRed px-3 py-1 rounded-lg items-center w-full"
        onPress={() => handleSubmit()}
      >
        <Text className="text-white">SEND</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Review;
