import React from "react";
import { TouchableHighlight, StyleSheet, Text } from "react-native";

function Button() {
  return (
    <TouchableHighlight style={styles.btn}>
      <Text>Добавить</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 20,
    width: 70,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "#red",
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Button;
