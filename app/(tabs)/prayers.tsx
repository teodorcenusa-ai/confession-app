import React from 'react';
import { ScrollView, StyleSheet, Text, View, Platform, Image } from 'react-native'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PRE_CONFESSION_PRAYERS } from '../../constants/prayers';

export default function PrayersScreen() {
  const insets = useSafeAreaInsets();

  const formatTextWithIndents = (text: string) => {
    if (!text) return '';
    return text
      .split('\n')
      .map(line => line.trim() === '' ? line : `${line}`)
      .join('\n');
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent, 
          { 
            paddingTop: 10, 
            paddingBottom: insets.bottom + 40 
          }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Image 
          source={require('../../assets/images/ornament.png')} 
          style={styles.topOrnament} 
          resizeMode="contain"
        />

        <Text style={styles.prayerTitle}>RUGĂCIUNI ÎNAINTE DE SPOVEDANIE</Text>
        
        {/* TEXTUL RUGĂCIUNII PROPRIU-ZISE */}
        <Text style={styles.prayerText}>
          {formatTextWithIndents(PRE_CONFESSION_PRAYERS)}
        </Text>

        {/* LINIA DE SEPARARE */}
        <View style={styles.explanationSeparator} />
        
        {/* EXPLICAȚIA CU ITALIC */}
        <Text style={styles.explanationText}>
        

După ce ne-am cercetat cugetul și ne-am însemnat toate păcatele, mergem la duhovnic cu umilință și cu evlavie adâncă, ca și cum ne-am duce în fața judecății lui Dumnezeu, știind că Scaunul Sfânt al Spovedaniei este Scaunul Judecății pline de milă a lui Dumnezeu, aici, pe pământ. 
	
Apoi îngenunchem cu smerenie și ne rugăm în inimă, zicând:

„Doamne, pune în mintea și în gura părintelui meu duhovnicesc cuvântul care îmi este de folos”. 

Zi apoi cu glas:

„Binecuvântează, părinte, ca să-mi pot mărturisi deplin toate păcatele!”. 

Apoi începe să mărturisești fiecare păcat, ascultând cu atenție sfătuirea părintelui duhovnic.`



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
    width: '90%',
    height: 120,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 15,
  },
  prayerTitle: {
    fontSize: 21,
    fontFamily: 'Playfair-Bold',
    fontWeight: '800',
    color: '#5D2E0A',
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
  // STIL NOU PENTRU EXPLICAȚIE
  explanationText: {
    fontSize: 16,
    fontFamily: 'Lora',
    fontStyle: 'italic', // Forțează textul să fie înclinat
    color: '#5D4037',     // Un maro mai subtil
    textAlign: 'center',
    lineHeight: 25,
    paddingHorizontal: 12,
  },
  // LINIE SUBȚIRE PENTRU EXPLICAȚIE
  explanationSeparator: {
    height: 1,
    backgroundColor: '#D4A373',
    width: '40%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 15,
    opacity: 0.4,
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