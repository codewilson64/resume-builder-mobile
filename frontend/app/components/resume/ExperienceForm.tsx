import {
  View,
  Text,
  TextInput,
  Switch,
  Pressable,
  Platform,
} from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import { formatDate } from "@/app/utils/formatDate";
import { useResumeStore } from "@/app/store/resumeStore";

type Props = {
  experienceId: string;
};

export default function ExperienceForm({ experienceId }: Props) {
  const experience = useResumeStore((state) =>
    state.experiences.find((item) => item.id === experienceId)
  );
  const updateExperience = useResumeStore((state) => state.updateExperience);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  if (!experience) {
    return (
      <View>
        <Text className="text-gray-500">Experience not found</Text>
      </View>
    );
  }

  return (
    <View className="gap-6">
      {/* Job Title */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Job Title
        </Text>
        <TextInput
          className="h-12 border-b border-gray-300 px-1 text-base text-gray-900"
          placeholder="Software Engineer"
          placeholderTextColor="#9CA3AF"
          value={experience.jobTitle}
          onChangeText={(value) =>
            updateExperience(experienceId, "jobTitle", value)
          }
        />
      </View>

      {/* Company Name */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Company Name
        </Text>
        <TextInput
          className="h-12 border-b border-gray-300 px-1 text-base text-gray-900"
          placeholder="Company Name"
          placeholderTextColor="#9CA3AF"
          value={experience.companyName}
          onChangeText={(value) =>
            updateExperience(experienceId, "companyName", value)
          }
        />
      </View>

      {/* Start & End Date */}
      <View className="flex-row gap-4">
        {/* Start Date */}
        <View className="flex-1">
          <Text className="mb-2 text-sm font-medium text-gray-700">
            Start Date
          </Text>
          <Pressable
            onPress={() => setShowStartPicker(true)}
            className="h-12 justify-center border-b border-gray-300 px-1"
          >
            <Text
              className={
                experience.startDate
                  ? "text-base text-gray-900"
                  : "text-base text-gray-400"
              }
            >
              {experience.startDate
                ? formatDate(new Date(experience.startDate))
                : "Select date"}
            </Text>
          </Pressable>
        </View>

        {/* End Date */}
        <View className="flex-1">
          <Text className="mb-2 text-sm font-medium text-gray-700">
            End Date
          </Text>
          <Pressable
            onPress={() =>
              !experience.currentlyWorkHere && setShowEndPicker(true)
            }
            className="h-12 justify-center border-b border-gray-300 px-1"
            disabled={experience.currentlyWorkHere}
          >
            <Text
              className={
                experience.currentlyWorkHere
                  ? "text-base text-gray-400"
                  : experience.endDate
                    ? "text-base text-gray-900"
                    : "text-base text-gray-400"
              }
            >
              {experience.currentlyWorkHere
                ? "Present"
                : experience.endDate
                  ? formatDate(new Date(experience.endDate))
                  : "Select date"}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* ========== DateTimePickers moved below the form ========== */}
      {showStartPicker && (
        <DateTimePicker
          value={
            experience.startDate
              ? new Date(experience.startDate)
              : new Date()
          }
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate) {
              updateExperience(
                experienceId,
                "startDate",
                selectedDate.toISOString()
              );
            }
          }}
          style={{ width: "100%" }} // helps on iOS
        />
      )}

      {showEndPicker && !experience.currentlyWorkHere && (
        <DateTimePicker
          value={
            experience.endDate ? new Date(experience.endDate) : new Date()
          }
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate) {
              updateExperience(
                experienceId,
                "endDate",
                selectedDate.toISOString()
              );
            }
          }}
          style={{ width: "100%" }} // helps on iOS
        />
      )}

      {/* Currently Work Here */}
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-4">
          <Text className="text-sm font-medium text-gray-700">
            I currently work here
          </Text>
        </View>
        <Switch
          value={experience.currentlyWorkHere}
          onValueChange={(value) => {
            updateExperience(experienceId, "currentlyWorkHere", value);
            if (value) {
              updateExperience(experienceId, "endDate", null);
            }
          }}
          trackColor={{ false: "#D1D5DB", true: "#67E8F9" }}
          thumbColor="#FFFFFF"
        />
      </View>

      {/* City */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">City</Text>
        <TextInput
          className="h-12 border-b border-gray-300 px-1 text-base text-gray-900"
          placeholder="Medan"
          placeholderTextColor="#9CA3AF"
          value={experience.city}
          onChangeText={(value) =>
            updateExperience(experienceId, "city", value)
          }
        />
      </View>

      {/* Job Description */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Job Description
        </Text>
        <TextInput
          className="min-h-[120px] border-b border-gray-300 px-1 py-3 text-base text-gray-900"
          placeholder="Describe your responsibilities, achievements, and contributions..."
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="top"
          value={experience.jobDescription}
          onChangeText={(value) =>
            updateExperience(experienceId, "jobDescription", value)
          }
        />
      </View>
    </View>
  );
}