import { View, Text, TextInput } from "react-native";
import { useResumeStore } from "../../store/resumeStore";

export default function AboutMeForm() {
  const { about, updateAbout } = useResumeStore();

  return (
    <View>
      <Text className="mb-2 text-sm font-medium text-gray-700">
        Summary
      </Text>

      <TextInput
        className="min-h-[180px] border-b border-gray-300 px-1 py-3 text-base leading-6 text-gray-900"
        placeholder="Write a short summary about yourself..."
        placeholderTextColor="#9CA3AF"
        multiline
        textAlignVertical="top"
        value={about.summary}
        onChangeText={(value) =>
          updateAbout("summary", value)
        }
      />
    </View>
  );
}