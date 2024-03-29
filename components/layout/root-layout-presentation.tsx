import { ClerkProvider } from "@clerk/clerk-expo";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import Constants from "expo-constants";
import { Provider } from "react-redux";

import InitialLayout from "@/components/layout/initial-layout";
import { useColorScheme } from "@/components/useColorScheme";
import { tokenCache } from "@/libs/clerk/tokenCache";
import { store } from "@/redux/store";

export default function RootLayoutPresentation() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ClerkProvider
          publishableKey={Constants?.expoConfig?.extra?.clerkPublishableKey}
          tokenCache={tokenCache}>
          <InitialLayout />
        </ClerkProvider>
      </ThemeProvider>
    </Provider>
  );
}
