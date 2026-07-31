import { View, Text, Dimensions } from "react-native";
import { useResumeStore } from "../../store/resumeStore";
import { formatDate } from "@/app/utils/formatDate";

const { width: screenWidth } = Dimensions.get("window");

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const scale = (screenWidth - 40) / A4_WIDTH;

export default function ResumePreview() {
  const { contact, about, experience, education, skill } = useResumeStore();

  const fullName = `${contact?.firstName ?? ""} ${contact?.lastName ?? ""}`.trim();

  const hasContact =
    contact?.email ||
    contact?.phone ||
    contact?.address ||
    contact?.city ||
    contact?.postalCode;

  const hasExperience =
    experience?.jobTitle ||
    experience?.companyName ||
    experience?.jobDescription;

  const hasEducation =
    education?.school ||
    education?.degree ||
    education?.description;

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

          {experience?.jobTitle ? (
            <Text className="mt-2 text-base text-gray-300">
              {experience.jobTitle}
            </Text>
          ) : null}

          {hasContact ? (
            <View className="mt-5">
              <View className="flex-row flex-wrap gap-x-4 gap-y-2">
                {contact.email ? (
                  <Text className="text-sm text-gray-300">
                    {contact.email}
                  </Text>
                ) : null}

                {contact.phone ? (
                  <Text className="text-sm text-gray-300">
                    {contact.phone}
                  </Text>
                ) : null}
              </View>

              {(contact.address ||
                contact.city ||
                contact.postalCode) && (
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

          {/* Experience */}
          {hasExperience ? (
            <ResumeSection title="Experience">
              <View>
                {experience.jobTitle ? (
                  <Text className="text-base font-semibold text-gray-900">
                    {experience.jobTitle}
                  </Text>
                ) : null}

                {experience.companyName ? (
                  <Text className="mt-1 text-sm font-medium text-gray-600">
                    {experience.companyName}
                  </Text>
                ) : null}

                {(experience.startDate ||
                  experience.endDate ||
                  experience.currentlyWorkHere) && (
                  <Text className="mt-1 text-xs text-gray-500">
                    {formatDate(experience.startDate)}
                    {experience.startDate ? " - " : ""}
                    {experience.currentlyWorkHere
                      ? "Present"
                      : formatDate(experience.endDate)}
                  </Text>
                )}

                {experience.city ? (
                  <Text className="mt-1 text-xs text-gray-500">
                    {experience.city}
                  </Text>
                ) : null}

                {experience.jobDescription ? (
                  <Text className="mt-3 text-sm leading-6 text-gray-700">
                    {experience.jobDescription}
                  </Text>
                ) : null}
              </View>
            </ResumeSection>
          ) : null}

          {/* Education */}
          {hasEducation ? (
            <ResumeSection title="Education">
              <View>
                {education.degree ? (
                  <Text className="text-base font-semibold text-gray-900">
                    {education.degree}
                  </Text>
                ) : null}

                {education.school ? (
                  <Text className="mt-1 text-sm font-medium text-gray-600">
                    {education.school}
                  </Text>
                ) : null}

                {education.graduationDate ? (
                  <Text className="mt-1 text-xs text-gray-500">
                    Graduated {formatDate(education.graduationDate)}
                  </Text>
                ) : null}

                {education.city ? (
                  <Text className="mt-1 text-xs text-gray-500">
                    {education.city}
                  </Text>
                ) : null}

                {education.description ? (
                  <Text className="mt-3 text-sm leading-6 text-gray-700">
                    {education.description}
                  </Text>
                ) : null}
              </View>
            </ResumeSection>
          ) : null}

          {/* Skills */}
          {skill?.name ? (
            <ResumeSection title="Skills">
              <View className="flex-row flex-wrap">
                <View className="rounded-md bg-gray-100 px-3 py-2">
                  <Text className="text-sm text-gray-700">
                    {skill.name}
                  </Text>
                </View>
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