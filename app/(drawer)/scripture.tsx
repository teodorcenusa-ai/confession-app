import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConfession } from '../../contexts/ConfessionContext';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { MoreVertical } from 'lucide-react-native';

export default function ScriptureScreen() {
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
          <div style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={decreaseFontSize} style={styles.fBtn}>
              <Text style={styles.fBtnT}>A-</Text>
            </TouchableOpacity>
            <Text style={styles.fValue}>{fontSize}</Text>
            <TouchableOpacity onPress={increaseFontSize} style={styles.fBtn}>
              <Text style={styles.fBtnT}>A+</Text>
            </TouchableOpacity>
          </div>
        </View>
      )}

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={[styles.mainTitle, { fontSize: fontSize + 8 }]}>Spovedania în Sfânta Scriptură</Text>

          {/* --- VECHIUL TESTAMENT --- */}
          <Text style={[styles.sectionTitle, { fontSize: fontSize + 4 }]}>Pilde de pocăinţă în Vechiul Testament</Text>
          
          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            Şirul acestor pilde de pocăinţă începe cu <Text style={styles.bold}>Adam</Text>, despre care Cartea înţelepciunii lui Solomon zice: „Înţelepciunea a păzit pe primul om... şi l-a scos din păcatul lui şi i-a dat putere să stăpânească toată făptura“ (10, 1-2).
          </Text>

          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            Lui îi urmează <Text style={styles.bold}>Enoh</Text>, care a bineplăcut lui Dumnezeu prin pilda sa de pocăinţă înaintea neamurilor, de aceea l-a mutat l-a cer (Sirah 44, 10; 49, 16). 
          </Text>
          
          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            Îndelung răbdătorul <Text style={styles.bold}>Iov</Text>, după ce a respins ispitele prietenilor care se îndoiau de dreptatea sa, s-a smerit din toată inima înaintea Domnului, Care lucrează taine în viaţa sa, şi zice: 
          </Text>

          <View style={styles.quoteBox}>
            <Text style={styles.reference}>Iov 42, 6</Text>
            <Text style={[styles.quoteText, { fontSize: fontSize, lineHeight: fontSize * 1.4 }]}>„Pentru aceasta mă urgisesc pe mine însumi şi mă pocăiesc în praf şi cenuşă“.</Text>
          </View>

          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            O pildă clasică de pocăinţă este <Text style={styles.bold}>profetul David</Text>, care mărturiseşte înţeleptului Natan dublul păcat făcut înaintea lui Dumnezeu: al uciderii lui Urie şi al adulterului cu Batşeba, soţia acestuia (II Regi 12, 12). Psalmul 50, alcătuit acum de David în haină de penitent este o zguduitoare rugăciune de pocăinţă, fapt pentru care în biserica creştină a fost consacrat acestui scop. 
          </Text>
          
          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            Penitentul imploră marea milă a lui Dumnezeu pentru a-i şterge fărădelegea, să-l cureţe de păcatul pe care-l recunoaşte, dar care este pururea înaintea lui. Doreşte ca Dumnezeu să-şi întoarcă faţa de la nelegiuirile sale şi să-i zidească o inimă curată în duh drept. Conştiinţa păcătoşeniei sale e mare, dar şi căinţa sa e profundă. El nu-şi pierde nădejdea de scăpare, ci se roagă lui Dumnezeu cu încredere:
          </Text>

          <View style={styles.quoteBox}>
            <Text style={styles.reference}>Psalm 50, 12, 18</Text>
            <Text style={[styles.quoteText, { fontSize: fontSize, lineHeight: fontSize * 1.4 }]}>„Nu mă lepăda pe mine de la faţa Ta şi Duhul Tău cel Sfânt nu-l lua de la mine... Duhul umilit, inima înfrântă şi smerită, Dumnezeu nu o va urgisi“.</Text>
          </View>

          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            <Text style={styles.bold}>Împăratul Solomon</Text> a zidit lăcaşul de rugăciune şi de pocăinţă pentru popor, de mărturisire şi jertfă pentru păcate, de iertare şi mântuire (I Regi 8, 10-61). Rugându-se la sfinţirea lui a rostit, între altele:  
          </Text>

          <View style={styles.quoteBox}>
            <Text style={styles.reference}>I Regi 8, 33-34 </Text>
            <Text style={[styles.quoteText, { fontSize: fontSize, lineHeight: fontSize * 1.4 }]}> „Când poporul tău va fi bătut de duşman, pentru că a păcătuit înaintea Ta şi ei se vor întoarce spre tine şi se vor mărturisi numelui tău şi-ţi vor aduce rugi şi cereri în această biserică… să ierţi păcatele poporului“ </Text>
          </View>

          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            Dar cel mai zguduitor model de pocăinţă, alături de cel al lui David, este fără îndoială, cel al regelui iudeu <Text style={styles.bold}>Manase</Text>, aflat în robia babilonică. El este autorul mişcătoarei rugăciuni de pocăinţă care-i poartă numele şi care, împreună cu psalmul 50, a intrat în cultul Bisericii noastre. Efectele sale minunate şi tămăduitoare asupra oricărui suflet încercat şi dosădit se explică numai prin faptul că este o rugăciune de inspiraţie divină.
          </Text>

          <View style={styles.quoteBox}>
            <Text style={styles.reference}> Rugăciunea regelui Manase </Text>
            <Text style={[styles.quoteText, { fontSize: fontSize, lineHeight: fontSize * 1.4 }]}> „...Dar acum îmi plec genunchii ini­mii, rugând bunătatea Ta și zicând: Am pă­cătuit, Doamne, am păcătuit și fărăde­legile mele eu le cunosc; însă tot eu cer, rugându-Te: iartă-mă, Doamne, iartă-mă și nu mă pierde din pricina fără­delegilor mele, și nici nu mă osândi la întuneric sub pă­mânt, căci Tu ești, Dumnezeule, Dumne­zeul celor ce se pocăiesc.” </Text>
          </View>

          {/* --- SFANTUL IOAN BOTEZATORUL --- */}
          <View style={styles.divider} />
          <Text style={[styles.sectionTitle, { fontSize: fontSize + 4 }]}>Glasul Sfântului Ioan Botezătorul</Text>
          
          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            În predica Sfântului Ioan Botezătorul aflăm primul apel la pocăinţă din Noul Testament şi întâlnim un act de mărturisire generală a păcatelor şi porunca limpede de a pune viaţa în armonie cu voia lui Dumnezeu. Totul are un caracter pregătitor în vederea marii taine pe care Mântuitorul Hristos o va descoperi şi o va rândui în biserica Sa. Înaintemergătorul Domnului propovăduia: 
          </Text>

          <View style={styles.quoteBox}>
            <Text style={styles.reference}> Matei 3, 2 </Text>
            <Text style={[styles.quoteText, { fontSize: fontSize, lineHeight: fontSize * 1.4 }]}> „Pocăiţi-vă, că s-a apropiat împărăţia cerurilor!“ </Text>
          </View>

          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            Strigătul, chemarea lui aveau o misiune pregătitoare. Era glasul pustiei ce dorea să se facă livadă roditoare. Era un gest de oprire plin de înţeles, pe care proorocul Ioan l-a ridicat în calea omenirii căzute în rătăcire, ca să-i îndrepteze paşii spre calea Domnului. 
          </Text>

          {/* --- SFANTA TAINA --- */}
          <View style={styles.divider} />
          <Text style={[styles.sectionTitle, { fontSize: fontSize + 4 }]}>Instituirea Tainei Spovedaniei</Text>
          
          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            Îndată după slăvita Lui Înviere, Domnul şi Mântuitorul nostru Iisus Hristos a instituit Taina Sfintei Mărturisiri, când, arătându-se Apostolilor, a suflat asupra lor, zicând:
          </Text>

          <View style={styles.quoteBox}>
            <Text style={styles.reference}>Ioan 20, 22-23</Text>
            <Text style={[styles.quoteText, { fontSize: fontSize, lineHeight: fontSize * 1.4 }]}>„Luaţi Duh Sfânt. Cărora veţi ierta păcatele se vor ierta, cărora le veţi ţinute, ţinute vor fi“.</Text>
          </View>

          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            Iisus este doctorul sufletelor și al trupurilor. El a venit în lume să caute pe cei pierduţi şi pe cei bolnavi, ca să-i tămăduiască prin leacul pocăinţei: 
          </Text>

          <View style={styles.quoteBox}>
            <Text style={styles.reference}>Marcu 2, 17</Text>
            <Text style={[styles.quoteText, { fontSize: fontSize, lineHeight: fontSize * 1.4 }]}>„Nu am venit să chem pe cei drepţi, ci pe cei păcătoşi la pocăinţă“</Text>
          </View>


          {/* --- PARABOLE --- */}
          <View style={styles.divider} />
          <Text style={[styles.sectionTitle, { fontSize: fontSize + 4 }]}>Parabole şi exemple de pocăinţă</Text>
          
          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            Mântuitorul ne arată valoarea pocăinţei prin pildele cu <Text style={styles.bold}>oaia cea pierdută</Text> şi <Text style={styles.bold}>drahma cea pierdută</Text>, amintindu-ne că:
          </Text>

          <View style={styles.quoteBox}>
            <Text style={styles.reference}>Luca 15, 10</Text>
            <Text style={[styles.quoteText, { fontSize: fontSize, lineHeight: fontSize * 1.4 }]}>„Aşa se face bucurie îngerilor lui Dumnezeu pentru un păcătos care se pocăieşte“.</Text>
          </View>

          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            La întrebarea „Cum să facem pocăinţă?“ ne răspund câteva exemple clare date de Hristos în Noul Testament. El Însuşi a cercetat Biserica la 12 ani, de Paşti şi la sărbători, a trăit în post şi în rugăciune, ne-a învăţat cum să ne rugăm, a ridicat ochii spre Cer, a îngenuncheat şi, căzut cu faţa la pământ, a cântat laude duhovniceşti împreună cu Apostolii. Tot Mântuitorul ne-a îndemnat, atunci când aducem darul la altar, să ne împăcăm mai întâi cu pârâşul nostru, apoi să venim cu darul la altar, să iertăm greşiţilor, să ne rugăm Tatălui să ne ierte greşelile. 
          </Text>
          
          <Text style={[styles.paragraph, { fontSize: fontSize, lineHeight: fontSize * 1.5 }]}>
            Modelele practice de pocăinţă din Noul Testament sunt: <Text style={styles.bold}>vameşul</Text>, <Text style={styles.bold}>femeia păcătoasă</Text> care a spălat picioarele Domnului cu lacrimi, <Text style={styles.bold}>tâlharul de pe cruce</Text>, <Text style={styles.bold}>Zaheu</Text> şi, cel mai clasic, <Text style={styles.bold}>Fiul Risipitor</Text>.
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
  fontLabel: { fontFamily: 'Lora-Bold', color: '#5D2E0A', fontWeight: 'bold' },
  fBtn: { backgroundColor: '#8B4513', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  fBtnT: { color: 'white', fontWeight: 'bold' },
  fValue: { marginHorizontal: 15, fontWeight: 'bold', color: '#5D2E0A' },
  mainTitle: { 
    fontFamily: 'Playfair-Bold', 
    fontWeight: 'bold', 
    color: '#5D2E0A', 
    marginBottom: 25, 
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 10
  },
  sectionTitle: { 
    fontFamily: 'Lora-Bold', 
    fontWeight: '700', 
    color: '#5D2E0A', 
    marginBottom: 15, 
    marginTop: 10, 
    borderLeftWidth: 4, 
    borderLeftColor: '#D4A373', 
    paddingLeft: 10 
  },
  paragraph: { 
    fontFamily: 'Lora', 
    color: '#2C2415', 
    marginBottom: 15, 
    textAlign: 'justify' 
  },
  bold: { fontFamily: 'Lora-Bold', fontWeight: 'bold', color: '#8B4513' },
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
    marginBottom: 5, 
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