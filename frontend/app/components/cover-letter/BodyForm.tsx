import { useCoverLetterStore } from "@/app/store/coverLetterStore";
import { View, TextInput } from "react-native";

export default function BodyForm() {
  const { body, updateBody } = useCoverLetterStore();

  return (
    <View>
      <TextInput
        className="min-h-[180px] px-1 py-3 text-base leading-6 text-gray-900"
        placeholder="Write a short summary about yourself and why they should hire you."
        placeholderTextColor="#9CA3AF"
        multiline
        textAlignVertical="top"
        value={body.body}
        onChangeText={(value) => updateBody("body", value)}
      />
    </View>
  );
}