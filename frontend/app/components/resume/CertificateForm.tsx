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
  certificateId: string;
};

export default function CertificateForm({ certificateId }: Props) {
  const certificate = useResumeStore((state) => state.certificates.find((item) => item.id === certificateId));
  const updateCertificate = useResumeStore(
    (state) => state.updateCertificate
  );

  const [showDatePicker, setShowDatePicker] = useState(false);

  if (!certificate) {
    return (
      <View>
        <Text className="text-gray-500">Certificate not found</Text>
      </View>
    );
  }

  return (
    <View className="gap-6">
      {/* Name */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Certificate Name
        </Text>
        <TextInput
          className="h-12 border-b border-gray-300 px-1 text-base text-gray-900"
          placeholder="e.g. AWS Certified Solutions Architect"
          placeholderTextColor="#9CA3AF"
          value={certificate.name}
          onChangeText={(value) =>
            updateCertificate(certificateId, "name", value)
          }
        />
      </View>

      {/* Issuer */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Issuing Organization
        </Text>
        <TextInput
          className="h-12 border-b border-gray-300 px-1 text-base text-gray-900"
          placeholder="e.g. Amazon Web Services"
          placeholderTextColor="#9CA3AF"
          value={certificate.issuer}
          onChangeText={(value) =>
            updateCertificate(certificateId, "issuer", value)
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
              certificate.date
                ? "text-base text-gray-900"
                : "text-base text-gray-400"
            }
          >
            {certificate.date
              ? formatDate(new Date(certificate.date))
              : "Select date"}
          </Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={
              certificate.date ? new Date(certificate.date) : new Date()
            }
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(_, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                updateCertificate(
                  certificateId,
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
          placeholder="Optional details about this certificate..."
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="top"
          value={certificate.description}
          onChangeText={(value) =>
            updateCertificate(certificateId, "description", value)
          }
        />
      </View>
    </View>
  );
}