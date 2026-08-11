import { View, Text, Dimensions } from "react-native";
import { useResumeStore } from "../../store/resumeStore";
import { formatDate } from "@/app/utils/formatDate";

const { width: screenWidth } = Dimensions.get("window");

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

// Keep the smaller size we set earlier
const scale = (screenWidth - 110) / A4_WIDTH;
const scaledWidth = A4_WIDTH * scale;
const scaledHeight = A4_HEIGHT * scale;

export default function Orion() {
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
        width: scaledWidth,
        height: scaledHeight,
        backgroundColor: "#FFFFFF",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        overflow: "hidden",
      }}
    >
      {/* Scale from top-left by compensating the default center origin */}
      <View
        style={{
          width: A4_WIDTH,
          height: A4_HEIGHT,
          backgroundColor: "#FFFFFF",
          transform: [
            // move back the amount the center-scale shifted us
            { translateX: -(A4_WIDTH * (1 - scale)) / 2 },
            { translateY: -(A4_HEIGHT * (1 - scale)) / 2 },
            { scale },
          ],
        }}
      >
        {/* Header */}
        <View className="px-8 pt-8 pb-8">
          <Text className="text-2xl font-bold text-black">
            {fullName || "Your Name"}
          </Text>

          {hasContact && contactLine ? (
            <Text className="mt-1 text-sm text-black">{contactLine}</Text>
          ) : null}
        </View>

        {/* Main Content */}
        <View className="px-8 pb-8">
          {about?.summary ? (
            <ResumeSection title="Summary">
              <Text className="text-sm leading-5 text-black">
                {about.summary}
              </Text>
            </ResumeSection>
          ) : null}

          {hasSkills && skillsText ? (
            <ResumeSection title="Skills">
              <Text className="text-sm text-black">{skillsText}</Text>
            </ResumeSection>
          ) : null}

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

          {hasLanguages && languagesText ? (
            <ResumeSection title="Languages">
              <Text className="text-sm text-black">{languagesText}</Text>
            </ResumeSection>
          ) : null}

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

          {hasHobbies && hobbiesText ? (
            <ResumeSection title="Hobbies">
              <Text className="text-sm text-black">{hobbiesText}</Text>
            </ResumeSection>
          ) : null}

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