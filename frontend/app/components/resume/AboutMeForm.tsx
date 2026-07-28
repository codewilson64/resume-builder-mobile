import { View, Text, TextInput } from "react-native";

export default function AboutMeForm() {
  return (
    <View>
      <Text className="mb-2 text-sm font-medium text-gray-700">
        Summary
      </Text>

      <TextInput
        className="min-h-[180px] border-b border-gray-300 px-1 py-3 text-base leading-6 text-gray-900"
        placeholderTextColor="#9CA3AF"
        multiline
        textAlignVertical="top"
      />
    </View>
  );
}