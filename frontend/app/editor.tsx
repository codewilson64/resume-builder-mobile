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
import ContactForm from "./components/resume/ContactForm";

export default function EditorPage() {
  const router = useRouter()

  return (
    <SafeAreaView className="flex-1 bg-white">
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
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <Pressable 
                onPress={() => router.back()} 
                className="h-10 w-10 items-center justify-center" 
              > 
                <MaterialIcons name="arrow-back" size={24} color="#111827" /> 
              </Pressable>

              <Text className="text-2xl font-semibold text-gray-900">
                Contact Details
              </Text>
            </View>

              <Text className="text-base leading-6 text-gray-600">
                Provide your basic information so employers can reach you.
              </Text>
            </View>

          {/* Contact Form */}
          <View className="mt-8">
            <ContactForm />
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4">
          <Pressable
            onPress={() => router.push("/experience")}
            className="h-14 flex-row items-center justify-center rounded-lg bg-cyan-400"
          >
            <Text className="text-base font-medium text-white">
              Continue to Experience
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