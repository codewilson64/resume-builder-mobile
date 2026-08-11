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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { getAllResumes, getResume } from "./db/resumeDatabase";
import { useResumeStore } from "./store/resumeStore";
import { useDeleteResume } from "./hooks/useDeleteResume";
import { formatUpdatedDate } from "./utils/formatDate";
import { useRenameResume } from "./hooks/useRenameResume";
import RenameModal from "./components/RenameModal";

type ResumeItem = {
  id: number;
  name: string;
  template: string;
  updated_at: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const [resumes, setResumes] = useState<ResumeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null); 
  
  const loadResume = useResumeStore((state) => state.loadResume);
  const resetAll = useResumeStore((state) => state.resetAll);

  const { handleDelete } = useDeleteResume(setResumes, setOpenMenuId);

  const {
    isModalVisible,
    inputValue,
    setInputValue,
    openRenameModal,
    closeRenameModal,
    confirmRename,
  } = useRenameResume(setResumes, setOpenMenuId);

  useFocusEffect(
    useCallback(() => {
      const loadResumes = () => {
        try {
          setLoading(true);
          const data = getAllResumes();
          setResumes(data);
        } catch (error) {
          console.error("Failed to load resumes:", error);
        } finally {
          setLoading(false);
        }
      };

      loadResumes();
    }, [])
  );

  const handleCreateResume = () => {
    resetAll();
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

  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };


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
            onPress={() => router.push("/header")}
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

        {/* Resume List */}
        <View className="mt-8 flex-1">
          <Text className="mb-4 text-2xl font-bold text-gray-900">
            My Resumes
          </Text>

          {loading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#06b6d4" />
            </View>
          ) : resumes.length === 0 ? (
            <View className="flex-1 items-center justify-center">
              <Text className="text-base text-gray-500">
                No resumes yet. Create your first one!
              </Text>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerClassName="gap-3 pb-5"
            >
              {resumes.map((resume) => (
                <View key={resume.id} className="relative">
                  <Pressable
                    className="min-h-[78px] flex-row items-center justify-between rounded-[14px] border border-gray-200 bg-gray-50 px-[18px] py-[14px]"
                    onPress={() => {
                      setOpenMenuId(null); 
                      handleOpenResume(resume.id);
                    }}
                  >
                    <View className="flex-1 pr-4">
                      <Text className="mb-[5px] text-[17px] font-semibold text-gray-900">
                        {resume.name}
                      </Text>
                      <Text className="text-[13px] text-gray-500">
                        {formatUpdatedDate(resume.updated_at)}
                      </Text>
                    </View>

                    {/* Triple dots button */}
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation?.();
                        toggleMenu(resume.id);
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
                  {openMenuId === resume.id && (
                    <View className="absolute right-6 top-[60px] z-50 min-w-[140px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                      <Pressable
                        onPress={() => openRenameModal(resume.id, resume.name)}
                        className="flex-row items-center gap-3 border-b border-gray-100 px-4 py-3 active:bg-gray-100"
                      >
                        <MaterialIcons name="edit" size={20} color="#374151" />
                        <Text className="text-[15px] font-medium text-gray-800">Rename</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => handleDelete(resume.id, resume.name)}
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
      </View>

      <RenameModal
        visible={isModalVisible}
        value={inputValue}
        onChangeText={setInputValue}
        onCancel={closeRenameModal}
        onConfirm={confirmRename}
      />
    </SafeAreaView>
  );
}

// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";

        {/* Ad */}
        {/* <View className="mt-3 min-h-[50px] items-center">
          <BannerAd
            unitId={TestIds.BANNER}
            size={BannerAdSize.BANNER}
          />
        </View> */}