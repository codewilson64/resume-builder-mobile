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

export default function ExperiencePage() {
  const router = useRouter();
  const { experiences, addExperience, removeExperience } = useResumeStore();

  const handleAddExperience = () => {
    const id = randomUUID();

    addExperience({
      id,
      jobTitle: "",
      companyName: "",
      startDate: null,
      endDate: null,
      currentlyWorkHere: false,
      city: "",
      jobDescription: "",
    });

    router.push({
      pathname: "/experience/[id]",
      params: { id },
    });
  };

  const handleEditExperience = (id: string) => {
    router.push({
      pathname: "/experience/[id]",
      params: { id },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={0}
      >
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
              Work Experience
            </Text>
          </View>

          <Text className="mt-2 text-base leading-6 text-gray-600">
            Add details about your work history.
          </Text>

          {/* List of experiences */}
          <View className="mt-8 gap-4">
            {experiences.length === 0 ? (
              <View className="items-center rounded-xl border border-dashed border-gray-300 py-10">
                <MaterialIcons name="work-outline" size={32} color="#9CA3AF" />
                <Text className="mt-3 text-sm text-gray-500">
                  No experience added yet
                </Text>
              </View>
            ) : (
              experiences.map((exp) => (
                <Pressable
                  key={exp.id}
                  onPress={() => handleEditExperience(exp.id)}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 pr-3">
                      <Text className="text-base font-semibold text-gray-900">
                        {exp.jobTitle || "Untitled position"}
                      </Text>
                      <Text className="mt-1 text-sm text-gray-600">
                        {exp.companyName || "Company"}
                      </Text>
                      <Text className="mt-1 text-xs text-gray-400">
                        {exp.startDate
                          ? formatDate(new Date(exp.startDate))
                          : "Start date"}
                        {" – "}
                        {exp.currentlyWorkHere
                          ? "Present"
                          : exp.endDate
                            ? formatDate(new Date(exp.endDate))
                            : "End date"}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => removeExperience(exp.id)}
                      hitSlop={8}
                      className="h-8 w-8 items-center justify-center"
                    >
                      <MaterialIcons name="delete-outline" size={20} color="#EF4444" />
                    </Pressable>
                  </View>
                </Pressable>
              ))
            )}

            {/* Add button */}
            <Pressable
              onPress={handleAddExperience}
              className="flex-row items-center justify-center gap-2 rounded-xl border border-dashed border-cyan-400 py-4"
            >
              <MaterialIcons name="add" size={20} color="#06B6D4" />
              <Text className="text-base font-medium text-cyan-500">
                Add Experience
              </Text>
            </Pressable>
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4">
          <Pressable
            onPress={() => router.push("/education")}
            className="h-14 flex-row items-center justify-center rounded-lg bg-cyan-400"
          >
            <Text className="text-base font-medium text-white">
              Continue to Education
            </Text>
            <MaterialIcons
              name="arrow-forward"
              size={20}
              color="white"
              style={{ marginLeft: 6 }}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}