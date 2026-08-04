import { View, Text, TextInput } from "react-native";
import { useResumeStore } from "@/app/store/resumeStore";

type Props = {
  hobbyId: string;
};

export default function HobbyForm({ hobbyId }: Props) {
  const hobby = useResumeStore((state) => state.hobbies.find((item) => item.id === hobbyId));
  const updateHobby = useResumeStore((state) => state.updateHobby);

  if (!hobby) {
    return (
      <View>
        <Text className="text-gray-500">Hobby not found</Text>
      </View>
    );
  }

  return (
    <View className="gap-6">
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">Hobby</Text>
        <TextInput
          className="h-12 border-b border-gray-300 px-1 text-base text-gray-900"
          placeholder="e.g. Photography"
          placeholderTextColor="#9CA3AF"
          value={hobby.name}
          onChangeText={(value) => updateHobby(hobbyId, "name", value)}
          autoFocus
        />
      </View>
    </View>
  );
}