import { Alert } from "react-native";
import { deleteCoverLetter as deleteCoverLetterFromDB } from "../db/coverLetterDatabase";
import { useCoverLetterStore } from "../store/coverLetterStore";

type CoverLetterItem = {
  id: number;
  name: string;
  template: string;
  updated_at: string;
};

export function useDeleteCoverLetter(
  setCoverLetters: React.Dispatch<React.SetStateAction<CoverLetterItem[]>>,
  setOpenMenuId: React.Dispatch<React.SetStateAction<number | null>>
) {
  const currentCoverLetterId = useCoverLetterStore((state) => state.currentCoverLetterId);
  const resetAll = useCoverLetterStore((state) => state.resetAll);

  const handleDelete = (id: number, name: string) => {
    setOpenMenuId(null);

    Alert.alert(
      "Delete Cover Letter",
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
              deleteCoverLetterFromDB(id);

              // 2. Update local list
              setCoverLetters((prev) => prev.filter((item) => item.id !== id));

              // 3. If the deleted cover letter is currently loaded, reset Zustand
              if (currentCoverLetterId === id) {
                resetAll();
              }
            } catch (error) {
              console.error("Failed to delete cover letter:", error);
              Alert.alert(
                "Error",
                "Failed to delete cover letter. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  return { handleDelete };
}