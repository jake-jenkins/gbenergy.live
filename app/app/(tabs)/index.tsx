import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <ThemedView>
        <ThemedText>Live</ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}
