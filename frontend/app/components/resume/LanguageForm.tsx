import { View, Text, TextInput, Pressable } from "react-native";
import { useResumeStore } from "@/app/store/resumeStore";

const PROFICIENCY_OPTIONS = ["Native", "Fluent", "Intermediate", "Basic"];

type Props = {
  languageId: string;
};

export default function LanguageForm({ languageId }: Props) {
  const language = useResumeStore((state) =>
    state.languages.find((item) => item.id === languageId)
  );
  const updateLanguage = useResumeStore((state) => state.updateLanguage);

  if (!language) {
    return (
      <View>
        <Text className="text-gray-500">Language not found</Text>
      </View>
    );
  }

  return (
    <View className="gap-6">
      {/* Language name */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Language
        </Text>
        <TextInput
          className="h-12 border-b border-gray-300 px-1 text-base text-gray-900"
          placeholder="e.g. English"
          placeholderTextColor="#9CA3AF"
          value={language.name}
          onChangeText={(value) =>
            updateLanguage(languageId, "name", value)
          }
          autoFocus
        />
      </View>

      {/* Proficiency */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Proficiency
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {PROFICIENCY_OPTIONS.map((option) => {
            const selected = language.proficiency === option;
            return (
              <Pressable
                key={option}
                onPress={() =>
                  updateLanguage(languageId, "proficiency", option)
                }
                className={`rounded-full px-4 py-2 ${
                  selected ? "bg-cyan-400" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    selected ? "text-white" : "text-gray-700"
                  }`}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}