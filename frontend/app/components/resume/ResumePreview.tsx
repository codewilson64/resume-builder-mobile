import { View, Text, Dimensions, Pressable } from "react-native";
import { useResumeStore } from "../../store/resumeStore";
import { formatDate } from "@/app/utils/formatDate";
import { useRouter } from "expo-router";

const { width: screenWidth } = Dimensions.get("window");

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const scale = (screenWidth - 40) / A4_WIDTH;

export default function ResumePreview() {
  const router = useRouter();

  const {
    contact,
    about,
    experiences,
    educations,
    skills,
    languages,
    hobbies,
    certificates,
    awards,
    customSections,
  } = useResumeStore();

  const fullName = `${contact?.firstName ?? ""} ${contact?.lastName ?? ""}`.trim();

  const hasContact =
    contact?.email ||
    contact?.phone ||
    contact?.address ||
    contact?.city ||
    contact?.postalCode;

  const contactLine = [
    contact?.phone,
    contact?.email,
    [contact?.city, contact?.address, contact?.postalCode]
      .filter(Boolean)
      .join(", ") || contact?.city,
  ]
    .filter(Boolean)
    .join(" | ");

  const hasExperiences = experiences.length > 0;
  const hasEducations = educations.length > 0;
  const hasSkills = skills.length > 0;
  const hasLanguages = languages.length > 0;
  const hasHobbies = hobbies.length > 0;
  const hasCertificates = certificates.length > 0;
  const hasAwards = awards.length > 0;
  const hasCustomSections = customSections.length > 0;

  const skillsText = skills
    .filter((s) => s.name)
    .map((s) => s.name)
    .join(", ");

  const languagesText = languages
    .filter((l) => l.name)
    .map((l) => (l.proficiency ? `${l.name} (${l.proficiency})` : l.name))
    .join(", ");

  const hobbiesText = hobbies
    .filter((h) => h.name)
    .map((h) => h.name)
    .join(", ");

  return (
      <View
        style={{
          alignItems: "center",
          height: A4_HEIGHT * scale,
          backgroundColor: "#FFFFFF",
        }}
      >
        <View
          style={{
            width: A4_WIDTH,
            height: A4_HEIGHT,
            backgroundColor: "#FFFFFF",
            transform: [{ scale }],
            transformOrigin: "top",
            elevation: 3,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <View className="px-8 pt-8 pb-4">
            <Text className="text-2xl font-bold text-black">
              {fullName || "Your Name"}
            </Text>

            {hasContact && contactLine ? (
              <Text className="mt-1 text-sm text-black">{contactLine}</Text>
            ) : null}

            <View className="mt-3 h-px bg-gray-400" />
          </View>

          {/* Main Content */}
          <View className="px-8 pb-8">
            {/* About */}
            {about?.summary ? (
              <ResumeSection title="About Me">
                <Text className="text-sm leading-5 text-black">
                  {about.summary}
                </Text>
              </ResumeSection>
            ) : null}

            {/* Skills */}
            {hasSkills && skillsText ? (
              <ResumeSection title="Skills">
                <Text className="text-sm text-black">{skillsText}</Text>
              </ResumeSection>
            ) : null}

            {/* Experiences */}
            {hasExperiences ? (
              <ResumeSection title="Experience">
                <View className="gap-4">
                  {experiences.map((exp) => {
                    const companyLine = [exp.companyName, exp.city]
                      .filter(Boolean)
                      .join(" | ");

                    const dateRange =
                      exp.startDate || exp.endDate || exp.currentlyWorkHere
                        ? `${formatDate(exp.startDate)}${
                            exp.startDate ? " - " : ""
                          }${
                            exp.currentlyWorkHere
                              ? "Present"
                              : formatDate(exp.endDate)
                          }`
                        : "";

                    const titleLine = [exp.jobTitle, dateRange]
                      .filter(Boolean)
                      .join(" | ");

                    return (
                      <View key={exp.id}>
                        {companyLine ? (
                          <Text className="text-sm font-semibold text-black">
                            {companyLine}
                          </Text>
                        ) : null}

                        {titleLine ? (
                          <Text className="text-sm text-black">{titleLine}</Text>
                        ) : null}

                        {exp.jobDescription ? (
                          <Text className="mt-1 text-sm leading-5 text-black">
                            {exp.jobDescription}
                          </Text>
                        ) : null}
                      </View>
                    );
                  })}
                </View>
              </ResumeSection>
            ) : null}

            {/* Educations */}
            {hasEducations ? (
              <ResumeSection title="Education">
                <View className="gap-4">
                  {educations.map((edu) => {
                    const schoolLine = [edu.school, edu.city]
                      .filter(Boolean)
                      .join(" | ");

                    const degreeLine = [
                      edu.degree,
                      edu.graduationDate
                        ? formatDate(edu.graduationDate)
                        : null,
                    ]
                      .filter(Boolean)
                      .join(" | ");

                    return (
                      <View key={edu.id}>
                        {schoolLine ? (
                          <Text className="text-sm font-semibold text-black">
                            {schoolLine}
                          </Text>
                        ) : null}

                        {degreeLine ? (
                          <Text className="text-sm text-black">{degreeLine}</Text>
                        ) : null}

                        {edu.description ? (
                          <Text className="mt-1 text-sm leading-5 text-black">
                            {edu.description}
                          </Text>
                        ) : null}
                      </View>
                    );
                  })}
                </View>
              </ResumeSection>
            ) : null}

            {/* Languages */}
            {hasLanguages && languagesText ? (
              <ResumeSection title="Languages">
                <Text className="text-sm text-black">{languagesText}</Text>
              </ResumeSection>
            ) : null}

            {/* Certificates */}
            {hasCertificates ? (
              <ResumeSection title="Certificates">
                <View className="gap-3">
                  {certificates.map((cert) => (
                    <View key={cert.id}>
                      {cert.name ? (
                        <Text className="text-sm font-semibold text-black">
                          {cert.name}
                        </Text>
                      ) : null}
                      {cert.issuer || cert.date ? (
                        <Text className="text-sm text-black">
                          {[cert.issuer, cert.date ? formatDate(cert.date) : null]
                            .filter(Boolean)
                            .join(" | ")}
                        </Text>
                      ) : null}
                      {cert.description ? (
                        <Text className="mt-1 text-sm text-black">
                          {cert.description}
                        </Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              </ResumeSection>
            ) : null}

            {/* Awards */}
            {hasAwards ? (
              <ResumeSection title="Awards">
                <View className="gap-3">
                  {awards.map((award) => (
                    <View key={award.id}>
                      {award.title ? (
                        <Text className="text-sm font-semibold text-black">
                          {award.title}
                        </Text>
                      ) : null}
                      {award.issuer || award.date ? (
                        <Text className="text-sm text-black">
                          {[
                            award.issuer,
                            award.date ? formatDate(award.date) : null,
                          ]
                            .filter(Boolean)
                            .join(" | ")}
                        </Text>
                      ) : null}
                      {award.description ? (
                        <Text className="mt-1 text-sm text-black">
                          {award.description}
                        </Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              </ResumeSection>
            ) : null}

            {/* Hobbies */}
            {hasHobbies && hobbiesText ? (
              <ResumeSection title="Hobbies">
                <Text className="text-sm text-black">{hobbiesText}</Text>
              </ResumeSection>
            ) : null}

            {/* Custom Sections */}
            {hasCustomSections
              ? customSections.map((section) =>
                  section.title || section.subtitle || section.description ? (
                    <ResumeSection
                      key={section.id}
                      title={section.title || "Additional"}
                    >
                      <View>
                        {section.subtitle ? (
                          <Text className="text-sm font-semibold text-black">
                            {section.subtitle}
                          </Text>
                        ) : null}
                        {section.date ? (
                          <Text className="text-sm text-black">
                            {formatDate(section.date)}
                          </Text>
                        ) : null}
                        {section.description ? (
                          <Text className="mt-1 text-sm text-black">
                            {section.description}
                          </Text>
                        ) : null}
                      </View>
                    </ResumeSection>
                  ) : null
                )
              : null}
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
    <View className="mb-5">
      <Text className="text-base font-bold text-black">{title}</Text>
      <View className="mt-1 mb-2 h-px bg-gray-400" />
      {children}
    </View>
  );
}