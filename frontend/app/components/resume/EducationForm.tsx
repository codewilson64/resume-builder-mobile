import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "../../utils/formatDate"; 

export default function EducationForm() {
  const [graduationDate, setGraduationDate] = useState<Date | null>(null);
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
              graduationDate
                ? "text-base text-gray-900"
                : "text-base text-gray-400"
            }
          >
            {graduationDate ? formatDate(graduationDate) : "Select date"}
          </Text>
        </Pressable>

        {showGraduationPicker && (
          <DateTimePicker
            value={graduationDate || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowGraduationPicker(false);

              if (selectedDate) {
                setGraduationDate(selectedDate);
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
        />
      </View>
    </View>
  );
}