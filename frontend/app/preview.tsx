import {
  View,
  Text,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { downloadOrionResumePDF } from "./utils/generateOrionResumePDF";
import { useResumeStore } from "./store/resumeStore";

import Astra from "./components/template/Astra";
import Orion from "./components/template/Orion";
import { downloadAstraResumePDF } from "./utils/generateAstraResumePDF";

const { width: screenWidth } = Dimensions.get("window");

// Resume pager
const PEEK = 75;
const PAGE_WIDTH = screenWidth - PEEK;

// Names pager
const NAME_ITEM_WIDTH = 80; // approximate width per name

const STYLES = [
  { id: "orion", label: "Orion" },
  { id: "astra", label: "Astra" },
  { id: "aurora", label: "Aurora" },
  { id: "vega", label: "Vega" },
  { id: "lyra", label: "Lyra" },
  { id: "nova", label: "Nova" },
];

const renderResume = (styleId: string) => {
  switch (styleId) {
    case "astra":
      return <Astra />;
    case "aurora":
    case "vega":
    case "lyra":
    case "nova":
    default:
      return <Orion />;
  }
};

export default function PreviewPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const resumeListRef = useRef<FlatList>(null);
  const namesListRef = useRef<FlatList>(null);

  const {
    contact,
    about,
    experiences,
    educations,
    skills,
    languages,
    hobbies,
    certificates,
    awards,
    customSections,
  } = useResumeStore();

  const handleDownload = async () => {
    try {
      setIsGenerating(true);

      const selectedStyle = STYLES[currentPage].id;
      const data = {
        contact,
        about,
        experiences,
        educations,
        skills,
        languages,
        hobbies,
        certificates,
        awards,
        customSections,
      };

      if (selectedStyle === "astra") {
        await downloadAstraResumePDF(data);
      } else {
        await downloadOrionResumePDF(data);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const scrollToPage = (index: number) => {
    setCurrentPage(index);
    resumeListRef.current?.scrollToIndex({ index, animated: true });
    namesListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5, // keep selected name centered
    });
  };

  const onResumeScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / PAGE_WIDTH);
    if (page !== currentPage) {
      setCurrentPage(page);
      namesListRef.current?.scrollToIndex({
        index: page,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <KeyboardAvoidingView
        className="flex-1"
        style={{ backgroundColor: "#FFFFFF" }}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-5 pt-8 pb-32"
          style={{ backgroundColor: "#FFFFFF" }}
          contentContainerStyle={{ backgroundColor: "#FFFFFF" }}
        >
          {/* Header */}
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center"
            >
              <MaterialIcons name="arrow-back" size={24} color="#111827" />
            </Pressable>

            <Text className="text-2xl font-semibold text-gray-900">
              Preview
            </Text>
          </View>

          <Text className="mt-2 text-base leading-6 text-gray-600">
            Review your resume before continuing. Swipe to explore styles.
          </Text>

          {/* Resume Preview pager */}
          <View className="mt-8" style={{ marginHorizontal: -20 }}>
            <FlatList
              ref={resumeListRef}
              data={STYLES}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={onResumeScrollEnd}
              snapToInterval={PAGE_WIDTH}
              snapToAlignment="start"
              decelerationRate="fast"
              disableIntervalMomentum
              contentContainerStyle={{ paddingRight: PEEK }}
              style={{ width: screenWidth }}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: PAGE_WIDTH,
                    paddingHorizontal: 16,
                    alignItems: "center",
                    paddingBottom: 12,
                  }}
                >
                  {renderResume(item.id)}
                </View>
              )}
            />
          </View>

          {/* Style names – also scrollable with peek */}
          <View className="mt-6" style={{ marginHorizontal: -20 }}>
            <FlatList
              ref={namesListRef}
              data={STYLES}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: (screenWidth - NAME_ITEM_WIDTH) / 2,
              }}
              snapToInterval={NAME_ITEM_WIDTH}
              decelerationRate="fast"
              style={{ width: screenWidth }}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => scrollToPage(index)}
                  style={{
                    width: NAME_ITEM_WIDTH,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 8,
                  }}
                >
                  <Text
                    className={`text-lg font-medium ${
                      currentPage === index
                        ? "text-cyan-500"
                        : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4">
          <Pressable
            className="h-14 flex-row items-center justify-center rounded-lg bg-cyan-400"
            onPress={handleDownload}
            disabled={isGenerating}
            style={{ opacity: isGenerating ? 0.7 : 1 }}
          >
            {isGenerating ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-base font-medium text-white">
                  Download Resume
                </Text>
                <MaterialIcons
                  name="download"
                  size={20}
                  color="white"
                  style={{ marginLeft: 6 }}
                />
              </>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}