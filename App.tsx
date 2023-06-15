import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import ModalWindow from "./components/Modal/ModalWindow";
import ButtonAddQvest from "./components/UI/Button/ButtonAddQvest";

type Task = {
  name: string;
  date: string;
};

const App = () => {
  const [taskList, setTaskList] = useState<{ name: string; date: string }[]>(
    []
  );
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddTask = (taskName: string, taskDate: string) => {
    setModalVisible(true);
    setTaskList([...taskList, { name: taskName, date: taskDate }]);
  };

  const handleCloseModalWindow = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.content}>
      <StatusBar style="auto" />
      <View>
        <Text style={styles.textTodoList}>Список задач</Text>
      </View>
      <View>
        <ButtonAddQvest
          onPress={handleAddTask}
          title="Добавить задачу"
          buttonColor="#rgb(255,69,0)"
        />
      </View>
      <ModalWindow
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleAddTask={handleCloseModalWindow}
        taskList={taskList}
      />
      <View style={styles.taskList}>
        {taskList.map((task, index) => (
          <Text key={index}>{task.name}</Text>
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
    marginTop: 20,
  },
});

export default App;
