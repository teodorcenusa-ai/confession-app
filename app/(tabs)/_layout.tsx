import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { BookOpen, FileText, ScrollText, CheckCircle } from "lucide-react-native";
import React from "react";
import { View, Platform } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { Navigator } = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}> 
      <MaterialTopTabs
        tabBarPosition="bottom"
        initialRouteName="guide"
        screenOptions={{
          headerShown: false, // FOARTE IMPORTANT: Ascunde header-ul tab-urilor pentru a-l folosi pe cel global
          swipeEnabled: true,
          tabBarActiveTintColor: "#8B0000",
          tabBarInactiveTintColor: "#D4A373",
          tabBarIndicatorStyle: { backgroundColor: "#8B0000", height: 3, top: 0 },
          tabBarStyle: {
            backgroundColor: "#FAF8F3",
            borderTopWidth: 1,
            borderTopColor: "#D4A373",
            height: 65,
            elevation: 0,
          },
          tabBarItemStyle: {
            height: 60, // Am ajustat înălțimea pentru a nu fi prea mare
            justifyContent: 'center',
          },
          tabBarLabelStyle: { 
            fontSize: 10, 
            fontFamily: 'Lora-Bold', 
            textTransform: 'none',
            marginBottom: 5, // Ajustat pentru echilibru
          },
          tabBarShowIcon: true,
        }}
      >
        <MaterialTopTabs.Screen 
          name="prayers" 
          options={{ 
            title: "Rugăciuni", 
            tabBarLabel: "Înainte", // Titlu scurt pentru tab
            tabBarIcon: ({color}) => <ScrollText size={18} color={color}/> 
          }} 
        />
        <MaterialTopTabs.Screen 
          name="guide" 
          options={{ 
            title: "Îndreptar", 
            tabBarIcon: ({color}) => <BookOpen size={18} color={color}/> 
          }} 
        />
        <MaterialTopTabs.Screen 
          name="document" 
          options={{ 
            title: "Note", 
            tabBarIcon: ({color}) => <FileText size={18} color={color}/> 
          }} 
        />
        <MaterialTopTabs.Screen 
          name="after-prayers" 
          options={{ 
            title: "După", 
            tabBarIcon: ({color}) => <CheckCircle size={18} color={color}/> 
          }} 
        />
      </MaterialTopTabs>

      {/* Spațiu pentru bara de sistem pe Android */}
      {Platform.OS === 'android' && (
        <View style={{ height: insets.bottom || 20, backgroundColor: '#000000' }} />
      )}
    </View>
  );
}