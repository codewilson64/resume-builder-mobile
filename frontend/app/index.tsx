import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const resumes = [
  {
    id: "1",
    title: "Software Engineer",
    updated: "Updated recently",
  },
  {
    id: "2",
    title: "Data Analyst",
    updated: "Updated recently",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Top Actions */}
        <View style={styles.actions}>
          <Pressable
            style={styles.actionButton}
            onPress={() => router.push("/editor")}
          >
            <Text style={styles.actionText}>Create Resume</Text>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </Pressable>

          <Pressable
            style={styles.actionButton}
            onPress={() => router.push("/cover-letter")}
          >
            <Text style={styles.actionText}>Create Cover Letter</Text>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </Pressable>
        </View>

        {/* Resume List */}
        <View style={styles.resumeSection}>
          <Text style={styles.sectionTitle}>My Resumes</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.resumeList}
          >
            {resumes.map((resume) => (
              <Pressable
                key={resume.id}
                style={styles.resumeCard}
                onPress={() => router.push("/editor")}
              >
                <View style={styles.resumeInfo}>
                  <Text style={styles.resumeTitle}>
                    {resume.title}
                  </Text>

                  <Text style={styles.resumeUpdated}>
                    {resume.updated}
                  </Text>
                </View>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={26}
                  color="#6B7280"
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Ad */}
        <View style={styles.adContainer}>
          <BannerAd
            unitId={TestIds.BANNER}
            size={BannerAdSize.BANNER}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  actions: {
    gap: 12,
  },

  actionButton: {
    height: 58,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  actionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  resumeSection: {
    flex: 1,
    marginTop: 32,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },

  resumeList: {
    gap: 12,
    paddingBottom: 20,
  },

  resumeCard: {
    minHeight: 78,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  resumeInfo: {
    flex: 1,
  },

  resumeTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 5,
  },

  resumeUpdated: {
    fontSize: 13,
    color: "#6B7280",
  },

  adContainer: {
    alignItems: "center",
    minHeight: 50,
    marginTop: 12,
  },
});
