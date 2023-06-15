import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";

type ModalWindowProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  handleAddTask: (taskName: string, taskDate: string) => void;
  taskList: Task[];
};
type Task = {
  name: string;
  date: string;
};
const ModalWindow: React.FC<ModalWindowProps> = ({
  modalVisible,
  setModalVisible,
  handleAddTask,
  taskList:task
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handleConfirm = () => {
    handleAddTask(taskName, taskDate);
    setTaskName("");
    setTaskDate("");
    setModalVisible(false);
    setTaskList([...taskList, { name: taskName, date: taskDate }]);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleDayPress = (date: any) => {
    setTaskDate(date.dateString);
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Добавить задачу</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите название задачи"
            value={taskName}
            onChangeText={(text) => setTaskName(text)}
          />
          <Calendar onDayPress={handleDayPress} />
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleConfirm}
            style={styles.confirmButton}
          >
            <Text style={styles.buttonText}>Подтвердить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  confirmButton: {
    backgroundColor: "lightblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ModalWindow;
