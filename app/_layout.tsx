import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer'; 
import { ConfessionProvider, useConfession } from '../contexts/ConfessionContext';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Alert, Platform, ActionSheetIOS } from 'react-native';

// COMPONENTA PENTRU CELE TREI PUNCTE
function HeaderMenu() {
  const { increaseFontSize, decreaseFontSize, fontSize } = useConfession();

  const handlePress = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Anulează', `Mărește textul (Acum: ${fontSize})`, 'Micșorează textul'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) increaseFontSize();
          if (buttonIndex === 2) decreaseFontSize();
        }
      );
    } else {
      Alert.alert(
        "Dimensiune Text",
        `Mărime actuală: ${fontSize}`,
        [
          { text: "Micșorează", onPress: decreaseFontSize },
          { text: "Mărește", onPress: increaseFontSize },
          { text: "Gata", style: "cancel" }
        ]
      );
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ padding: 10, marginRight: 5 }}>
      <Ionicons name="ellipsis-vertical" size={24} color="white" />
    </TouchableOpacity>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ConfessionProvider>
        <Drawer
          screenOptions={{
            headerStyle: { 
              backgroundColor: '#8B4513', 
              elevation: 4,
            },
            headerTintColor: '#fff', 
            headerTitleAlign: 'center', 
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
            // Aceasta este linia esențială:
            headerRight: () => <HeaderMenu />,

            drawerStyle: { 
              backgroundColor: '#FAF8F3', 
              width: 280, 
            },
            drawerActiveTintColor: '#8B4513',
            drawerInactiveTintColor: '#5D2E0A',
          }}
        >
          {/* Păstrează toate Drawer.Screen exact cum le aveai tu în codul funcțional */}
          <Drawer.Screen
            name="(tabs)"
            options={{
              drawerLabel: 'Acasă',
              headerTitle: 'Taina Spovedaniei',
              drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
            }}
          />

          <Drawer.Screen
            name="(drawer)/thoughts"
            options={{
              drawerLabel: 'Gânduri despre spovedanie',
              headerTitle: 'Gânduri',
              drawerIcon: ({ color }) => <Ionicons name="book-outline" size={22} color={color} />,
            }}
          />

          <Drawer.Screen
            name="(drawer)/prayer-for-confessor"
            options={{
              drawerLabel: 'Rugăciune pentru duhovnic',
              headerTitle: 'Pentru Duhovnic',
              drawerIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} />,
            }}
          />

          <Drawer.Screen
            name="(drawer)/scripture"
            options={{
              drawerLabel: 'Spovedania în Scriptură',
              headerTitle: 'Sfânta Scriptură',
              drawerIcon: ({ color }) => <Ionicons name="library-outline" size={22} color={color} />,
            }}
          />

          {/* Ecranele ascunse */}
          <Drawer.Screen name="(drawer)/kids-guide" options={{ drawerItemStyle: { display: 'none' } }} />
          <Drawer.Screen name="index" options={{ drawerItemStyle: { display: 'none' } }} />
          <Drawer.Screen name="+not-found" options={{ drawerItemStyle: { display: 'none' } }} />
        </Drawer>
      </ConfessionProvider>
    </GestureHandlerRootView>
  );
}