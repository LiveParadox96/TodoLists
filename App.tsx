import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import ModalWindow from "./components/Modal/Modal";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [lists, setLists] = useState<string[]>([]);

  const handleAddList = (listName: string) => {
    setLists([...lists, listName]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <Button
          title="Добавить"
          onPress={() => setModalVisible(true)}
          color="#808080"
        />
        {lists.map((list, index) => (
          <Text key={index} style={styles.todo}>
            {list}
          </Text>
        ))}
      </View>

      <ModalWindow
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddList={handleAddList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    width: 300,
    borderWidth: 1,
  },
  todo: {
    marginBottom: 10,
    flexDirection: "row",
    fontWeight: "bold",
  },
});
