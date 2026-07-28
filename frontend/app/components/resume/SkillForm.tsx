import { View, Text, TextInput, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function SkillsForm() {
  return (
    <View className="gap-6">

      {/* Skill 1 */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Skill
        </Text>

        <View className="flex-row items-center">
          <TextInput
            className="h-12 flex-1 border-b border-gray-300 px-1 text-base text-gray-900"
            placeholder="e.g. JavaScript"
            placeholderTextColor="#9CA3AF"
          />

          <Pressable className="ml-3 h-10 w-10 items-center justify-center">
            <MaterialIcons
              name="delete-outline"
              size={22}
              color="#6B7280"
            />
          </Pressable>
        </View>
      </View>

      {/* Add Skill */}
      <Pressable className="flex-row items-center self-start">
        <MaterialIcons
          name="add"
          size={22}
          color="#06B6D4"
        />

        <Text className="ml-1 text-base font-medium text-cyan-500">
          Add another skill
        </Text>
      </Pressable>

    </View>
  );
}