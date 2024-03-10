import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, useColorScheme } from "react-native";

import { theme } from "@/constants/theme";

const LogOutButton = () => {
  const { signOut } = useAuth();
  const colorScheme = useColorScheme() ?? "light";
  const t = theme[colorScheme];
  const styles = styling(t);

  const handleSignOut = () => signOut();

  return (
    <Pressable onPress={handleSignOut} style={styles.logoutButton}>
      <Ionicons name="log-out" size={24} color={t.accent} />
    </Pressable>
  );
};

const styling = (t: (typeof theme)[keyof typeof theme]) =>
  StyleSheet.create({
    logoutButton: {
      marginRight: 10,
    },
  });

export default LogOutButton;
