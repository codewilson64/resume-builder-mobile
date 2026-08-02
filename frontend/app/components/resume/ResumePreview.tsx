import { View, Text, Dimensions } from "react-native";
import { useResumeStore } from "../../store/resumeStore";
import { formatDate } from "@/app/utils/formatDate";

const { width: screenWidth } = Dimensions.get("window");

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const scale = (screenWidth - 40) / A4_WIDTH;

export default function ResumePreview() {
  const { contact, about, experiences, educations, skills } = useResumeStore();

  const fullName = `${contact?.firstName ?? ""} ${contact?.lastName ?? ""}`.trim();

  const hasContact =
    contact?.email ||
    contact?.phone ||
    contact?.address ||
    contact?.city ||
    contact?.postalCode;

  const hasExperiences = experiences.length > 0;
  const hasEducations = educations.length > 0;
  const hasSkills = skills.length > 0;

  // Use the most recent job title for the header (optional)
  const latestJobTitle = experiences[0]?.jobTitle;

  return (
    <View
      style={{
        alignItems: "center",
        height: A4_HEIGHT * scale,
      }}
    >
      <View
        style={{
          width: A4_WIDTH,
          height: A4_HEIGHT,
          backgroundColor: "white",
          transform: [{ scale }],
          transformOrigin: "top",
          elevation: 3,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
        }}
      >
        {/* Header */}
        <View className="bg-gray-900 px-8 py-8">
          <Text className="text-3xl font-bold text-white">
            {fullName || "Your Name"}
          </Text>

          {latestJobTitle ? (
            <Text className="mt-2 text-base text-gray-300">
              {latestJobTitle}
            </Text>
          ) : null}

          {hasContact ? (
            <View className="mt-5">
              <View className="flex-row flex-wrap gap-x-4 gap-y-2">
                {contact.email ? (
                  <Text className="text-sm text-gray-300">{contact.email}</Text>
                ) : null}
                {contact.phone ? (
                  <Text className="text-sm text-gray-300">{contact.phone}</Text>
                ) : null}
              </View>

              {(contact.address || contact.city || contact.postalCode) && (
                <Text className="mt-2 text-sm text-gray-300">
                  {[contact.address, contact.city, contact.postalCode]
                    .filter(Boolean)
                    .join(", ")}
                </Text>
              )}
            </View>
          ) : null}
        </View>

        {/* Main Content */}
        <View className="px-8 py-8">
          {/* About */}
          {about?.summary ? (
            <ResumeSection title="About Me">
              <Text className="text-sm leading-6 text-gray-700">
                {about.summary}
              </Text>
            </ResumeSection>
          ) : null}

          {/* Experiences */}
          {hasExperiences ? (
            <ResumeSection title="Experience">
              <View className="gap-6">
                {experiences.map((exp) => (
                  <View key={exp.id}>
                    {exp.jobTitle ? (
                      <Text className="text-base font-semibold text-gray-900">
                        {exp.jobTitle}
                      </Text>
                    ) : null}

                    {exp.companyName ? (
                      <Text className="mt-1 text-sm font-medium text-gray-600">
                        {exp.companyName}
                      </Text>
                    ) : null}

                    {(exp.startDate || exp.endDate || exp.currentlyWorkHere) && (
                      <Text className="mt-1 text-xs text-gray-500">
                        {formatDate(exp.startDate)}
                        {exp.startDate ? " - " : ""}
                        {exp.currentlyWorkHere
                          ? "Present"
                          : formatDate(exp.endDate)}
                      </Text>
                    )}

                    {exp.city ? (
                      <Text className="mt-1 text-xs text-gray-500">
                        {exp.city}
                      </Text>
                    ) : null}

                    {exp.jobDescription ? (
                      <Text className="mt-3 text-sm leading-6 text-gray-700">
                        {exp.jobDescription}
                      </Text>
                    ) : null}
                  </View>
                ))}
              </View>
            </ResumeSection>
          ) : null}

          {/* Educations */}
          {hasEducations ? (
            <ResumeSection title="Education">
              <View className="gap-6">
                {educations.map((edu) => (
                  <View key={edu.id}>
                    {edu.degree ? (
                      <Text className="text-base font-semibold text-gray-900">
                        {edu.degree}
                      </Text>
                    ) : null}

                    {edu.school ? (
                      <Text className="mt-1 text-sm font-medium text-gray-600">
                        {edu.school}
                      </Text>
                    ) : null}

                    {edu.graduationDate ? (
                      <Text className="mt-1 text-xs text-gray-500">
                        Graduated {formatDate(edu.graduationDate)}
                      </Text>
                    ) : null}

                    {edu.city ? (
                      <Text className="mt-1 text-xs text-gray-500">
                        {edu.city}
                      </Text>
                    ) : null}

                    {edu.description ? (
                      <Text className="mt-3 text-sm leading-6 text-gray-700">
                        {edu.description}
                      </Text>
                    ) : null}
                  </View>
                ))}
              </View>
            </ResumeSection>
          ) : null}

          {/* Skills */}
          {hasSkills ? (
            <ResumeSection title="Skills">
              <View className="flex-row flex-wrap gap-2">
                {skills.map((skill) =>
                  skill.name ? (
                    <View
                      key={skill.id}
                      className="rounded-md bg-gray-100 px-3 py-2"
                    >
                      <Text className="text-sm text-gray-700">{skill.name}</Text>
                    </View>
                  ) : null
                )}
              </View>
            </ResumeSection>
          ) : null}
        </View>
      </View>
    </View>
  );
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-8">
      <Text className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">
        {title}
      </Text>
      <View className="mb-4 h-px bg-gray-200" />
      {children}
    </View>
  );
}