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
  task?: Task | null;
  setTaskName: (name: string) => void;
  setTaskDate: (date: string) => void;
};

type Task = {
  name: string;
  date: string;
};

const ModalWindow: React.FC<ModalWindowProps> = ({
  modalVisible,
  setModalVisible,
  handleAddTask,
  taskList,
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskNameError, setTaskNameError] = useState("");
  const [taskDateError, setTaskDateError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleConfirm = () => {
    if (!validateFields()) {
      return;
    }
    handleAddTask(taskName, taskDate);
    setTaskName("");
    setTaskDate("");
    setModalVisible(false);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleToggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDayPress = (date: any) => {
    setTaskDate(date.dateString);
    setShowCalendar(false);
  };

  const validateFields = () => {
    let valid = true;
    setTaskNameError("");
    setTaskDateError("");

    if (taskName.trim() === "") {
      setTaskNameError("Пожалуйста, введите название задачи");
      valid = false;
    }

    if (taskDate.trim() === "") {
      setTaskDateError("Пожалуйста, выберите дату");
      valid = false;
    }

    return valid;
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Введите название задачи"
            value={taskName}
            onChangeText={(text) => setTaskName(text)}
          />
          <View style={styles.errorContainer}>
            {taskNameError ? (
              <Text style={styles.errorText}>{taskNameError}</Text>
            ) : null}
          </View>
          <View style={styles.dateContainer}>
            <TextInput
              style={styles.dateInput}
              placeholder="Введите дату"
              value={taskDate}
              onChangeText={(text) => setTaskDate(text)}
            />
            <TouchableOpacity
              style={styles.calendarButton}
              onPress={handleToggleCalendar}
            >
              <Feather name="calendar" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={styles.errorContainer}>
            {taskDateError ? (
              <Text style={styles.errorText}>{taskDateError}</Text>
            ) : null}
          </View>
          {showCalendar && (
            <Calendar onDayPress={handleDayPress} hideExtraDays />
          )}
          <View style={styles.btnHandle}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.buttonText}>Закрыть</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              style={styles.confirmButton}
            >
              <Text style={styles.buttonText}>Подтвердить</Text>
            </TouchableOpacity>
          </View>
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  calendarButton: {
    marginLeft: 10,
  },
  closeButton: {
    flex: 1,
    backgroundColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "center",
    marginRight: 10,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "lightblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "center",
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  btnHandle: {
    flexDirection: "row",
    marginTop: 10,
  },
  errorContainer: {
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -20,
  },
});

export default ModalWindow;
