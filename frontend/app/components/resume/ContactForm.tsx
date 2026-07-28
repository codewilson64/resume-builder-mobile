import { View, Text, TextInput } from "react-native";

export default function ContactForm() {
  return (
    <View className="gap-6">

      {/* First & Last Name */}
      <View className="flex-row gap-4">

        <View className="flex-1">
          <Text className="mb-2 text-sm font-medium text-gray-700">
            First Name
          </Text>

          <TextInput
            className="h-12 border-b border-gray-300 text-base text-gray-900"
            placeholder="John"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View className="flex-1">
          <Text className="mb-2 text-sm font-medium text-gray-700">
            Last Name
          </Text>

          <TextInput
            className="h-12 border-b border-gray-300 text-base text-gray-900"
            placeholder="Doe"
            placeholderTextColor="#9CA3AF"
          />
        </View>

      </View>

      {/* Email */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Email
        </Text>

        <TextInput
          className="h-12 border-b border-gray-300 text-base text-gray-900"
          placeholder="you@example.com"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Address */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Address
        </Text>

        <TextInput
          className="h-12 border-b border-gray-300 text-base text-gray-900"
          placeholder="Enter a location"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Phone */}
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">
          Phone
        </Text>

        <TextInput
          className="h-12 border-b border-gray-300 text-base text-gray-900"
          placeholder="(555)123-4567"
          placeholderTextColor="#9CA3AF"
          keyboardType="phone-pad"
        />
      </View>

      {/* City & Postal Code */}
      <View className="flex-row gap-4">

        <View className="flex-1">
          <Text className="mb-2 text-sm font-medium text-gray-700">
            City
          </Text>

          <TextInput
            className="h-12 border-b border-gray-300 text-base text-gray-900"
            placeholder="New York"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View className="flex-1">
          <Text className="mb-2 text-sm font-medium text-gray-700">
            Postal Code
          </Text>

          <TextInput
            className="h-12 border-b border-gray-300 text-base text-gray-900"
            placeholder="20111"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
        </View>

      </View>

    </View>
  );
}
