import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import { formatDate } from "@/app/utils/formatDate";
import { useResumeStore } from "@/app/store/resumeStore";

type Props = {
  sectionId: string;
};

export default function CustomSectionForm({ sectionId }: Props) {
  const section = useResumeStore((state) => state.customSections.find((item) => item.id === sectionId));
  const updateCustomSection = useResumeStore(
    (state) => state.updateCustomSection
  );

  const [showDatePicker, setShowDatePicker] = useState(false);

  if (!section) {
    return (
      <View>
        <Text className="text-gray-500">Section not found</Text>
      </View>
    );
  }

  return (
    <View className="gap-6">
      {/* Title */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Section Title
        </Text>
        <TextInput
          className="h-12 border-b border-gray-300 px-1 text-base text-gray-900"
          placeholder="e.g. Volunteer Work, Projects"
          placeholderTextColor="#9CA3AF"
          value={section.title}
          onChangeText={(value) =>
            updateCustomSection(sectionId, "title", value)
          }
        />
      </View>

      {/* Subtitle */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Subtitle
        </Text>
        <TextInput
          className="h-12 border-b border-gray-300 px-1 text-base text-gray-900"
          placeholder="e.g. Red Cross / Project name"
          placeholderTextColor="#9CA3AF"
          value={section.subtitle}
          onChangeText={(value) =>
            updateCustomSection(sectionId, "subtitle", value)
          }
        />
      </View>

      {/* Date */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">Date</Text>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          className="h-12 justify-center border-b border-gray-300 px-1"
        >
          <Text
            className={
              section.date
                ? "text-base text-gray-900"
                : "text-base text-gray-400"
            }
          >
            {section.date
              ? formatDate(new Date(section.date))
              : "Select date"}
          </Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={section.date ? new Date(section.date) : new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(_, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                updateCustomSection(
                  sectionId,
                  "date",
                  selectedDate.toISOString()
                );
              }
            }}
          />
        )}
      </View>

      {/* Description */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Description
        </Text>
        <TextInput
          className="min-h-[100px] border-b border-gray-300 px-1 py-3 text-base text-gray-900"
          placeholder="Describe this entry..."
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="top"
          value={section.description}
          onChangeText={(value) =>
            updateCustomSection(sectionId, "description", value)
          }
        />
      </View>
    </View>
  );
}