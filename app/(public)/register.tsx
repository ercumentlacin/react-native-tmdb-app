import { useSignUp } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import React, { useReducer } from "react";
import { Button, StyleSheet, TextInput, View, useColorScheme } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import { theme } from "@/constants/theme";
import { generateErrorMessage } from "@/libs/generateErrorMessage";

const INITIAL_STATE = {
  email: "",
  password: "",
  loading: false,
  pendingVerification: false,
  code: "",
};

type State = typeof INITIAL_STATE;

const reducer = (state: State, next: Partial<State>): State => ({
  ...state,
  ...next,
});

const RegisterScreen = () => {
  const colorScheme = useColorScheme() ?? "light";
  const t = theme[colorScheme];
  const styles = styling(t);

  const { signUp, setActive, isLoaded } = useSignUp();

  const [{ loading, email, password, code, pendingVerification }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE,
  );

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    dispatch({ loading: true });

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      dispatch({ pendingVerification: true });
    } catch (error) {
      const message = generateErrorMessage(error);
      alert(message);
    } finally {
      dispatch({ loading: false });
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
    dispatch({ loading: true });

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      await setActive({
        session: completeSignUp.createdSessionId,
      });
    } catch (error) {
      const message = generateErrorMessage(error);

      alert(message);
    } finally {
      dispatch({ loading: false });
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />

      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            placeholder="john@doe.com"
            value={email}
            onChangeText={(email) => dispatch({ email })}
            style={styles.input}
          />
          <TextInput
            secureTextEntry
            autoCapitalize="none"
            placeholder="********"
            value={password}
            onChangeText={(password) => dispatch({ password })}
            style={styles.input}
          />

          <Button onPress={onSignUpPress} title="Register" color={t.primary} />
        </>
      )}

      {pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            placeholder="123456"
            value={code}
            keyboardType="number-pad"
            onChangeText={(code) => dispatch({ code })}
            style={styles.input}
          />

          <Button onPress={onPressVerify} title="Verify" color={t.primary} />
        </>
      )}
    </View>
  );
};

export default RegisterScreen;

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
    registerButton: {
      borderRadius: 8,
    },
    input: {
      padding: 10,
      borderRadius: 8,
      backgroundColor: t.input,
      color: t.foreground,
    },
  });
