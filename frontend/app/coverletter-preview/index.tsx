import {
  View,
  Text,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

import Classic from "../components/coverletter-template/Classic";
import Modern from "../components/coverletter-template/Modern";
import Sigma from "../components/coverletter-template/Sigma";

import { useCoverLetterStore } from "../store/coverLetterStore";
import { getCoverLetter, saveCoverLetter } from "../db/coverLetterDatabase";
import { useResumePager } from "../hooks/useResumePager";
import { downloadClassicCoverLetterPDF } from "../utils/generate-coverletter/ClassicCoverLetterPDF";
import { downloadModernCoverLetterPDF } from "../utils/generate-coverletter/ModernCoverLetterPDF";
import { downloadSigmaCoverLetterPDF } from "../utils/generate-coverletter/SigmaCoverLetterPDF";

const { width: screenWidth } = Dimensions.get("window");

// Cover letter pager
const PEEK = 75;
// Names pager
const NAME_ITEM_WIDTH = 80;

const STYLES = [
  { id: "classic", label: "Classic" },
  { id: "modern", label: "Modern" },
  { id: "sigma", label: "Sigma" },
];

const renderCoverLetter = (styleId: string) => {
  switch (styleId) {
    case "modern":
      return <Modern />;
    case "sigma":
      return <Sigma />;
    default:
      return <Classic />;
  }
};

export default function CoverLetterPreviewPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    currentPage,
    resumeListRef,
    namesListRef,
    scrollToPage,
    onResumeScrollEnd,
    PAGE_WIDTH,
  } = useResumePager();

  const {
    header,
    body,
    footer,
    currentCoverLetterId,
    setCurrentCoverLetterId,
  } = useCoverLetterStore();

  const handleDownload = async () => {
    try {
      setIsGenerating(true);

      const selectedStyle = STYLES[currentPage].id;

      const data = {
        header,
        body,
        footer,
      };

      if (selectedStyle === "modern") {
        await downloadModernCoverLetterPDF(data);
      } else if (selectedStyle === "sigma") {
        await downloadSigmaCoverLetterPDF(data);
      } else {
        await downloadClassicCoverLetterPDF(data);
      }

      let name = "My Cover Letter";

      if (currentCoverLetterId) {
        const existing = getCoverLetter(currentCoverLetterId);
        if (existing?.name) {
          name = existing.name;
        }
      }

      // Save to SQLite with the selected style
      const coverLetterId = saveCoverLetter(
        data,
        selectedStyle,
        name,
        currentCoverLetterId ?? undefined
      );

      // Store the id if this is a new cover letter
      if (!currentCoverLetterId) {
        setCurrentCoverLetterId(coverLetterId);
      }
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsGenerating(false);
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
          contentContainerStyle={{ backgroundColor: "#F9F9F9" }}
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
            Review your cover letter before downloading. Swipe to explore styles.
          </Text>

          {/* Cover Letter Preview pager */}
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
                  {renderCoverLetter(item.id)}
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
        <View className="absolute bottom-0 left-0 right-0 bg-[#F9F9F9] px-5 py-4">
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
                  Download Cover Letter
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