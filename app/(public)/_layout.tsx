import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

import { theme } from "@/constants/theme";

export default function PublicLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const t = theme[colorScheme];

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: t.accentForeground,
        },
        headerTintColor: t.accent,
        headerBackTitle: "Back",
        headerShadowVisible: false,
        statusBarColor: t.accentForeground,
        statusBarStyle: colorScheme,
      }}>
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "Login",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerTitle: "Create Account",
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          headerTitle: "Forgot Password",
        }}
      />
    </Stack>
  );
}
