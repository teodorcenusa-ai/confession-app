import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConfession } from '../../contexts/ConfessionContext';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { MoreVertical } from 'lucide-react-native';

export default function ThoughtsScreen() {
  const insets = useSafeAreaInsets();
  const { fontSize, increaseFontSize, decreaseFontSize } = useConfession();
  
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [showFontSettings, setShowFontSettings] = useState(false);

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
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={[styles.mainTitle, { fontSize: fontSize + 6 }]}>Gânduri despre Spovedanie</Text>

          <Text style={[styles.paragraph, { fontSize, lineHeight: fontSize * 1.5 }]}>
            Spovedania este una din Sfintele Taine ale Bisericii, prin care omul, mărturisindu-și păcatele cu părere de rău, primește de la Dumnezeu iertarea pentru cele săvârșite. Prin spovedanie, omul redescoperă iubirea și bunătatea lui Dumnezeu, sensul vieții sale pământești și rostul său veșnic.
          </Text>

          <Text style={[styles.paragraph, { fontSize, lineHeight: fontSize * 1.5 }]}>
            Întrucât păcatul înseamnă separare de Dumnezeu – Care este izvorul vieții, înțelegem că starea de păcat este o stare de despărțire, de înstrăinare de Dumnezeu, o stare de moarte. Mărturisirea cu căință îl renaște pe om spre o nouă viață, îi oferă șansa de a se reface sufletește și de a redeveni fiu al Împărăției lui Dumnezeu după har.
          </Text>

          <View style={styles.divider} />
          <Text style={[styles.sectionTitle, { fontSize: fontSize + 4 }]}>Cum ne spovedim?</Text>
          
          <View style={styles.quoteBox}>
            <Text style={styles.reference}>Sfântul Siluan Athonitul</Text>
            <Text style={[styles.quoteText, { fontSize, lineHeight: fontSize * 1.4 }]}>
              „Dacă omul nu se căiește sincer și dacă nu se va întrista că L-a întristat pe Dumnezeu, va muri în patimi fără să fi cunoscut pe Dumnezeu”.
            </Text>
          </View>

          <Text style={[styles.paragraph, { fontSize, lineHeight: fontSize * 1.5 }]}>
            E bine să ne spovedim ca și cum ar fi ultimul ceas din viața noastră, când putem aduce pocăință pentru toată viața, înainte de a sta în fața judecății lui Dumnezeu. Să ne mărturisim cu convingerea că, dacă mai trăim, nu mai vrem să repetăm păcatele și cu încrederea că Dumnezeu poate și vrea să ne ierte deplin.
          </Text>

          <View style={styles.divider} />
          <Text style={[styles.sectionTitle, { fontSize: fontSize + 4 }]}>Spovedania - pregătirea pentru Ospățul Stăpânului</Text>
          
          <Text style={[styles.paragraph, { fontSize, lineHeight: fontSize * 1.5 }]}>
            Finalitatea firească a spovedaniei este împărtășirea cu Sfintele Taine. Scopul săvârșirii Sfintei Liturghii este împărtășirea credincioșilor, dar nu ne putem împărtăși dacă nu ne spovedim în prealabil și nu primim de la duhovnic, în urma spovedaniei, acordul de a ne împărtăși.
          </Text>

          <View style={styles.divider} />
          <Text style={[styles.sectionTitle, { fontSize: fontSize + 4 }]}>Să ne spovedim cât mai des!</Text>
          
          <Text style={[styles.paragraph, { fontSize, lineHeight: fontSize * 1.5 }]}>
            Sfântul Simeon al Tesalonicului ne îndeamnă să nu întârziem mai mult de 40 de zile pentru că nimic altceva ca lipsa de mărturisire nu dă atâta putere demonilor și gândurilor potrivnice. 
          </Text>

          <View style={styles.divider} />
          <Text style={[styles.sectionTitle, { fontSize: fontSize + 4 }]}>De ce mulți creștini evită spovedania?</Text>

          <Text style={[styles.paragraph, { fontSize, lineHeight: fontSize * 1.5 }]}>
            Cine nu crede în Dumnezeu nu ia în calcul spovedania, dar și între cei care cred sunt persoane care nu se raportează corect la spovedanie. Concepția, des întâlnită, că nu avem păcate mari pentru a cere iertare este foarte păguboasă.
          </Text>

          <View style={styles.quoteBox}>
            <Text style={styles.reference}>I Ioan 1, 8-9</Text>
            <Text style={[styles.quoteText, { fontSize, lineHeight: fontSize * 1.4 }]}>
              „Dacă zicem că păcat nu avem, ne amăgim pe noi înșine și adevărul nu este întru noi. Dacă mărturisim păcatele noastre, El este credincios și drept ca să ne ierte păcatele.”
            </Text>
          </View>

          <View style={styles.divider} />
          <Text style={[styles.sectionTitle, { fontSize: fontSize + 4 }]}>Îndrumări practice înainte de spovedanie</Text>

          <Text style={[styles.paragraph, { fontSize }]}>
            <Text style={styles.bold}>1. Roagă-te înainte</Text>{"\n"} 
            Cere lui Dumnezeu să-ți lumineze mintea și să-ți arate păcatele.
          </Text>

          <Text style={[styles.paragraph, { fontSize }]}>
            <Text style={styles.bold}>2. Cercetează-ți conștiința</Text>{"\n"}
            Gândește-te sincer la faptele, vorbele și gândurile tale. Poți folosi un îndreptar de spovedanie.
          </Text>

          <Text style={[styles.paragraph, { fontSize }]}>
            <Text style={styles.bold}>3. Fii sincer și complet</Text>{"\n"}
            Spune păcatele clar, fără să le ascunzi sau să le îndulcești, dar fără detalii inutile.
          </Text>

          <Text style={[styles.paragraph, { fontSize }]}>
            <Text style={styles.bold}>4. Nu te îndreptăți</Text>{"\n"}
            Evită explicațiile care mută vina pe alții. Spovedania este asumare.
          </Text>

          <Text style={[styles.paragraph, { fontSize }]}>
            <Text style={styles.bold}>5. Ascultă cuvântul duhovnicului</Text>{"\n"}
            Primește sfatul și canonul cu smerenie și dorință de îndreptare.
          </Text>

          <Text style={[styles.paragraph, { fontSize }]}>
            <Text style={styles.bold}>6. Păstrează hotărârea de îndreptare</Text>{"\n"}
            După spovedanie, începe din nou cu nădejde și cu luptă statornică.
          </Text>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: '#000000' },
  container: { flex: 1, backgroundColor: '#FAF8F3' },
  content: { padding: 20 },
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
  mainTitle: { 
    fontFamily: 'Playfair-Bold', 
    fontWeight: 'bold', 
    color: '#5D2E0A', 
    marginBottom: 25, 
    marginTop: 20, 
    textAlign: 'center', 
    textTransform: 'uppercase' 
  },
  sectionTitle: { 
    fontFamily: 'Lora-Bold', 
    fontWeight: '700', 
    color: '#5D2E0A', 
    marginBottom: 15, 
    marginTop: 10, 
    borderLeftWidth: 4, 
    borderLeftColor: '#D4A373', 
    paddingLeft: 12 
  },
  paragraph: { 
    fontFamily: 'Lora', 
    color: '#2C2415', 
    marginBottom: 15, 
    textAlign: 'justify' 
  },
  bold: { fontFamily: 'Lora-Bold', color: '#8B4513' }, 
  quoteBox: { 
    backgroundColor: '#FFF8E7', 
    padding: 18, 
    borderRadius: 12, 
    marginBottom: 20, 
    borderLeftWidth: 1, 
    borderLeftColor: '#D4A373' 
  },
  quoteText: { fontStyle: 'italic', color: '#5D2E0A', fontFamily: 'Lora' },
  reference: { 
    fontFamily: 'Lora-Bold', 
    fontSize: 12, 
    color: '#8B4513', 
    marginBottom: 8, 
    textTransform: 'uppercase' 
  },
  divider: { 
    height: 1, 
    backgroundColor: '#D4A373', 
    marginVertical: 25, 
    opacity: 0.3, 
    width: '80%', 
    alignSelf: 'center' 
  },
});