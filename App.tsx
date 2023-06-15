import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import ModalWindow from "./components/Modal/ModalWindow";
import ButtonAddQvest from "./components/UI/Button/ButtonAddQvest";
import { AntDesign, Entypo } from "@expo/vector-icons";

type Task = {
  name: string;
  date: string;
  completed: boolean;
};

const App = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const handleAddTask = (taskName: string, taskDate: string) => {
    setModalVisible(false);

    if (selectedTaskIndex !== null) {
      const updatedTaskList = [...taskList];
      updatedTaskList[selectedTaskIndex] = {
        name: taskName,
        date: taskDate,
        completed: updatedTaskList[selectedTaskIndex].completed,
      };
      setTaskList(updatedTaskList);
    } else {
      const task: Task = { name: taskName, date: taskDate, completed: false };
      setTaskList([...taskList, task]);
    }

    setSelectedTaskIndex(null);
    setTaskName("");
    setTaskDate("");
  };

  const handleTaskPress = (index: number) => {
    setSelectedTaskIndex(index);
  };

  const handleDeleteTask = (index: number) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);
    setSelectedTaskIndex(null);
  };

  const handleCompleteTask = (index: number) => {
    const updatedTaskList = [...taskList];
    if (index >= 0 && index < updatedTaskList.length) {
      const task = updatedTaskList[index];
      if (task && !task.completed) {
        task.completed = true;
        setTaskList(updatedTaskList);
      }
    }
  };

  const handleEditTask = (index: number) => {
    setModalVisible(true);
    setSelectedTaskIndex(index);

    const selectedTask = taskList[index];
    setTaskName(selectedTask.name);
    setTaskDate(selectedTask.date);
  };

  useEffect(() => {
    setTaskList([
      { name: "Задача 1", date: "16-06-2023", completed: false },
      { name: "Задача 2", date: "17-06-2023", completed: false },
    ]);
  }, []);

  return (
    <View style={styles.content}>
      <StatusBar style="auto" />
      <View>
        <Text style={styles.textTodoList}>Список задач</Text>
      </View>
      <View>
        <ButtonAddQvest
          onPress={() => setModalVisible(true)}
          title="Добавить задачу"
          buttonColor="#rgb(255,69,0)"
        />
      </View>
      <ModalWindow
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleAddTask={handleAddTask}
        taskList={taskList}
        task={selectedTaskIndex !== null ? taskList[selectedTaskIndex] : null}
        setTaskName={setTaskName}
        setTaskDate={setTaskDate}
      />
      <View style={styles.taskList}>
        {taskList.map((task, index) => (
          <TouchableHighlight
            key={index}
            onPress={() => handleTaskPress(index)}
            style={[
              styles.taskItem,
              selectedTaskIndex === index && { backgroundColor: "salmon" },
              task.completed && { backgroundColor: "#00CC00" },
            ]}
          >
            <View style={styles.taskContent}>
              <Text style={styles.taskText}>
                {index + 1}. {task.name} - {task.date}
              </Text>
              {!task.completed && selectedTaskIndex === index && (
                <>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleCompleteTask(index)}
                  >
                    <Entypo name="check" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleEditTask(index)}
                  >
                    <Entypo name="edit" size={24} color="black" />
                  </TouchableOpacity>
                </>
              )}
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleDeleteTask(index)}
              >
                <AntDesign name="delete" size={18} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignSelf: "center",
    width: "80%",
  },
  textTodoList: {
    alignSelf: "center",
    marginTop: 50,
    fontSize: 20,
    color: "gray",
    marginBottom: 20,
  },
  taskList: {
    marginTop: 40,
    alignSelf: "center",
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
    width: "100%",
  },
  taskContent: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
  },
  taskText: {
    fontSize: 18,
    color: "#606060",
    flex: 1,
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default App;
