import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as NavigationBar from 'expo-navigation-bar';
import { ConfessionContext } from "../contexts/ConfessionContext";
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
  async function setup() {
    await SplashScreen.hideAsync();
    // Nu mai punem NavigationBar aici, se ocupă app.json
  }
  setup();
}, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfessionContext>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: true, // REAPARE TITLUL
              headerStyle: { backgroundColor: "#8B4513" },
              headerTintColor: "#FFFFFF",
              headerTitleAlign: "center",
              headerTitle: "Taina Spovedaniei",
              // AICI REPARĂM CEASUL (Status Bar):
              headerStatusBarHeight: Platform.OS === 'android' ? undefined : 0, 
            }}
          >
            <Stack.Screen name="(tabs)" />
          </Stack>
        </GestureHandlerRootView>
      </ConfessionContext>
    </QueryClientProvider>
  );
}