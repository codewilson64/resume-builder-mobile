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

export default function SkillsPage() {
  const router = useRouter();
  const { skills, addSkill, removeSkill } = useResumeStore();

  const handleAddSkill = () => {
    const id = randomUUID();

    addSkill({
      id,
      name: "",
    });

    router.push({
      pathname: "/skill/[id]",
      params: { id },
    });
  };

  const handleEditSkill = (id: string) => {
    router.push({
      pathname: "/skill/[id]",
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
              Skills
            </Text>
          </View>

          <Text className="mt-2 text-base leading-6 text-gray-600">
            Add the skills that best describe your experience and abilities.
          </Text>

          {/* List */}
          <View className="mt-8 gap-4">
            {skills.length === 0 ? (
              <View className="items-center rounded-xl border border-dashed border-gray-300 py-10">
                <MaterialIcons name="star-outline" size={32} color="#9CA3AF" />
                <Text className="mt-3 text-sm text-gray-500">
                  No skills added yet
                </Text>
              </View>
            ) : (
              skills.map((skill) => (
                <Pressable
                  key={skill.id}
                  onPress={() => handleEditSkill(skill.id)}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="flex-1 text-base font-medium text-gray-900">
                      {skill.name || "Untitled skill"}
                    </Text>

                    <Pressable
                      onPress={() => removeSkill(skill.id)}
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

            {/* Add button */}
            <Pressable
              onPress={handleAddSkill}
              className="flex-row items-center justify-center gap-2 rounded-xl border border-dashed border-cyan-400 py-4"
            >
              <MaterialIcons name="add" size={20} color="#06B6D4" />
              <Text className="text-base font-medium text-cyan-500">
                Add Skill
              </Text>
            </Pressable>
          </View>
        </ScrollView>

        {/* Bottom button */}
        <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4">
          <Pressable
            onPress={() => router.push("/about")}
            className="h-14 flex-row items-center justify-center rounded-lg bg-cyan-400"
          >
            <Text className="text-base font-medium text-white">
              Continue to About
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