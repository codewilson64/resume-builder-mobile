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

export default function ExperienceForm() {
  const { experience, updateExperience } = useResumeStore();

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

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
            updateExperience("jobTitle", value)
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
            updateExperience("companyName", value)
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

          {showStartPicker && (
            <DateTimePicker
              value={
                experience.startDate
                  ? new Date(experience.startDate)
                  : new Date()
              }
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowStartPicker(false);

                if (selectedDate) {
                  updateExperience(
                    "startDate",
                    selectedDate.toISOString()
                  );
                }
              }}
            />
          )}
        </View>

        {/* End Date */}
        <View className="flex-1">
          <Text className="mb-2 text-sm font-medium text-gray-700">
            End Date
          </Text>

          <Pressable
            onPress={() => setShowEndPicker(true)}
            className="h-12 justify-center border-b border-gray-300 px-1"
          >
            <Text
              className={
                experience.endDate
                  ? "text-base text-gray-900"
                  : "text-base text-gray-400"
              }
            >
              {experience.endDate
                ? formatDate(new Date(experience.endDate))
                : "Select date"}
            </Text>
          </Pressable>

          {showEndPicker && (
            <DateTimePicker
              value={
                experience.endDate
                  ? new Date(experience.endDate)
                  : new Date()
              }
              mode="date"
              display={
                Platform.OS === "ios"
                  ? "spinner"
                  : "default"
              }
              onChange={(event, selectedDate) => {
                setShowEndPicker(false);

                if (selectedDate) {
                  updateExperience(
                    "endDate",
                    selectedDate.toISOString()
                  );
                }
              }}
            />
          )}
        </View>

      </View>

      {/* Currently Work Here */}
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-4">
          <Text className="text-sm font-medium text-gray-700">
            I currently work here
          </Text>
        </View>

        <Switch
          value={experience.currentlyWorkHere}
          onValueChange={(value) =>
            updateExperience(
              "currentlyWorkHere",
              value
            )
          }
          trackColor={{
            false: "#D1D5DB",
            true: "#67E8F9",
          }}
          thumbColor="#FFFFFF"
        />
      </View>

      {/* City */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          City
        </Text>

        <TextInput
          className="h-12 border-b border-gray-300 px-1 text-base text-gray-900"
          placeholder="Medan"
          placeholderTextColor="#9CA3AF"
          value={experience.city}
          onChangeText={(value) =>
            updateExperience("city", value)
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
            updateExperience(
              "jobDescription",
              value
            )
          }
        />
      </View>

    </View>
  );
}