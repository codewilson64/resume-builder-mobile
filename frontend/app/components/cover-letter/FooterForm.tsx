import { useCoverLetterStore } from "@/app/store/coverLetterStore";
import { View, TextInput } from "react-native";

export default function FooterForm() {
  const { footer, updateFooter } = useCoverLetterStore();

  return (
    <View>
      <TextInput
        className="min-h-[180px] px-1 py-3 text-base leading-6 text-gray-900"
        placeholder="Input your closing remarks."
        placeholderTextColor="#9CA3AF"
        multiline
        textAlignVertical="top"
        value={footer.footer}
        onChangeText={(value) => updateFooter("footer", value)}
      />
    </View>
  );
}