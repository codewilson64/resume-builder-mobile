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
import { formatDate } from "@/app/utils/formatDate";

export default function CustomSectionsPage() {
  const router = useRouter();
  const { customSections, addCustomSection, removeCustomSection } = useResumeStore();

  const handleAdd = () => {
    const id = randomUUID();

    addCustomSection({
      id,
      title: "",
      subtitle: "",
      date: null,
      description: "",
    });

    router.push({
      pathname: "/custom/[id]",
      params: { id },
    });
  };

  const handleEdit = (id: string) => {
    router.push({
      pathname: "/custom/[id]",
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
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center"
            >
              <MaterialIcons name="arrow-back" size={24} color="#111827" />
            </Pressable>
            <Text className="text-2xl font-semibold text-gray-900">
              Custom Sections
            </Text>
          </View>

          <Text className="mt-2 text-base leading-6 text-gray-600">
            Create your own sections like Projects, Volunteer Work, or
            Publications.
          </Text>

          <View className="mt-8 gap-4">
            {customSections.length === 0 ? (
              <View className="items-center rounded-xl border border-dashed border-gray-300 py-10">
                <MaterialIcons name="add-box" size={32} color="#9CA3AF" />
                <Text className="mt-3 text-sm text-gray-500">
                  No custom sections yet
                </Text>
              </View>
            ) : (
              customSections.map((section) => (
                <Pressable
                  key={section.id}
                  onPress={() => handleEdit(section.id)}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 pr-3">
                      <Text className="text-base font-semibold text-gray-900">
                        {section.title || "Untitled section"}
                      </Text>
                      {section.subtitle ? (
                        <Text className="mt-1 text-sm text-gray-600">
                          {section.subtitle}
                        </Text>
                      ) : null}
                      {section.date ? (
                        <Text className="mt-1 text-xs text-gray-400">
                          {formatDate(new Date(section.date))}
                        </Text>
                      ) : null}
                    </View>

                    <Pressable
                      onPress={() => removeCustomSection(section.id)}
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
                Add Custom Section
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