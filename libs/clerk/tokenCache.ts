import type { ClerkProviderProps } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

export const tokenCache: ClerkProviderProps["tokenCache"] = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return await SecureStore.setItemAsync(key, value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {}
  },
};
