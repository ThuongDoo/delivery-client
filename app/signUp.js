import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { router } from "expo-router";
import { Formik } from "formik";
import api from "../utils/api";

const signUp = () => {
  const [error, setError] = useState(null);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email anddress"),
    password: Yup.string().required("Password is required"),
    validatePassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    name: Yup.string()
      .required("Name is required")
      .min(3, "Username must be at least 3 characters"),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        password: "",
        validatePassword: "",
        role: "user",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await api
          .post("/auth/register", values)
          .then((res) => {
            console.log(res.status);
            if (res.status === 201) {
              router.replace("/");
            }
          })
          .catch((err) => {
            console.log(err.response.status);
            setError("The email is already in use.");
          });
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View className="m-auto space-y-2 items-center">
          <View className="items-center">
            <Image
              source={{
                uri: "https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-food-logo-png-image_5297921.png",
              }}
              className="w-20 h-20 rounded-full"
            />
            <Text className=" text-red-500 text-3xl font-extrabold">
              FoodEazy
            </Text>
          </View>
          <View>
            <Text>Email</Text>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Email"
              className="border rounded-lg px-3 border-black w-44"
            />
            {touched.email && errors.email && (
              <Text className="text-red-500">{errors.email}</Text>
            )}
          </View>
          <View className="items-center">
            <View>
              <Text>Name</Text>
              <TextInput
                placeholder="Name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                className="border rounded-lg px-3 border-black w-44"
              />
            </View>
            {touched.name && errors.name && (
              <Text className="text-red-500">{errors.name}</Text>
            )}
          </View>
          <View>
            <Text>Password</Text>
            <TextInput
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
              className="border rounded-lg px-3 border-black w-44"
            />
            {touched.password && errors.password && (
              <Text className="text-red-500">{errors.password}</Text>
            )}
          </View>
          <View>
            <Text>Re-enter password</Text>
            <TextInput
              placeholder="validatePassword"
              onChangeText={handleChange("validatePassword")}
              onBlur={handleBlur("validatePassword")}
              value={values.validatePassword}
              secureTextEntry
              className="border rounded-lg px-3 border-black w-44"
            />
            {touched.validatePassword && errors.validatePassword && (
              <Text className="text-red-500">{errors.validatePassword}</Text>
            )}
          </View>
          {error && <Text className="text-red-500">{error}</Text>}
          <TouchableOpacity
            onPress={handleSubmit}
            className=" bg-red-500 rounded-lg h-7 items-center justify-center w-44"
          >
            <Text className="text-white text-md">SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.replace("/");
            }}
            className=" bg-red-500 rounded-lg h-7 items-center justify-center w-44"
          >
            <Text className="text-white text-md">LOGIN</Text>
          </TouchableOpacity>
          {/* <Button title="Login" onPress={handleSubmit} /> */}
        </View>
      )}
    </Formik>
  );
};

export default signUp;
