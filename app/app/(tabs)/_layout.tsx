import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Live",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="timelapse" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="daily"
        options={{
          title: "24 Hours",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="today" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
