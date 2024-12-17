import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Live',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="timelapse" color={color} />,
        }}
      />
      <Tabs.Screen
        name="daily"
        options={{
          title: '24 Hours',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="today" color={color} />,
        }}
      />
    </Tabs>
  );
}