import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";


import { formatDate } from "@/app/utils/formatDate";
import { useResumeStore } from "./store/resumeStore";

export default function ResumeFullPreview() {
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

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.min(Math.max(savedScale.value * e.scale, 0.6), 3);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const zoomIn = () => {
    const next = Math.min(savedScale.value + 0.25, 3);
    scale.value = withTiming(next);
    savedScale.value = next;
  };

  const zoomOut = () => {
    const next = Math.max(savedScale.value - 0.25, 0.6);
    scale.value = withTiming(next);
    savedScale.value = next;
  };

  const resetZoom = () => {
    scale.value = withTiming(1);
    savedScale.value = 1;
  };

  const fullName = `${contact?.firstName ?? ""} ${contact?.lastName ?? ""}`.trim();
  const contactLine = [
    contact?.phone,
    contact?.email,
    [contact?.city, contact?.address, contact?.postalCode]
      .filter(Boolean)
      .join(", ") || contact?.city,
  ]
    .filter(Boolean)
    .join(" | ");

  const skillsText = skills.filter((s) => s.name).map((s) => s.name).join(", ");
  const languagesText = languages
    .filter((l) => l.name)
    .map((l) => (l.proficiency ? `${l.name} (${l.proficiency})` : l.name))
    .join(", ");
  const hobbiesText = hobbies.filter((h) => h.name).map((h) => h.name).join(", ");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn}>
            <MaterialIcons name="close" size={24} color="#111" />
          </Pressable>

          <Text style={styles.title}>Full Preview</Text>

          <View style={{ flexDirection: "row", gap: 4 }}>
            <Pressable onPress={zoomOut} style={styles.iconBtn}>
              <MaterialIcons name="remove" size={22} color="#111" />
            </Pressable>
            <Pressable onPress={resetZoom} style={styles.iconBtn}>
              <MaterialIcons name="youtube-searched-for" size={20} color="#111" />
            </Pressable>
            <Pressable onPress={zoomIn} style={styles.iconBtn}>
              <MaterialIcons name="add" size={22} color="#111" />
            </Pressable>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 12 }}
          showsVerticalScrollIndicator
        >
          <GestureDetector gesture={pinch}>
            <Animated.View style={[{ backgroundColor: "#fff", borderRadius: 4 }, animatedStyle]}>
              <View style={{ paddingHorizontal: 24, paddingTop: 28, paddingBottom: 40 }}>
                {/* Header */}
                <Text style={{ fontSize: 22, fontWeight: "700", color: "#000" }}>
                  {fullName || "Your Name"}
                </Text>
                {contactLine ? (
                  <Text style={{ marginTop: 4, fontSize: 13, color: "#000" }}>
                    {contactLine}
                  </Text>
                ) : null}
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#9ca3af",
                    marginTop: 12,
                    marginBottom: 20,
                  }}
                />

                {/* About */}
                {about?.summary ? (
                  <Section title="About Me">
                    <Text style={styles.body}>{about.summary}</Text>
                  </Section>
                ) : null}

                {/* Skills */}
                {skillsText ? (
                  <Section title="Skills">
                    <Text style={styles.body}>{skillsText}</Text>
                  </Section>
                ) : null}

                {/* Experience */}
                {experiences.length > 0 ? (
                  <Section title="Experience">
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
                        <View key={exp.id} style={{ marginBottom: 14 }}>
                          {companyLine ? (
                            <Text style={styles.itemTitle}>{companyLine}</Text>
                          ) : null}
                          {titleLine ? (
                            <Text style={styles.itemSub}>{titleLine}</Text>
                          ) : null}
                          {exp.jobDescription ? (
                            <Text style={[styles.body, { marginTop: 4 }]}>
                              {exp.jobDescription}
                            </Text>
                          ) : null}
                        </View>
                      );
                    })}
                  </Section>
                ) : null}

                {/* Education */}
                {educations.length > 0 ? (
                  <Section title="Education">
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
                        <View key={edu.id} style={{ marginBottom: 14 }}>
                          {schoolLine ? (
                            <Text style={styles.itemTitle}>{schoolLine}</Text>
                          ) : null}
                          {degreeLine ? (
                            <Text style={styles.itemSub}>{degreeLine}</Text>
                          ) : null}
                          {edu.description ? (
                            <Text style={[styles.body, { marginTop: 4 }]}>
                              {edu.description}
                            </Text>
                          ) : null}
                        </View>
                      );
                    })}
                  </Section>
                ) : null}

                {/* Languages */}
                {languagesText ? (
                  <Section title="Languages">
                    <Text style={styles.body}>{languagesText}</Text>
                  </Section>
                ) : null}

                {/* Certificates */}
                {certificates.length > 0 ? (
                  <Section title="Certificates">
                    {certificates.map((cert) => (
                      <View key={cert.id} style={{ marginBottom: 12 }}>
                        {cert.name ? (
                          <Text style={styles.itemTitle}>{cert.name}</Text>
                        ) : null}
                        {(cert.issuer || cert.date) && (
                          <Text style={styles.itemSub}>
                            {[
                              cert.issuer,
                              cert.date ? formatDate(cert.date) : null,
                            ]
                              .filter(Boolean)
                              .join(" | ")}
                          </Text>
                        )}
                        {cert.description ? (
                          <Text style={[styles.body, { marginTop: 4 }]}>
                            {cert.description}
                          </Text>
                        ) : null}
                      </View>
                    ))}
                  </Section>
                ) : null}

                {/* Awards */}
                {awards.length > 0 ? (
                  <Section title="Awards">
                    {awards.map((award) => (
                      <View key={award.id} style={{ marginBottom: 12 }}>
                        {award.title ? (
                          <Text style={styles.itemTitle}>{award.title}</Text>
                        ) : null}
                        {(award.issuer || award.date) && (
                          <Text style={styles.itemSub}>
                            {[
                              award.issuer,
                              award.date ? formatDate(award.date) : null,
                            ]
                              .filter(Boolean)
                              .join(" | ")}
                          </Text>
                        )}
                        {award.description ? (
                          <Text style={[styles.body, { marginTop: 4 }]}>
                            {award.description}
                          </Text>
                        ) : null}
                      </View>
                    ))}
                  </Section>
                ) : null}

                {/* Hobbies */}
                {hobbiesText ? (
                  <Section title="Hobbies">
                    <Text style={styles.body}>{hobbiesText}</Text>
                  </Section>
                ) : null}

                {/* Custom Sections */}
                {customSections.map((section) =>
                  section.title || section.subtitle || section.description ? (
                    <Section
                      key={section.id}
                      title={section.title || "Additional"}
                    >
                      {section.subtitle ? (
                        <Text style={styles.itemTitle}>{section.subtitle}</Text>
                      ) : null}
                      {section.date ? (
                        <Text style={styles.itemSub}>
                          {formatDate(section.date)}
                        </Text>
                      ) : null}
                      {section.description ? (
                        <Text style={[styles.body, { marginTop: 4 }]}>
                          {section.description}
                        </Text>
                      ) : null}
                    </Section>
                  ) : null
                )}
              </View>
            </Animated.View>
          </GestureDetector>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={{ fontSize: 15, fontWeight: "700", color: "#000" }}>
        {title}
      </Text>
      <View
        style={{
          height: 1,
          backgroundColor: "#9ca3af",
          marginTop: 4,
          marginBottom: 8,
        }}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
  },
  itemSub: {
    fontSize: 13,
    color: "#000",
    marginTop: 1,
  },
  body: {
    fontSize: 13,
    color: "#000",
    lineHeight: 18,
  },
});