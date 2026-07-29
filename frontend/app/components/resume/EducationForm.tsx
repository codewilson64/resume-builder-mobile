import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import { formatDate } from "../../utils/formatDate";
import { useResumeStore } from "@/app/store/resumeStore";

export default function EducationForm() {
  const { education, updateEducation } = useResumeStore();

  const [showGraduationPicker, setShowGraduationPicker] = useState(false);

  return (
    <View className="gap-6">

      {/* School */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          School
        </Text>

        <TextInput
          className="h-12 border-b border-gray-300 px-1 text-base text-gray-900"
          placeholder="University Name"
          placeholderTextColor="#9CA3AF"
          value={education.school}
          onChangeText={(value) =>
            updateEducation("school", value)
          }
        />
      </View>

      {/* Degree */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Degree
        </Text>

        <TextInput
          className="h-12 border-b border-gray-300 px-1 text-base text-gray-900"
          placeholder="Bachelor of Science"
          placeholderTextColor="#9CA3AF"
          value={education.degree}
          onChangeText={(value) =>
            updateEducation("degree", value)
          }
        />
      </View>

      {/* Graduation Date */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Graduation Date
        </Text>

        <Pressable
          onPress={() => setShowGraduationPicker(true)}
          className="h-12 justify-center border-b border-gray-300 px-1"
        >
          <Text
            className={
              education.graduationDate
                ? "text-base text-gray-900"
                : "text-base text-gray-400"
            }
          >
            {education.graduationDate
              ? formatDate(
                  new Date(education.graduationDate)
                )
              : "Select date"}
          </Text>
        </Pressable>

        {showGraduationPicker && (
          <DateTimePicker
            value={
              education.graduationDate
                ? new Date(education.graduationDate)
                : new Date()
            }
            mode="date"
            display={
              Platform.OS === "ios"
                ? "spinner"
                : "default"
            }
            onChange={(event, selectedDate) => {
              setShowGraduationPicker(false);

              if (selectedDate) {
                updateEducation(
                  "graduationDate",
                  selectedDate.toISOString()
                );
              }
            }}
          />
        )}
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
          value={education.city}
          onChangeText={(value) =>
            updateEducation("city", value)
          }
        />
      </View>

      {/* Description */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Description
        </Text>

        <TextInput
          className="min-h-[120px] border-b border-gray-300 px-1 py-3 text-base text-gray-900"
          placeholder="Describe your studies, achievements, and relevant coursework..."
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="top"
          value={education.description}
          onChangeText={(value) =>
            updateEducation("description", value)
          }
        />
      </View>

    </View>
  );
}