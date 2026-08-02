import { View, Text, TextInput } from "react-native";
import { useResumeStore } from "@/app/store/resumeStore";

type Props = {
  skillId: string;
};

export default function SkillForm({ skillId }: Props) {
  const skill = useResumeStore((state) => state.skills.find((item) => item.id === skillId));
  const updateSkill = useResumeStore((state) => state.updateSkill);

  if (!skill) {
    return (
      <View>
        <Text className="text-gray-500">Skill not found</Text>
      </View>
    );
  }

  return (
    <View className="gap-6">
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">Skill</Text>
        <TextInput
          className="h-12 border-b border-gray-300 px-1 text-base text-gray-900"
          placeholder="e.g. JavaScript"
          placeholderTextColor="#9CA3AF"
          value={skill.name}
          onChangeText={(value) => updateSkill(skillId, "name", value)}
          autoFocus
        />
      </View>
    </View>
  );
}