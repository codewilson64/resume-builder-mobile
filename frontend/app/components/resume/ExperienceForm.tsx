import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "@/app/utils/formatDate";

export default function ExperienceForm() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
                startDate
                  ? "text-base text-gray-900"
                  : "text-base text-gray-400"
              }
            >
              {startDate ? formatDate(startDate) : "Select date"}
            </Text>
          </Pressable>

          {showStartPicker && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowStartPicker(false);

                if (selectedDate) {
                  setStartDate(selectedDate);
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
                endDate
                  ? "text-base text-gray-900"
                  : "text-base text-gray-400"
              }
            >
              {endDate ? formatDate(endDate) : "Select date"}
            </Text>
          </Pressable>

          {showEndPicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowEndPicker(false);

                if (selectedDate) {
                  setEndDate(selectedDate);
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
          value={false}
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
        />
      </View>

    </View>
  );
}