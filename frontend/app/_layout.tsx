import { Stack } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#000" : "#ffffff"} // Android only
      />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="editor" options={{ headerShown: false }} />

        <Stack.Screen name="experience/index" options={{ headerShown: false }} />
        <Stack.Screen name="experience/[id]" options={{ headerShown: false }} />
        
        <Stack.Screen name="education/index" options={{ headerShown: false }} />
        <Stack.Screen name="education/[id]" options={{ headerShown: false }} />
        
        <Stack.Screen name="skill/index" options={{ headerShown: false }} />
        <Stack.Screen name="skill/[id]" options={{ headerShown: false }} />
        
        <Stack.Screen name="about" options={{ headerShown: false }} />
        <Stack.Screen name="preview" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
