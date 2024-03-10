import { useSignIn } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import React, { useReducer } from "react";
import { Button, StyleSheet, TextInput, View, useColorScheme } from "react-native";

import { theme } from "@/constants/theme";
import { generateErrorMessage } from "@/libs/generateErrorMessage";

const INITIAL_STATE = {
  email: "",
  password: "",
  code: "",
  successfulCreation: false,
};

type State = typeof INITIAL_STATE;

const reducer = (state: State, next: Partial<State>): State => ({
  ...state,
  ...next,
});

const LoginScreen = () => {
  const colorScheme = useColorScheme() ?? "light";
  const t = theme[colorScheme];
  const styles = styling(t);

  const { signIn, setActive } = useSignIn();

  const [{ email, password, code, successfulCreation }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE,
  );

  const onRequestReset = async () => {
    if (!signIn) return;

    try {
      await signIn.create({
        identifier: email,
        strategy: "reset_password_email_code",
      });

      dispatch({ successfulCreation: true });
    } catch (error) {
      const message = generateErrorMessage(error);

      alert(message);
    }
  };

  const onReset = async () => {
    if (!signIn) return;
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      alert("Password reset successfully");

      await setActive({ session: result.createdSessionId });
    } catch (error) {
      const message = generateErrorMessage(error);

      alert(message);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <>
          <TextInput
            autoCapitalize="none"
            placeholder="john@doe.com"
            value={email}
            onChangeText={(email) => dispatch({ email })}
            style={styles.input}
          />

          <Button onPress={onRequestReset} title="Send Reset Email" color={t.primary} />
        </>
      )}

      {successfulCreation && (
        <>
          <TextInput
            autoCapitalize="none"
            placeholder="Code"
            value={code}
            onChangeText={(code) => dispatch({ code })}
            style={styles.input}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="New password"
            secureTextEntry
            value={password}
            onChangeText={(password) => dispatch({ password })}
            style={styles.input}
          />
          <Button onPress={onReset} title="Reset Password" color={t.primary} />
        </>
      )}
    </View>
  );
};

export default LoginScreen;

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
    loginButton: {
      borderRadius: 8,
    },
    input: {
      padding: 10,
      borderRadius: 8,
      backgroundColor: t.input,
      color: t.foreground,
    },
  });
