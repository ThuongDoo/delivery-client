import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

// Khi người dùng đăng nhập thành công và nhận được token xác thực
export const saveAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem("authToken", token);
    console.log("Token xác thực đã được lưu.");
  } catch (error) {
    console.error("Lỗi khi lưu token xác thực:", error);
  }
};

export const checkAuthToken = async () => {
  try {
    const authToken = await AsyncStorage.getItem("authToken");
    if (authToken) {
      // Token xác thực đã tồn tại, tự động đăng nhập người dùng ở đây
      console.log(
        "Người dùng đã đăng nhập tự động với token xác thực:",
        authToken
      );
      router.replace("/Home");
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra token xác thực:", error);
  }
};

export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
    console.log("Token xác thực đã bị xóa.");
  } catch (error) {
    console.error("Lỗi khi xóa token xác thực:", error);
  }
};
