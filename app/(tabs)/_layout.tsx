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
      {/* ^ Am pus fundalul principal negru ca să "umple" orice spațiu de jos */}
      
      <MaterialTopTabs
        tabBarPosition="bottom"
        initialRouteName="guide"
        screenOptions={{
          swipeEnabled: true,
          tabBarActiveTintColor: "#8B0000",
          tabBarInactiveTintColor: "#D4A373",
          tabBarIndicatorStyle: { backgroundColor: "#8B0000", height: 3, top: 0 },
          tabBarStyle: {
            backgroundColor: "#FAF8F3",
            borderTopWidth: 1,
            borderTopColor: "#D4A373",
            // Înălțime fixă pentru meniu
            height: 65,
            elevation: 0,
          },
tabBarItemStyle: {
  height: 100,           // Limitezi înălțimea zonei de atingere
  justifyContent: 'center', // Centrează conținutul pe verticală
  paddingTop: 2,        // Te joci cu asta pentru a le urca
},
          tabBarLabelStyle: { 
            fontSize: 10, 
            fontFamily: 'Lora-Bold', 
            textTransform: 'none',
	// RIDICAREA TEXTULUI:
  	marginBottom: 15,  // Valoare pozitivă ridică textul (îl depărtează de bază)
  	// sau
  	paddingBottom: 15, 
          },
          tabBarShowIcon: true,
        }}
      >
        <MaterialTopTabs.Screen name="prayers" options={{ title: "Rugăciuni înainte", tabBarIcon: ({color}) => <ScrollText size={18} color={color}/> }} />
        <MaterialTopTabs.Screen name="guide" options={{ title: "Îndreptar", tabBarIcon: ({color}) => <BookOpen size={18} color={color}/> }} />
        <MaterialTopTabs.Screen name="document" options={{ title: "Note", tabBarIcon: ({color}) => <FileText size={18} color={color}/> }} />
        <MaterialTopTabs.Screen name="after-prayers" options={{ title: "Rugăciuni după", tabBarIcon: ({color}) => <CheckCircle size={18} color={color}/> }} />
      </MaterialTopTabs>

      {/* AICI ESTE TRUCUL: Un View negru care ocupă spațiul de sub meniu */}
      {Platform.OS === 'android' && (
        <View style={{ height: insets.bottom, height: 45, backgroundColor: '#000000' }} />
      )}
    </View>
  );
}