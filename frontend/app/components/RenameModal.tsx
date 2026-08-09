import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type Props = {
  visible: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function RenameModal({
  visible,
  value,
  onChangeText,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 items-center justify-center bg-black/40 px-6"
      >
        <View className="w-full max-w-[340px] rounded-2xl bg-white p-5">
          <Text className="mb-1 text-lg font-semibold text-gray-900">
            Rename Resume
          </Text>

          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder="Resume name"
            autoFocus
            selectTextOnFocus
            className="mb-5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />

          <View className="flex-row gap-3">
            <Pressable
              onPress={onCancel}
              className="flex-1 items-center rounded-xl bg-gray-100 py-3"
            >
              <Text className="text-base font-medium text-gray-700">Cancel</Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              className="flex-1 items-center rounded-xl bg-cyan-500 py-3"
            >
              <Text className="text-base font-medium text-white">Done</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}