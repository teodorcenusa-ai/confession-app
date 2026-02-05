import { Tabs } from "expo-router";
import { BookOpen, FileText, ScrollText, CheckCircle } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#8B4513",
        tabBarInactiveTintColor: "#9CA3AF",
        headerShown: true,
        headerTitle: "Taina Spovedaniei",
        headerStyle: {
          backgroundColor: "#8B4513",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "700" as const,
          fontSize: 20,
        },
        headerShadowVisible: true,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600" as const,
          marginBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="prayers"
        options={{
          title: "Înainte",
          tabBarIcon: ({ color }) => <ScrollText size={24} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="guide"
        options={{
          title: "Îndreptarul",
          tabBarIcon: ({ color }) => <BookOpen size={24} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="document"
        options={{
          title: "Document",
          tabBarIcon: ({ color }) => <FileText size={24} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="after-prayers"
        options={{
          title: "După",
          tabBarIcon: ({ color }) => <CheckCircle size={24} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
