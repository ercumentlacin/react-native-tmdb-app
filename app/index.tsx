import { ActivityIndicator, StyleSheet, View, useColorScheme } from "react-native";

import { theme } from "@/constants/theme";

const StartPage = () => {
  const colorScheme = useColorScheme() ?? "light";
  const t = theme[colorScheme];
  const styles = styling(t);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={t.primary} />
    </View>
  );
};

const styling = (t: (typeof theme)[keyof typeof theme]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
  });

export default StartPage;
