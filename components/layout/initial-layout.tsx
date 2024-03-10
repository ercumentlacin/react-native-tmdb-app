import { useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const isInAuthTabsGroup = segments[0] === "(auth)";

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn && !isInAuthTabsGroup) {
      router.replace("/home");
    } else if (!isSignedIn && !isInAuthTabsGroup) {
      router.replace("/login");
    }
  }, [isSignedIn, isLoaded, isInAuthTabsGroup, router]);

  return <Slot />;
};

export default InitialLayout;
