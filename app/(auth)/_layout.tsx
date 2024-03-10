import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import React, { useCallback } from "react";
import { useColorScheme } from "react-native";

import LogOutButton from "@/components/navigation/LogOutButton";
import { theme } from "@/constants/theme";

interface TabBarIconProps {
  color: string;
  size: number;
}

const TabsScreen = () => {
  const { isSignedIn } = useAuth();
  const colorScheme = useColorScheme() ?? "light";
  const t = theme[colorScheme];

  const personIcon = useCallback(
    ({ color, size }: TabBarIconProps) => <Ionicons name="person" size={size} color={color} />,
    [],
  );
  const homeIcon = useCallback(
    ({ color, size }: TabBarIconProps) => <Ionicons name="home" size={size} color={color} />,
    [],
  );

  if (!isSignedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: t.primary },
        headerTintColor: t.primaryForeground,
        headerStyle: { backgroundColor: t.primary },
        tabBarActiveTintColor: t.accent,
        tabBarInactiveTintColor: t.mutedForeground,
      }}>
      <Tabs.Screen
        name="home"
        redirect={!isSignedIn}
        options={{
          headerTitle: "Home",
          tabBarLabel: "Home",
          tabBarIcon: homeIcon,
        }}
      />
      <Tabs.Screen
        name="profile"
        redirect={!isSignedIn}
        options={{
          headerTitle: "Profile",
          headerRight: LogOutButton,
          tabBarIcon: personIcon,
        }}
      />
    </Tabs>
  );
};

export default TabsScreen;
