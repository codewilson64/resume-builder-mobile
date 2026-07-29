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
import AboutMeForm from "./components/resume/AboutMeForm";


export default function AboutPage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={0}
      >

        {/* Main Content */}
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
              <MaterialIcons
                name="arrow-back"
                size={24}
                color="#111827"
              />
            </Pressable>

            <Text className="text-2xl font-semibold text-gray-900">
              About Me
            </Text>
          </View>

          <Text className="mt-2 text-base leading-6 text-gray-600">
            Write a short summary about yourself, your experience, and your
            career goals.
          </Text>

          {/* About Me Form */}
          <View className="mt-8">
            <AboutMeForm />
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-slate-50 px-5 py-4">
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