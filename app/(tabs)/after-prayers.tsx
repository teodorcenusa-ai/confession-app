import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useIsFocused } from '@react-navigation/native'; // Import necesar pentru sincronizare
import { MoreVertical } from 'lucide-react-native'; 
import { POST_CONFESSION_PRAYERS } from '../../constants/prayers';
import { useConfession } from '../../contexts/ConfessionContext';

export default function PrayersScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Verificăm dacă suntem pe acest tab
  
  const { fontSize, increaseFontSize, decreaseFontSize } = useConfession();
  const [showFontSettings, setShowFontSettings] = useState(false);

  // Sincronizarea Header-ului
  useEffect(() => {
    if (isFocused) {
      const headerParent = navigation.getParent() || navigation;
      headerParent.setOptions({
        headerRight: () => (
          <TouchableOpacity 
            onPress={() => setShowFontSettings(prev => !prev)} 
            style={{ paddingVertical: 8, paddingHorizontal: 15 }} 
          >
            <MoreVertical size={25} color="white" />
          </TouchableOpacity>
        ),
      });
    }
    
    // Închidem bara automat când plecăm de pe tab
    if (!isFocused) {
      setShowFontSettings(false);
    }
  }, [isFocused, showFontSettings, navigation]);

  const formatTextWithIndents = (text: string) => {
    if (!text) return '';
    return text.split('\n').map(line => line.trim() === '' ? line : `${line}`).join('\n');
  };

  return (
    <View style={styles.container}>
      {/* BARA GALBENĂ */}
      {showFontSettings && (
        <View style={styles.fontBar}>
          <Text style={styles.fontLabel}>Dimensiune text:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={decreaseFontSize} style={styles.fBtn}>
              <Text style={styles.fBtnT}>A-</Text>
            </TouchableOpacity>
            <Text style={styles.fValue}>{fontSize}</Text>
            <TouchableOpacity onPress={increaseFontSize} style={styles.fBtn}>
              <Text style={styles.fBtnT}>A+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView 
        contentContainerStyle={{ 
          paddingHorizontal: 20, 
          paddingTop: 10,
          paddingBottom: insets.bottom + 40 
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image 
          source={require('../../assets/images/ornament.png')} 
          style={styles.topOrnament} // Stilul standardizat
          resizeMode="contain"
        />

        {/* Titlul folosește fontSize din context */}
        <Text style={[styles.prayerTitle, { fontSize: fontSize + 3 }]}>
          RUGĂCIUNI DUPĂ SPOVEDANIE
        </Text>
        
        {/* Textul principal folosește fontSize din context */}
        <Text style={[styles.prayerText, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
          {formatTextWithIndents(POST_CONFESSION_PRAYERS)}
        </Text>

        <View style={styles.separator} />
        
        <Text style={[styles.prayerText, styles.highlightText, { fontSize: fontSize }]}>
          Slavă lui Dumnezeu pentru toate!
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8F3' },
  // Stiluri pentru bara de font
  fontBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#FFF8E7', 
    padding: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#D4A373' 
  },
  fontLabel: { fontFamily: 'Lora-Bold', color: '#5D2E0A' },
  fBtn: { backgroundColor: '#8B4513', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  fBtnT: { color: 'white', fontWeight: 'bold' },
  fValue: { marginHorizontal: 15, fontWeight: 'bold', color: '#5D2E0A' },
  
  // STILURI STANDARD PENTRU FRONTISPICIU (IDENTICE CU BEFORE)
  topOrnament: {
    width: '90%',
    height: 120, // Uniformizat
    alignSelf: 'center',
    marginBottom: 15,
  },
  prayerTitle: {
    fontFamily: 'Playfair-Bold',
    fontWeight: '800',
    color: '#5D2E0A',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  prayerText: {
    color: '#2C2415',
    textAlign: 'justify',
    fontFamily: 'Lora',
  },
  separator: {
    height: 1,
    backgroundColor: '#D4A373',
    marginVertical: 30,
    width: '40%',
    alignSelf: 'center',
    opacity: 0.5,
  },
  highlightText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#8B0000',
    fontStyle: 'italic',
    marginTop: 10,
  },
});