import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Daily() {
  return (
    <SafeAreaView>
      <ThemedView>
        <ThemedText>24 Hours</ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}
