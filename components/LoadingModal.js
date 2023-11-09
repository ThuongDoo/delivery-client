import { View, Text, Modal } from "react-native";
import React from "react";
import ModalLoader from "react-native-modal-loader";

const LoadingModal = ({ isLoading, isVisible }) => {
  return (
    <Modal transparent={true} visible={isVisible}>
      <View className="flex justify-center items-center h-full">
        <View className="bg-white w-2/3 h-32 rounded-xl">
          <Text>thanhcong</Text>
          <ModalLoader loading={isLoading} />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
