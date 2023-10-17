import { View, Text, Image, Button } from "react-native";
import React from "react";
import { ErrorMessage, Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import api from "../utils/api";
import * as Yup from "yup";
import * as AuthRequire from "../utils/auth";
import { router } from "expo-router";

const index = () => {
  AuthRequire.checkAuthToken();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalide email anddress"),
    password: Yup.string().required("Password is required"),
  });
  return (
    <Formik
      initialValues={{ email: "", password: "123456" }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await api.post("/auth/login", values);
        const user = await api.get("/user/showMe");
        AuthRequire.saveAuthToken(JSON.stringify(user.data.user));
        router.replace("/Home");
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
        <View className="m-auto">
          <Image
            source={{
              uri: "https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-food-logo-png-image_5297921.png",
            }}
            className="w-10 h-10"
          />
          <Text>FoodEazy</Text>
          <View>
            <Text>Email address</Text>
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
          <Button title="Login" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default index;
