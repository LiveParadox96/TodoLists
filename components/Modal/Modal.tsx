import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import DatePicker from "react-native-datepicker";

interface ModalWindowProps {
  visible: boolean;
  onClose: () => void;
  onAddTask: (listIndex: number, taskName: string, taskDate: string) => void;
  listIndex: number;
}

const ModalWindow: React.FC<ModalWindowProps> = ({
  visible,
  onClose,
  onAddTask,
  listIndex,
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const handleAddTask = (
    listIndex: number,
    taskName: string,
    taskDate: string
  ) => {
    if (taskName.trim() !== "" && taskDate !== "") {
      onAddTask(listIndex, taskName, taskDate);
      setTaskName("");
      setTaskDate("");
    }
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Добавить задачу</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Название задачи"
            value={taskName}
            onChangeText={setTaskName}
          />
          <DatePicker
            style={styles.datePicker}
            date={taskDate}
            mode="date"
            format="YYYY-MM-DD"
            onDateChange={setTaskDate}
          />
          <TouchableHighlight
            style={styles.modalBtn}
            onPress={() => handleAddTask(listIndex, taskName, taskDate)}
          >
            <Text style={styles.modalBtnText}>Добавить</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.modalBtn} onPress={onClose}>
            <Text style={styles.modalBtnText}>Закрыть</Text>
          </TouchableHighlight>
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
    borderRadius: 5,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalBtn: {
    width: 80,
    height: 30,
    backgroundColor: "#808080",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBtnText: {
    color: "#ffffff",
  },
  datePicker: {
    width: 200,
    marginBottom: 10,
  },
});

export default ModalWindow;
