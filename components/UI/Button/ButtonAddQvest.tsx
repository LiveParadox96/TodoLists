import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface IButtonProp {
  onPress: () => void;
  title: string;
  buttonColor: string;
}
const ButtonAddQvest = (item: IButtonProp) => {
  const { onPress, title, buttonColor } = item;
  return (
    <TouchableOpacity
      style={[styles.btnAddTask, { backgroundColor: buttonColor }]}
      onPress={onPress}
    >
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btnAddTask: {
    width: 200,
    alignSelf: "center",
    height: 40,
    borderRadius: 20,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    alignSelf: "center",
    lineHeight: 40,
  },
});
export default ButtonAddQvest;
// #00CC00