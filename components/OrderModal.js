import { View, Text } from "react-native";
import React from "react";
import { Modal } from "react-native";

const OrderModal = ({ visible }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <Text>haha</Text>
    </Modal>
  );
};

export default OrderModal;
