import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, useColorScheme } from "react-native";

import { theme } from "@/constants/theme";
import { generateErrorMessage } from "@/libs/generateErrorMessage";

const ProfileScreen = () => {
  const { user } = useUser();
  const colorScheme = useColorScheme() ?? "light";
  const t = theme[colorScheme];
  const styles = styling(t);

  const [state, setState] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
  });

  if (!user) {
    return <Redirect href="/login" />;
  }

  const updateProfile = async () => {
    try {
      await user.update({
        firstName: state.firstName,
        lastName: state.lastName,
      });
    } catch (error) {
      const message = generateErrorMessage(error);

      alert(message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>
          Hello {user.firstName} {user.lastName}
        </Text>
      </View>
      <TextInput
        value={state.firstName}
        onChangeText={(text) => setState({ ...state, firstName: text })}
        placeholder="First Name"
        style={styles.input}
      />
      <TextInput
        value={state.lastName}
        onChangeText={(text) => setState({ ...state, lastName: text })}
        placeholder="Last Name"
        style={styles.input}
      />
      <Button title="Update Profile" onPress={updateProfile} color={t.primary} />
    </View>
  );
};

export default ProfileScreen;

const styling = (t: (typeof theme)[keyof typeof theme]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      gap: 20,
      backgroundColor: t.background,
      color: t.foreground,
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    input: {
      padding: 10,
      borderRadius: 8,
      backgroundColor: t.input,
      color: t.foreground,
    },
  });
