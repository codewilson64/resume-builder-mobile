import { useState } from "react";
import { Alert } from "react-native";
import { renameResume as renameResumeFromDB } from "../utils/database";

type ResumeItem = {
  id: number;
  name: string;
  template: string;
  updated_at: string;
};

export function useRenameResume(
  setResumes: React.Dispatch<React.SetStateAction<ResumeItem[]>>,
  setOpenMenuId: React.Dispatch<React.SetStateAction<number | null>>
) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState("");
  const [inputValue, setInputValue] = useState("");

  const openRenameModal = (id: number, currentName: string) => {
    setOpenMenuId(null);
    setSelectedId(id);
    setSelectedName(currentName);
    setInputValue(currentName);
    setIsModalVisible(true);
  };

  const closeRenameModal = () => {
    setIsModalVisible(false);
    setSelectedId(null);
    setSelectedName("");
    setInputValue("");
  };

  const confirmRename = () => {
    if (!inputValue.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    if (selectedId === null) return;

    try {
      // 1. Update SQLite
      renameResumeFromDB(selectedId, inputValue);

      // 2. Update local list
      setResumes((prev) =>
        prev.map((item) =>
          item.id === selectedId
            ? {
                ...item,
                name: inputValue.trim(),
                updated_at: new Date().toISOString(),
              }
            : item
        )
      );

      closeRenameModal();
    } catch (error) {
      console.error("Failed to rename resume:", error);
      Alert.alert("Error", "Failed to rename resume. Please try again.");
    }
  };

  return {
    isModalVisible,
    inputValue,
    setInputValue,
    openRenameModal,
    closeRenameModal,
    confirmRename,
  };
}