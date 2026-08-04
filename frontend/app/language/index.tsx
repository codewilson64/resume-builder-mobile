import {
  View,
  Text,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { randomUUID } from "expo-crypto";

import { useResumeStore } from "@/app/store/resumeStore";

export default function LanguagesPage() {
  const router = useRouter();
  const { languages, addLanguage, removeLanguage } = useResumeStore();

  const handleAdd = () => {
    const id = randomUUID();

    addLanguage({
      id,
      name: "",
      proficiency: "",
    });

    router.push({
      pathname: "/language/[id]",
      params: { id },
    });
  };

  const handleEdit = (id: string) => {
    router.push({
      pathname: "/language/[id]",
      params: { id },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-5 pt-8 pb-32"
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
              Languages
            </Text>
          </View>

          <Text className="mt-2 text-base leading-6 text-gray-600">
            Add languages you speak and your proficiency level.
          </Text>

          {/* List */}
          <View className="mt-8 gap-4">
            {languages.length === 0 ? (
              <View className="items-center rounded-xl border border-dashed border-gray-300 py-10">
                <MaterialIcons name="translate" size={32} color="#9CA3AF" />
                <Text className="mt-3 text-sm text-gray-500">
                  No languages added yet
                </Text>
              </View>
            ) : (
              languages.map((lang) => (
                <Pressable
                  key={lang.id}
                  onPress={() => handleEdit(lang.id)}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1 pr-3">
                      <Text className="text-base font-semibold text-gray-900">
                        {lang.name || "Untitled language"}
                      </Text>
                      {lang.proficiency ? (
                        <Text className="mt-1 text-sm text-gray-500">
                          {lang.proficiency}
                        </Text>
                      ) : null}
                    </View>

                    <Pressable
                      onPress={() => removeLanguage(lang.id)}
                      hitSlop={8}
                      className="h-8 w-8 items-center justify-center"
                    >
                      <MaterialIcons
                        name="delete-outline"
                        size={20}
                        color="#EF4444"
                      />
                    </Pressable>
                  </View>
                </Pressable>
              ))
            )}

            <Pressable
              onPress={handleAdd}
              className="flex-row items-center justify-center gap-2 rounded-xl border border-dashed border-cyan-400 py-4"
            >
              <MaterialIcons name="add" size={20} color="#06B6D4" />
              <Text className="text-base font-medium text-cyan-500">
                Add Language
              </Text>
            </Pressable>
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4">
          <Pressable
            onPress={() => router.back()}
            className="h-14 items-center justify-center rounded-lg bg-cyan-400"
          >
            <Text className="text-base font-medium text-white">Done</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}