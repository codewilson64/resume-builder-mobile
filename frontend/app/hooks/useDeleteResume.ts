import { Alert } from "react-native";
import { deleteResume as deleteResumeFromDB } from "../utils/database";
import { useResumeStore } from "../store/resumeStore";

type ResumeItem = {
  id: number;
  name: string;
  template: string;
  updated_at: string;
};

export function useDeleteResume(
  setResumes: React.Dispatch<React.SetStateAction<ResumeItem[]>>,
  setOpenMenuId: React.Dispatch<React.SetStateAction<number | null>>
) {
  const currentResumeId = useResumeStore((state) => state.currentResumeId);
  const resetAll = useResumeStore((state) => state.resetAll);

  const handleDelete = (id: number, name: string) => {
    setOpenMenuId(null);

    Alert.alert(
      "Delete Resume",
      `Are you sure you want to delete "${name}"? This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            try {
              // 1. Delete from SQLite
              deleteResumeFromDB(id);

              // 2. Update local list
              setResumes((prev) => prev.filter((item) => item.id !== id));

              // 3. If the deleted resume is currently loaded, reset Zustand
              if (currentResumeId === id) {
                resetAll();
              }
            } catch (error) {
              console.error("Failed to delete resume:", error);
              Alert.alert("Error", "Failed to delete resume. Please try again.");
            }
          },
        },
      ]
    );
  };

  return { handleDelete };
}