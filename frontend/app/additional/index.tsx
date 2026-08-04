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

const SECTIONS = [
  {
    id: "languages",
    title: "Languages",
    description: "Add languages you speak",
    icon: "translate" as const,
  },
  {
    id: "hobbies",
    title: "Hobbies",
    description: "Share your interests and hobbies",
    icon: "favorite-border" as const,
  },
  {
    id: "certificates",
    title: "Certificates",
    description: "Add professional certificates",
    icon: "verified" as const,
  },
  {
    id: "awards",
    title: "Awards",
    description: "Highlight your achievements",
    icon: "emoji-events" as const,
  },
  {
    id: "custom",
    title: "Custom Section",
    description: "Create your own section",
    icon: "add-box" as const,
  },
];

export default function AdditionalPage() {
  const router = useRouter();

  const handleSectionPress = (id: string) => {
    if (id === "languages") {
      router.push("/language");
      return;
    }
    if (id === "hobbies") {
      router.push("/hobby");
      return;
    }
    if (id === "certificates") {
      router.push("/certificate");
      return;
    }
    if (id === "awards") {
      router.push("/award");
      return;
    }
    if (id === "custom") {
      router.push("/custom");
      return;
    }
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
              Additional Sections
            </Text>
          </View>

          <Text className="mt-2 text-base leading-6 text-gray-600">
            Optionally add more sections to strengthen your resume. You can skip
            this step.
          </Text>

          {/* Section buttons */}
          <View className="mt-8 gap-3">
            {SECTIONS.map((section) => (
              <Pressable
                key={section.id}
                onPress={() => handleSectionPress(section.id)}
                className="flex-row items-center rounded-xl border border-gray-200 bg-white p-4"
              >
                <View className="h-11 w-11 items-center justify-center rounded-full bg-cyan-50">
                  <MaterialIcons
                    name={section.icon}
                    size={22}
                    color="#06B6D4"
                  />
                </View>

                <View className="ml-4 flex-1">
                  <Text className="text-base font-semibold text-gray-900">
                    {section.title}
                  </Text>
                  <Text className="mt-0.5 text-sm text-gray-500">
                    {section.description}
                  </Text>
                </View>

                <MaterialIcons name="chevron-right" size={22} color="#9CA3AF" />
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Bottom button — skip / continue to preview */}
        <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4">
          <Pressable
            onPress={() => router.push("/preview")}
            className="h-14 flex-row items-center justify-center rounded-lg bg-cyan-400"
          >
            <Text className="text-base font-medium text-white">
              Continue to Preview
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