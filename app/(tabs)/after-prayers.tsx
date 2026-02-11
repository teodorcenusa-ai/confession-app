import React from 'react';
import { ScrollView, StyleSheet, Text, View, Platform, Image } from 'react-native'; // Am adăugat Image
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { POST_CONFESSION_PRAYERS } from '../../constants/prayers';

export default function PrayersScreen() {
  const insets = useSafeAreaInsets();

  // Funcție care adaugă aliniat (8 spații) la începutul fiecărui paragraf
  const formatTextWithIndents = (text: string) => {
    if (!text) return '';
    return text
      .split('\n')
      .map(line => line.trim() === '' ? line :`${line}`)
      .join('\n');
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent, 
          { 
            paddingTop: 10, // Redus de la insets.top pentru că header-ul are deja padding
            paddingBottom: insets.bottom + 40 
          }
        ]}
        showsVerticalScrollIndicator={false}
      >
{/* ADAUGĂ IMAGINEA AICI */}
        <Image 
          source={require('../../assets/images/ornament.png')} 
          style={styles.topOrnament} 
          resizeMode="contain"
        />

        <Text style={styles.prayerTitle}>RUGĂCIUNI DUPĂ SPOVEDANIE</Text>
        
        <Text style={styles.prayerText}>
          {formatTextWithIndents(POST_CONFESSION_PRAYERS)}
        </Text>

        <View style={styles.separator} />
        
        <Text style={[styles.prayerText, styles.highlightText]}>
          Slavă lui Dumnezeu pentru toate!
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAF8F3' 
  },
  scrollContent: { 
    paddingHorizontal: 20 
  },
  topOrnament: {
    width: '90%',       // Ocupă 80% din lățimea ecranului
    height: 120,        // Înălțimea imaginii
    alignSelf: 'center', // O centrează
    marginTop: 0,
    marginBottom: 15,   // Spațiu până la titlu
  },
  prayerTitle: {
    fontSize: 21,
    fontFamily: 'Playfair-Bold',
    fontWeight: '800',
    color: '#5D2E0A', // Sau '#8B0000' dacă vrei să încerci roșu
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  prayerText: {
    fontSize: 18,
    lineHeight: 28,
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