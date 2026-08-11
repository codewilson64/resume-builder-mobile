import {
  View,
  Text,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import Classic from "../components/coverletter-template/Classic";
import { useCoverLetterStore } from "../store/coverLetterStore";
import { downloadClassicCoverLetterPDF } from "../utils/generate-coverletter/generateClassicCoverLetterPDF";
import { saveCoverLetter } from "../db/coverLetterDatabase";

const { width: screenWidth } = Dimensions.get("window");

export default function CoverLetterPreviewPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  const { header, body, footer, currentCoverLetterId, setCurrentCoverLetterId } = useCoverLetterStore();

const handleDownload = async () => {
  try {
    setIsGenerating(true);

    const data = {
      header,
      body,
      footer,
    };

    // Generate & download PDF
    await downloadClassicCoverLetterPDF(data);

    // Save to SQLite
    const coverLetterId = saveCoverLetter(
      data,
      "classic",
      "My Cover Letter",
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
            Review your cover letter before downloading.
          </Text>

          {/* Cover Letter Preview */}
          <View className="mt-8 items-center">
            <Classic />
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