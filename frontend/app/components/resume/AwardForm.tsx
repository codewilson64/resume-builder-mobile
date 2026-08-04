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
  awardId: string;
};

export default function AwardForm({ awardId }: Props) {
  const award = useResumeStore((state) => state.awards.find((item) => item.id === awardId));
  const updateAward = useResumeStore((state) => state.updateAward);

  const [showDatePicker, setShowDatePicker] = useState(false);

  if (!award) {
    return (
      <View>
        <Text className="text-gray-500">Award not found</Text>
      </View>
    );
  }

  return (
    <View className="gap-6">
      {/* Title */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Award Title
        </Text>
        <TextInput
          className="h-12 border-b border-gray-300 px-1 text-base text-gray-900"
          placeholder="e.g. Employee of the Year"
          placeholderTextColor="#9CA3AF"
          value={award.title}
          onChangeText={(value) => updateAward(awardId, "title", value)}
        />
      </View>

      {/* Issuer */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Issuing Organization
        </Text>
        <TextInput
          className="h-12 border-b border-gray-300 px-1 text-base text-gray-900"
          placeholder="e.g. Acme Corp"
          placeholderTextColor="#9CA3AF"
          value={award.issuer}
          onChangeText={(value) => updateAward(awardId, "issuer", value)}
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
              award.date ? "text-base text-gray-900" : "text-base text-gray-400"
            }
          >
            {award.date
              ? formatDate(new Date(award.date))
              : "Select date"}
          </Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={award.date ? new Date(award.date) : new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(_, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                updateAward(awardId, "date", selectedDate.toISOString());
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
          placeholder="Optional details about this award..."
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="top"
          value={award.description}
          onChangeText={(value) =>
            updateAward(awardId, "description", value)
          }
        />
      </View>
    </View>
  );
}