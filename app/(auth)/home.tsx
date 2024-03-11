import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";

import { theme } from "@/constants/theme";
import { useGetPopularMoviesQuery } from "@/redux/api/tmdbApi";

const HomeScreen = () => {
  const { user } = useUser();
  const colorScheme = useColorScheme() ?? "light";
  const t = theme[colorScheme];
  const styles = styling(t);

  const { data: popularMovies, error, isLoading } = useGetPopularMoviesQuery(1);

  if (!user) {
    return <Redirect href="/login" />;
  }

  console.log({
    data: popularMovies,
    error,
    isLoading,
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          statusBarStyle: colorScheme,
          statusBarColor: t.primary,
        }}
      />
      <Text>
        Welcome {user.fullName ?? user.emailAddresses[0].emailAddress}! You are now logged in.
      </Text>
    </View>
  );
};

export default HomeScreen;

const styling = (t: (typeof theme)[keyof typeof theme]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.background,
      alignItems: "center",
      justifyContent: "center",
    },
  });
