import React, { useState } from "react";
import { View, Text, Modal, TextInput, Button, StyleSheet } from "react-native";

interface ModalWindowProps {
  visible: boolean;
  onClose: () => void;
  onAddList: (listName: string) => void;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ visible, onClose, onAddList }) => {
  const [listName, setListName] = useState("");

  const handleAddList = () => {
    if (listName.trim() !== "") {
      onAddList(listName);
      setListName("");
    }
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Добавить список</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Название списка"
            value={listName}
            onChangeText={setListName}
          />
          <Button title="Добавить" onPress={handleAddList} />
          <Button title="Отмена" onPress={onClose} />
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
});

export default ModalWindow;