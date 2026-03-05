import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConfession } from '../../contexts/ConfessionContext';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { MoreVertical } from 'lucide-react-native';

export default function PrayerForConfessorScreen() {
  const insets = useSafeAreaInsets();
  const { fontSize, increaseFontSize, decreaseFontSize } = useConfession();
  
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [showFontSettings, setShowFontSettings] = useState(false);

  // LOGICA PENTRU BUTONUL DIN HEADER (Bara Neagră)
  useEffect(() => {
    if (isFocused) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity 
            onPress={() => setShowFontSettings(prev => !prev)} 
            style={{ paddingRight: 15, paddingVertical: 5 }}
          >
            <MoreVertical size={25} color="white" />
          </TouchableOpacity>
        ),
      });
    }
  }, [isFocused, showFontSettings]);

  return (
    <View style={[styles.mainWrapper, { paddingBottom: insets.bottom }]}>
      
      {/* BARA GALBENĂ DE SETĂRI FONT */}
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
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={[styles.title, { fontSize: fontSize + 6 }]}>
            Rugăciune pentru Duhovnic
          </Text>
          
          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            O, Doamne Iisuse Hristoase, Dumnezeul nostru, Cel ce ai rânduit pe slujitorii Tăi să fie părinți duhovnicești și medici ai sufletelor noastre, Te rugăm, trimite harul Tău cel Preasfânt peste părintele nostru duhovnic (Numele).
          </Text>
          
          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            Întărește-l cu putere de Sus, ca să ne povățuiască pe calea mântuirii, să ne lumineze cu învățătura Sa cea sfântă și să ne dezlege de păcate, prin puterea ce I-ai dat-o. Dă-i înțelepciune, răbdare și dragoste, ca să poarte cu cinste jugul slujirii Tale.
          </Text>
          
          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            Păzește-l de toată ispita, de boală și de vrăjmașii văzuți și nevăzuți. Fă-l vrednic să-ți slujească Ție cu inimă curată și să ne conducă pe noi, turma Sa, spre Împărăția Ta. Căci a Ta este puterea și slava, în vecii vecilor. Amin.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#FBF8EF',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  // STILURI BARA GALBENA
  fontBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#FFF8E7', 
    padding: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#D4A373' 
  },
  fontLabel: { fontFamily: 'Lora-Bold', color: '#5D2E0A', fontWeight: 'bold' },
  fBtn: { backgroundColor: '#8B4513', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  fBtnT: { color: 'white', fontWeight: 'bold' },
  fValue: { marginHorizontal: 15, fontWeight: 'bold', color: '#5D2E0A' },

  card: {
    backgroundColor: '#EBE0CC', 
    borderRadius: 15,
    padding: 25,
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    maxWidth: 600,
    width: '100%',
  },
  title: {
    fontFamily: 'Playfair-Bold',
    fontWeight: 'bold',
    color: '#5D2E0A',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  paragraph: {
    fontFamily: 'Lora',
    color: '#3A2E2A',
    marginBottom: 15,
    textAlign: 'justify',
  },
});