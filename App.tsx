import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ModalWindow from "./components/Modal/Modal";

interface Task {
  name: string;
  date: string;
}

interface List {
  name: string;
  tasks: Task[];
}

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [lists, setLists] = useState<List[]>([
    { name: "Задача 1", tasks: [] },
    { name: "Задача 2", tasks: [] },
  ]);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [listIndex, setListIndex] = useState<number>(0);

  const handleAddList = (listName: string) => {
    const newList: List = { name: listName, tasks: [] };
    setLists((prevLists) => [...prevLists, newList]);
  };

  const handleDeleteList = (index: number) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      updatedLists.splice(index, 1);
      return updatedLists;
    });
  };

  const handleAddTask = (
    listIndex: number, // Исправлено
    taskName: string,
    taskDate: string
  ) => {
    if (taskName.trim() !== "" && taskDate !== "") {
      const newListIndex = listIndex;
      setLists((prevLists) => {
        const updatedLists = [...prevLists];
        updatedLists[newListIndex].tasks.push({ name: taskName, date: taskDate });
        return updatedLists;
      });
    }
    setListIndex(0);
    setModalVisible(false);
  };

  const handleTaskPress = (index: number) => {
    if (selectedTasks.includes(index)) {
      setSelectedTasks((prevSelectedTasks) =>
        prevSelectedTasks.filter((taskIndex) => taskIndex !== index)
      );
    } else {
      setSelectedTasks((prevSelectedTasks) => [...prevSelectedTasks, index]);
    }
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
              <TouchableHighlight
                onPress={() => handleTaskPress(index)}
                underlayColor="transparent"
                style={[
                  styles.taskTouchable,
                  selectedTasks.includes(index) && styles.selectedTask,
                ]}
              >
                <Text style={styles.todo}>{`${index + 1}. ${list.name}`}</Text>
              </TouchableHighlight>
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
        onAddTask={handleAddTask}
        listIndex={listIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  content: {
    flex: 1,
  },
  btnAddTask: {
    marginBottom: 20,
    backgroundColor: "lightblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  btnAddTaskText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  taskTouchable: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },
  selectedTask: {
    backgroundColor: "lightgreen",
  },
  todo: {
    fontSize: 16,
  },
});