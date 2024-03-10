import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useReducer } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View, useColorScheme } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import { theme } from "@/constants/theme";
import { generateErrorMessage } from "@/libs/generateErrorMessage";

const INITIAL_STATE = {
  email: "",
  password: "",
  loading: false,
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

  const { signIn, setActive, isLoaded } = useSignIn();

  const [{ loading, email, password }, dispatch] = useReducer(reducer, INITIAL_STATE);

  const onSignInPress = async () => {
    if (!isLoaded) return;
    dispatch({ loading: true });

    try {
      const authenticateUser = await signIn.create({
        identifier: email,
        password,
      });

      await setActive({
        session: authenticateUser.createdSessionId,
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
      <Spinner visible={loading} />

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

      <Button onPress={onSignInPress} title="Login" color={t.primary} />

      <Link href="/forgot-password" asChild>
        <Pressable>
          <Text>Forgot password?</Text>
        </Pressable>
      </Link>

      <Link href="/register" asChild>
        <Pressable>
          <Text>Register</Text>
        </Pressable>
      </Link>
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
