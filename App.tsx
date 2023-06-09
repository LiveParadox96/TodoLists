import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import ModalWindow from "./components/Modal/Modal";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [lists, setLists] = useState<string[]>(["Задача 1", "Задача 2"]);

  const handleAddList = (listName: string) => {
    setLists([...lists, listName]);
  };

  const handleDeleteList = (index: number) => {
    const updatedLists = [...lists];
    updatedLists.splice(index, 1);
    setLists(updatedLists);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.btnAddTask}
        >
          <Text style={styles.btnAddTaskText}>Добавить</Text>
        </TouchableOpacity>
        <View>
          {lists.map((list, index) => (
            <View key={index} style={styles.todoContainer}>
              <Text style={styles.todo}>
                {index + 1}.&nbsp;{list}
              </Text>
              <TouchableOpacity onPress={() => handleDeleteList(index)}>
                <Feather name="trash-2" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
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
  btnAddTask: {
    backgroundColor: "#808080",
    width: 80,
    height: 25,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnAddTaskText: {
    fontWeight: "800",
    color: "#ffffff",
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: 200,
    justifyContent: "space-between",
  },
  todo: {
    flexDirection: "column",
    fontWeight: "bold",
  },
});
