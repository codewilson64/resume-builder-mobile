import "./global.css";
import cv from "./assets/menu/cv.png"
import cover_letter from "./assets/menu/letter.png"
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const resumes = [
  {
    id: "1",
    title: "Software Engineer",
    updated: "Updated recently",
  },
  {
    id: "2",
    title: "Data Analyst",
    updated: "Updated recently",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 py-4">

        {/* Top Actions */}
        <View className="gap-3">
          <Pressable
            className="h-[64px] flex-row items-center justify-between rounded-[14px] bg-gray-100 px-[18px]"
            onPress={() => router.push("/editor")}
          >
            <View className="flex-row items-center gap-3"> 
              <Image source={cv} className="h-10 w-10" resizeMode="contain" /> 
              <Text className="text-base font-semibold text-gray-900"> 
                Create Resume 
              </Text> 
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </Pressable>

          <Pressable
            className="h-[64px] flex-row items-center justify-between rounded-[14px] bg-gray-100 px-[18px]"
            onPress={() => router.push("/cover-letter")}
          >
            <View className="flex-row items-center gap-3"> 
              <Image source={cover_letter} className="h-10 w-10" resizeMode="contain" /> 
              <Text className="text-base font-semibold text-gray-900"> 
                Create Cover Letter 
              </Text> 
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </Pressable>
        </View>

        {/* Resume List */}
        <View className="mt-8 flex-1">
          <Text className="mb-4 text-2xl font-bold text-gray-900">
            My Resumes
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="gap-3 pb-5"
          >
            {resumes.map((resume) => (
              <Pressable
                key={resume.id}
                className="min-h-[78px] flex-row items-center justify-between rounded-[14px] border border-gray-200 bg-gray-50 px-[18px] py-[14px]"
                onPress={() => router.push("/editor")}
              >
                <View className="flex-1">
                  <Text className="mb-[5px] text-[17px] font-semibold text-gray-900">
                    {resume.title}
                  </Text>

                  <Text className="text-[13px] text-gray-500">
                    {resume.updated}
                  </Text>
                </View>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={26}
                  color="#6B7280"
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Ad */}
        <View className="mt-3 min-h-[50px] items-center">
          <BannerAd
            unitId={TestIds.BANNER}
            size={BannerAdSize.BANNER}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}
