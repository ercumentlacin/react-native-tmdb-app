import { ClerkProvider } from "@clerk/clerk-expo";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import Constants from "expo-constants";

import InitialLayout from "@/components/layout/initial-layout";
import { useColorScheme } from "@/components/useColorScheme";
import { tokenCache } from "@/libs/clerk/tokenCache";

export default function RootLayoutPresentation() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ClerkProvider
        publishableKey={Constants?.expoConfig?.extra?.clerkPublishableKey}
        tokenCache={tokenCache}>
        <InitialLayout />
      </ClerkProvider>
    </ThemeProvider>
  );
}
