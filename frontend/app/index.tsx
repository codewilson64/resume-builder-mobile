import "./global.css";
import cv from "./assets/menu/cv.png";
import cover_letter from "./assets/menu/letter.png";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { getAllResumes, getResume } from "./db/resumeDatabase";

import { getAllCoverLetters, getCoverLetter, renameCoverLetter } from "./db/coverLetterDatabase";
import { useResumeStore } from "./store/resumeStore";
import { useCoverLetterStore } from "./store/coverLetterStore";
import { useDeleteResume } from "./hooks/useDeleteResume";
import { formatUpdatedDate } from "./utils/formatDate";
import { useRenameResume } from "./hooks/useRenameResume";

import RenameModal from "./components/RenameModal"; 
import { useDeleteCoverLetter } from "./hooks/useDeleteCoverLetter";
import { BannerAd, BannerAdSize, TestIds,} from "react-native-google-mobile-ads";

type ListItem = {
  id: number;
  name: string;
  template: string;
  updated_at: string;
};

type Tab = "resumes" | "coverLetters";

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("resumes");
  const [resumes, setResumes] = useState<ListItem[]>([]);
  const [coverLetters, setCoverLetters] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // const adUnitId = __DEV__
  //   ? TestIds.BANNER
  //   : Platform.select({
  //       ios: "ca-app-pub-1972950748945293/9364911166",
  //       android: "ca-app-pub-1972950748945293/5372254901",
  //     });

  // Resume store
  const loadResume = useResumeStore((state) => state.loadResume);
  const resetAllResume = useResumeStore((state) => state.resetAll);

  // Cover letter store
  const loadCoverLetter = useCoverLetterStore((state) => state.loadCoverLetter);
  const resetAllCoverLetter = useCoverLetterStore((state) => state.resetAll);

  const { handleDelete: handleDeleteResume } = useDeleteResume(setResumes, setOpenMenuId);
  const { handleDelete: handleDeleteCoverLetter } = useDeleteCoverLetter(setCoverLetters, setOpenMenuId);

  const {
    isModalVisible,
    inputValue,
    setInputValue,
    openRenameModal,
    closeRenameModal,
    confirmRename,
  } = useRenameResume(setResumes, setOpenMenuId);

  // Cover letter rename modal state
  const [isCoverRenameVisible, setIsCoverRenameVisible] = useState(false);
  const [coverRenameId, setCoverRenameId] = useState<number | null>(null);
  const [coverRenameValue, setCoverRenameValue] = useState("");

  useFocusEffect(
    useCallback(() => {
      const loadData = () => {
        try {
          setLoading(true);
          setResumes(getAllResumes());
          setCoverLetters(getAllCoverLetters());
        } catch (error) {
          console.error("Failed to load data:", error);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, [])
  );

  // ---------- Resume handlers ----------
  const handleCreateResume = () => {
    resetAllResume();
    router.push("/contact");
  };

  const handleOpenResume = (id: number) => {
    try {
      const resume = getResume(id);
      if (resume) {
        loadResume(resume.data, resume.id);
        router.push("/contact");
      }
    } catch (error) {
      console.error("Failed to open resume:", error);
    }
  };

  // ---------- Cover Letter handlers ----------
  const handleCreateCoverLetter = () => {
    resetAllCoverLetter();
    router.push("/header");
  };

  const handleOpenCoverLetter = (id: number) => {
    try {
      const coverLetter = getCoverLetter(id);
      if (coverLetter) {
        loadCoverLetter(coverLetter.data, coverLetter.id);
        router.push("/header");
      }
    } catch (error) {
      console.error("Failed to open cover letter:", error);
    }
  };

  const openCoverRenameModal = (id: number, name: string) => {
    setCoverRenameId(id);
    setCoverRenameValue(name);
    setIsCoverRenameVisible(true);
    setOpenMenuId(null);
  };

  const closeCoverRenameModal = () => {
    setIsCoverRenameVisible(false);
    setCoverRenameId(null);
    setCoverRenameValue("");
  };

  const confirmCoverRename = () => {
    if (coverRenameId == null || !coverRenameValue.trim()) return;

    try {
      renameCoverLetter(coverRenameId, coverRenameValue.trim());
      setCoverLetters((prev) =>
        prev.map((item) =>
          item.id === coverRenameId
            ? { ...item, name: coverRenameValue.trim() }
            : item
        )
      );
      closeCoverRenameModal();
    } catch (error) {
      console.error("Failed to rename cover letter:", error);
    }
  };

  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const currentList = activeTab === "resumes" ? resumes : coverLetters;
  const emptyText =
    activeTab === "resumes"
      ? "No resumes yet. Create your first one!"
      : "No cover letters yet. Create your first one!";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 py-4">
        {/* Top Actions */}
        <View className="gap-3">
          <Pressable
            className="h-[64px] flex-row items-center justify-between rounded-[14px] bg-gray-100 px-[18px]"
            onPress={handleCreateResume}
          >
            <View className="flex-row items-center gap-3">
              <Image source={cv} className="h-10 w-10" resizeMode="contain" />
              <Text className="text-base font-semibold text-gray-900">
                Create Resume
              </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </Pressable>

          <Pressable
            className="h-[64px] flex-row items-center justify-between rounded-[14px] bg-gray-100 px-[18px]"
            onPress={handleCreateCoverLetter}
          >
            <View className="flex-row items-center gap-3">
              <Image
                source={cover_letter}
                className="h-10 w-10"
                resizeMode="contain"
              />
              <Text className="text-base font-semibold text-gray-900">
                Create Cover Letter
              </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </Pressable>
        </View>

        {/* Tabs + List */}
        <View className="mt-8 flex-1">
          {/* Tab buttons */}
          <View className="mb-4 flex-row gap-2">
            <Pressable
              onPress={() => {
                setActiveTab("resumes");
                setOpenMenuId(null);
              }}
              className={`rounded-full px-4 py-2 ${
                activeTab === "resumes" ? "bg-cyan-400" : "bg-gray-100"
              }`}
            >
              <Text
                className={`text-[15px] font-semibold ${
                  activeTab === "resumes" ? "text-white" : "text-gray-600"
                }`}
              >
                Resumes
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setActiveTab("coverLetters");
                setOpenMenuId(null);
              }}
              className={`rounded-full px-4 py-2 ${
                activeTab === "coverLetters" ? "bg-cyan-400" : "bg-gray-100"
              }`}
            >
              <Text
                className={`text-[15px] font-semibold ${
                  activeTab === "coverLetters" ? "text-white" : "text-gray-600"
                }`}
              >
                Cover Letters
              </Text>
            </Pressable>
          </View>

          {loading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#06b6d4" />
            </View>
          ) : currentList.length === 0 ? (
            <View className="flex-1 items-center justify-center">
              <Text className="text-base text-gray-500">{emptyText}</Text>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerClassName="gap-3 pb-5"
            >
              {currentList.map((item) => (
                <View key={`${activeTab}-${item.id}`} className="relative">
                  <Pressable
                    className="min-h-[78px] flex-row items-center justify-between rounded-[14px] border border-gray-200 bg-gray-50 px-[18px] py-[14px]"
                    onPress={() => {
                      setOpenMenuId(null);
                      if (activeTab === "resumes") {
                        handleOpenResume(item.id);
                      } else {
                        handleOpenCoverLetter(item.id);
                      }
                    }}
                  >
                    <View className="flex-1 pr-4">
                      <Text className="mb-[5px] text-[17px] font-semibold text-gray-900">
                        {item.name}
                      </Text>
                      <Text className="text-[13px] text-gray-500">
                        {formatUpdatedDate(item.updated_at)}
                      </Text>
                    </View>

                    {/* Triple dots */}
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation?.();
                        toggleMenu(item.id);
                      }}
                      hitSlop={12}
                      className="h-10 w-10 items-center justify-center rounded-full"
                    >
                      <MaterialIcons
                        name="more-vert"
                        size={24}
                        color="#6B7280"
                      />
                    </Pressable>
                  </Pressable>

                  {/* Dropdown Menu */}
                  {openMenuId === item.id && (
                    <View className="absolute right-6 top-[60px] z-50 min-w-[140px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                      <Pressable
                        onPress={() => {
                          if (activeTab === "resumes") {
                            openRenameModal(item.id, item.name);
                          } else {
                            openCoverRenameModal(item.id, item.name);
                          }
                        }}
                        className="flex-row items-center gap-3 border-b border-gray-100 px-4 py-3 active:bg-gray-100"
                      >
                        <MaterialIcons name="edit" size={20} color="#374151" />
                        <Text className="text-[15px] font-medium text-gray-800">
                          Rename
                        </Text>
                      </Pressable>

                      <Pressable
                        onPress={() => {
                          if (activeTab === "resumes") {
                            handleDeleteResume(item.id, item.name);
                          } else {
                            handleDeleteCoverLetter(item.id, item.name);
                          }
                        }}
                        className="flex-row items-center gap-3 px-4 py-3 active:bg-gray-100"
                      >
                        <MaterialIcons
                          name="delete-outline"
                          size={20}
                          color="#EF4444"
                        />
                        <Text className="text-[15px] font-medium text-red-500">
                          Delete
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Ad */}
        {/* <View className="mt-3 min-h-[50px] items-center">
          <BannerAd
            unitId={adUnitId!}
            size={BannerAdSize.BANNER}
          />
        </View> */}
      </View>

      {/* Resume Rename Modal */}
      <RenameModal
        visible={isModalVisible}
        value={inputValue}
        onChangeText={setInputValue}
        onCancel={closeRenameModal}
        onConfirm={confirmRename}
      />

      {/* Cover Letter Rename Modal */}
      <RenameModal
        visible={isCoverRenameVisible}
        value={coverRenameValue}
        onChangeText={setCoverRenameValue}
        onCancel={closeCoverRenameModal}
        onConfirm={confirmCoverRename}
      />
    </SafeAreaView>
  );
}



