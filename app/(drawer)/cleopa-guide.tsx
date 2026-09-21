import React, { useState, useMemo, useEffect } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { Plus, Check, Search, X, MoreVertical, Menu } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, usePathname } from "expo-router";
import { useConfession } from "../../contexts/ConfessionContext";

// Lista de păcate după Părintele Cleopa
const CLEOPA_ITEMS = [
  "Am păcătuit fără să gândesc că supăr pe Dumnezeu.",
  "Am amânat pocăinţa, spovedania, îndreptarea.",
  "Am gândit, am zis, am voit (hotărât sau nu) să mă sinucid.",
  "Am deznădăjduit, m-am descurajat.",
  "Am contrazis adevărul de credinţă zicând: „Cutare lucru nu-i păcat”.",
  "L-am întristat şi l-am alungat pe Duhul Sfânt cu păcate mari.",
  "Sunt mândru. Am hulit faptele bune ale vecinului. (Doar cei mândri râd de creştini).",
  "Am socotit Sfintele Scripturi mincinoase.",
  "Am scris că nu există Dumnezeu.",
  "Am gândit şi vorbit cuvinte de hulă împotriva lui Dumnezeu, a Maicii Domnului şi a sfinţilor.",
  "Am crezut şi susţinut calendarul vechi.",
  "Am zis că timpul merge tot pe calendarul vechi.",
  "Am botezat sau cununat a doua oară (pe calendarul vechi sau la sectari).",
  "N-am dat învăţătură despre păcat celor neştiutori.",
  "Am crezut, am făcut, am mers la spiritism.",
  "Am avut, am crezut şi am povestit vedeniile mele altora. (Pentru aceasta se dă oprire un an.)",
  "M-am lepădat de ortodoxie şi am dezertat la sectari, catolici sau stilişti.",
  "Am zis că adventiştii fac bine serbând Sâmbăta.",
  "Am urât învăţătura despre Dumnezeu, Rai, Iad, Maica Domnului.",
  "Am omorât oameni, cu voie sau fără voie. (Pentru aceasta se dă Canon 25 de ani).",
  "Am defăimat infirmii şi bătrânii. Am îngânat, poreclit, râs de ei.",
  "Am oprit plata lucrătorilor. Nu am plătit cu cât ne-am tocmit.",
  "Am amărât, am certat, am lovit, am judecat, am vorbit de rău preotul şi episcopul.",
  "N-am mulţumit lui Dumnezeu şi aproapelui pentru binefaceri.",
  "Am amărât peste măsură, am certat, am defăimat, am lovit, am îmbrâncit, am ponegrit, am curvit, am înjurat, am blestemat, n-am ascultat de părinţi şi naşi.",
  "Am avut gânduri spurcate la Icoane.",
  "Am îndoială în existenţa lui Dumnezeu, Rai, Iad.",
  "N-am iubit pe Dumnezeu mai presus de orice.",
  "M-am numit creştin şi am dus viaţă de păgân.",
  "Am mers la adunări sectante, la Oastea Domnului, cu instrumente.",
  "Am intrat în Sinagoga Evreiască, în moschee, în Biserică Catolică. Am plătit slujbe la ei.",
  "Am mers la adunări sectare, la casa lor, m-am rugat cu ei, i-am primit, am luat daruri de la ei, am intrat în casă la stilişti şi necununaţi şi i-am primit în casa mea. (Acestea sunt mari păcate.)",
  "M-am căsătorit cu schismatici, stilişti, catolici, evrei, atei, turci.",
  "Am în casă şi am dat la alţii cărţi rele, sectare sau pornografice.",
  "Am dormit în mănăstiri de călugări sau de maici şi în chiliile lor. Am mâncat carne în mănăstirile unde nu se mănâncă.",
  "Am zis că toate religiile sunt de la Dumnezeu, că toţi tot la Dumnezeu se roagă.",
  "Am profanat semnul Sfintei Cruci. (Am călcat cu picioarele, am cusut în aştenut, am dat anaforă pe jos.)",
  "Am vorbit, am ascultat glume cu cuvinte sfinte („la pastile cailor”, „tatăl nostru-n podul vostru”, „a treia zi după Scripturi” etc.).",
  "Am defăimat numele sfinţilor (Măi Gheo, Măi Io, Văsâi).",
  "M-am ruşinat a mă ruga în societate sau la masă. Am trecut pe lângă Biserică fără să mă închin.",
  "Am călcat şi nu m-am luptat de-ajuns să păzesc Poruncile.",
  "M-am înfierbântat a face păcate (cu mânie, cu desfrânare, cu răzbunare).",
  "Am râs de cel credincios ortodox.",
  "Am pus perdele, zorzoane, flori de mireasă, panglici Sfintelor Icoane.",
  "Am spus „Mamă” în loc de „Maică” „Maicii Domnului”. (Aceasta este o batjocură sectară.)",
  "Am fumat şi servit pe alţii cu foc, ţigări, mascat. (Pentru aceasta se dă Canon doi ani.)",
  "Am mers la ghicitori, descântători, vrăjitori, fermecători, la preot ce deschide cartea sau spune viitorul. Am ghicit, am descântat. Am ghicit în cafea, în bobi, în cărţi, în palmă, în descântece de deochi sau în de nouă ori Tatăl nostru.",
  "Am stat pe soleia Sfântului Altar (partea ridicată pe lângă Iconostas).",
  "Am folosit stupefiante, marihuana, cafea, ţuică. (Cine se împărtăşeşte nu are voie să folosească deloc acestea.)",
  "Am crezut în vise. Spun altora visele mele.",
  "M-am împărtăşit la un preot, fiind legat de altul.",
  "Am zis rugăciuni la descântec. Am jurat strâmb sau drept.",
  "Am pârât pe alţii din ură şi din răutate.",
  "Am presupus, am judecat rău şi am asuprit pe alţii.",
  "M-am certat, m-am bătut, m-am judecat cu fraţii şi surorile mele după trup.",
  "Am blestemat, am dat diavolului pe alţii (lucruri şi vite).",
  "Am zis diavolului, am afurisit pe alţii, am silit pe altul să jure.",
  "M-am legat pe mine şi pe altul cu jurământ. Am tăgăduit furtul.",
  "Am tras pe alţii la judecată.",
  "Am zis „Zău” lui Dumnezeu.",
  "Am luat Sfânta împărtăşanie cu nevrednicie şi am scuipat în acea zi.",
  "M-am jurat („Să mor”, „Să n-am parte”, „Să chiorăsc” etc.).",
  "Am înjurat de lucruri sfinte (,,’tuţi papucii tăi”, ,,’tuţi norocul tău” etc.). Am repetat înjurătura.",
  "Am chemat numele sfinte la toate nimicurile.",
  "Am sărutat Sfintele Icoane când nu trebuia.",
  "Am scos părticele contra vrăjmaşilor.",
  "Am cerut în rugăciune ce e vătămător (de exemplu: loz în plic, curvie, furt etc.).",
  "Mi-am dorit moartea de necaz („Mai bine muream!”, „De ce nu mor…”).",
  "Am făgăduit şi n-am împlinit. (Făgăduinţa făcută lui Dumnezeu şi Bisericii împlineşte-o iute.)",
  "Am furat în vremea zilelor sfinte. Am cumpărat, am vândut, am lucrat, am dormit, am petrecut.",
  "Am stat în frunte în Biserică şi în faţa tuturor.",
  "Am intrat în Naosul Bisericii, de la jumătate la Altar sau în dreapta, unde stau bărbaţii.",
  "N-am venit regulat la Biserică (cel puţin trei Duminici la rând şi în Sărbători).",
  "N-am dus la Biserică daruri (de exemplu: prescuri, vin, ulei, tămâie, lumânări etc.).",
  "Am mers prea târziu la Biserică. Am ieşit prea repede din Biserică precum Iuda.",
  "Am dus lumânări ce nu-s de la Biserică.",
  "Am cugetat la rele, m-am rugat de formă, am căscat, am dormit, am vorbit, am râs, m-am uitat înapoi, am stricat aerul, am mers certat, am avut gânduri şi imaginaţii spurcate, am mâncat şi băut la rugăciune şi acasă.",
  "N-am sfinţit Duminicile şi Sărbătorile cu Rugăciune şi fapte bune. N-am mers la Biserică.",
  "Am intrat în Biserică necuviincios.",
  "N-am făcut cele Şapte Laude zilnic.",
  "Am făcut metanii când nu trebuie şi când trebuia n-am făcut. (Metanii nu se fac Vineri de la orele 16 până Duminica Ia orele 16; închinăciunile se fac zilnic – 50 de metanii şi 150 de închinăciuni. Cine are Canon face în toate zilele.)",
  "Stând acasă, nu m-am rugat în vremea Sfintelor Slujbe.",
  "Am intrat în Biserică nefiind curat sau curată. (Bărbatul nu are voie în Biserică nespălat şi neprimenit.)",
  "Am oprit pe alţii de la Sfânta Biserică.",
  "Am ţinut post negru în zile oprite (Sâmbăta si Duminica).",
  "N-am crescut copiii şi finii în frica lui Dumnezeu.",
  "M-am arătat nemulţumit(ă) faţă de părinţi.",
  "Am amărât, am certat, am defăimat, am mâncat viaţa, m-am întărâtat la mânie, am lovit, am îmbrâncit, nu m-am supus soţului (sau, în cazul bărbatului, n-am ascultat de soţie) Ia bine.",
  "Am divorţat de soţ sau soţie.",
  "M-am gândit să mă răzbun şi m-am răzbunat (de exemplu: „Dacă el mi-a zis, i-am zis şi eu”).",
  "Am urât pe alţii şi le-am dorit moartea pe moment.",
  "Am bătut rău pe alţii.",
  "Am clevetit, am amărât, am certat, am defăimat, am ponegrit, am judecat, am osândit pe alţii.",
  "M-am spălat imediat după ce am păcătuit, ca să nu rămân gravidă, făcând avorturi nenumărate.",
  "Am contribuit la uciderea sufletească şi trupească a copiilor mei.",
  "Am făcut băi, injecţii, masaje, sărituri, ridicaturi, am băut ceaiuri, am luat tablete şi am avortat (dacă a avortat din aceste metode – dacă nu, se va spune motivul).",
  "Am îndemnat, am învăţat, am ajutat, am dus, am făcut avort altora. N-am oprit alte persoane să facă avorturi sau să se păzească de a nu avea copii. (Pentru aceasta se dă Canon 20 de ani.)",
  "Am pierdut, fără voia mea, sarcina (la unu patru.., copii).",
  "Am avortat (1-30 copii). De la zece copii avortaţi în sus cel în cauză numai la moarte va lua împărtăşania.",
  "Am înăbuşit copilul lângă mine, fiind botezat sau nebotezat.",
  "Din neglijenţa mea, mi-au murit copii în apă, în joc etc. (indiferent de numărul copiilor, unu-cinci etc.).",
  "Am lepădat copiii vii pe drumuri.",
  "M-am păzid de a nu face copii. (Aceasta este mare păcat.)",
  "N-am făcut molitvă după avorturi, la 40 de zile.",
  "Mi-am ucis sufletul făcând voia trupului.",
  "Am făcut rămăşaguri, pariuri etc. Mi-am silit soţul să-mi cumpere lucruri.",
  "Am chinuit, am omorât animale, păsări, insecte, le-am bătut, înţepat, înfometat.",
  "Am botezat copii avortaţi.",
  "Am avut gânduri necurate, pofte trupeşti. M-am îndulcit cu ele.",
  "Am făcut păcat cu ochiul. Am privit deşertăciune (televizor, filme porno etc.).",
  "Am căutat prilej de păcat (de exemplu: să atrag pe cineva la curvie).",
  "Am vorbit şi ascultat vorbe deşarte, prostii, vorbe goale.",
  "Am cântat şi ascultat cântece lumeşti şi sectare.",
  "Am jucat şi am mers la nunţi, la baluri, la disco, la filme etc. spre a păcătui.",
  "Mi-am aţâţat singur poftele trupeşti, mâncând şi bând peste măsură. M-am încrezut în puterea mea căzând în păcat (de exemplu: o fată rămasă cu un băiat singură).",
  "M-am aprins de curvie asupra preotului (sau preotesei), călugărului (sau călugăriţei).",
  "Am preacurvit sau am gândit cu preot, cu preoteasă, cu călugăr, cu călugăriţă.",
  "Am preacurvit cu mai mulţi bărbaţi, cu evrei, catolici, turci, sectari, cu rude apropiate, cu naşi, fini, cumnaţi, nepoţi, cu doi fraţi, cu două surori, cu fiu, cu fiică.",
  "M-am rugat la diavol să-mi aducă înainte femeia să păcătuiesc.",
  "M-am căsătorit cu rudenie de sânge, de cuscrie.",
  "Am avut gânduri spurcate asupra mamei, tatălui, surorii, fratelui.",
  "Am dormit cu tata, cu fraţii sau cu nepoţii, fiind mărişoară.",
  "Am dat spurcăciuni la soţ şi la alţii.",
  "Am preacurvit, cu gândul, cu morţii.",
  "Am dormit acasă în timpul Sfintei Liturghii.",
  "Am dormit şi băut apă peste măsură.",
  "Făcând malahie, am curvit cu diavolul.",
  "N-am păzit înfrânarea în familie.",
  "Am furat, am nedreptăţit, am asuprit, am înşelat pe alţii.",
  "Am ascuns furtul altuia (de exemplu: dacă ai lăsat un timp lucrul furat la tine).",
  "Am cumpărat sau am folosit lucruri furate. (Pentru aceasta nu ne mântuim niciodată.)",
  "Am fost nemulţumit cu starea mea (de exemplu am zis: „mai bine era aşa sau aşa”).",
  "Am tăinuit şi am ţinut lucruri străine (ce ai luat împrumut sau ai găsit dă-l înapoi omului).",
  "Am furat de la Sfânta Biserică şi de la Mănăstiri.",
  "Am jefuit, am călcat morminte. N-am îngrijit de morţi şi de morminte.",
  "Am făcut deranj la înmormântări. Am râs la privegheri (priveghi).",
  "Am moştenit lucruri de la război, cu forţa sau pe nedrept.",
  "N-am plătit contribuţia la Sfânta Biserică.",
  "N-am întors paguba făcută aproapelui.",
  "Am vândut mortăciuni sau animale moarte.",
  "N-am ţinut învoiala făcută.",
  "Am luat dobândă la bani.",
  "Am vorbit minciuni, am băgat vrajbă, am asuprit pe alţii.",
  "Am vorbit cu două înţelesuri.",
  "Am vorbit altfel de cum gândesc.",
  "Am umblat cu făţărnicie şi cu vicleşug.",
  "Am poftit lucrul bun al aproapelui.",
  "Am căzut în mândrie, în slavă deşartă, în trufie, în laudă de sine.",
  "Sunt încăpăţânat, certăreţ, ambiţios, iubitor de sine. Am obiceiuri rele pe care nu le-am părăsit (de exemplu: clevetire, lenevire, blestem, mânie, nu tac).",
  "M-am purtat ca lumea imorală. (Pentru femei, trebuie fuste la jumătatea piciorului permanent.)",
  "M-am spălat şi m-am parfumat cu săpun mirositor ca să plac altora.",
  "Am lepădat podoaba bărbătească. (Pentru cine nu poartă nici măcar mustaţă. „Bărbat” vine de la barbă, căci Adam în Rai avea barbă.)",
  "Mi-am retezat părul şi port pantaloni (pentru femei).",
  "Am purtat zorzoane şi umblu cu capul descoperit (pentru femei).",
  "M-am sulemenit, m-am fardat, m-am dat cu ruj, cu pudră, cu creme. (Pentru aceasta se dă Canon doi ani.)",
  "Am ascultat discuţiile altora în tren, în maşină, pe sub ferestre sau uşi.",
  "M-am rugat cu glas tare fiind singur(ă).",
  "Am intrat în Sfântul Altar. Maicile numai în Mănăstirea lor pot să intre acolo.",
  "Am zavistuit, pizmuit, am ameninţat şi am scuipat pe alţii.",
  "Am fost iubitor a lua şi zăbavnic a da milostenie.",
  "Am plâns peste măsură pierzând ceva avere (moştenire).",
  "Am moştenit şi n-am îngrijit de cei ce mi-au dat moştenirea.",
  "Am fost zgârcit(ă) şi n-am dat milostenie pentru sufletul meu.",
  "Am strâns comori şi le-am îngropat.",
  "Mi-a părut bine când a murit cineva.",
  "Am blestemat cu foc, din inimă.",
  "Am zis altora: „Ducă-se-n ruşine”, „în mamă-să”, „în brânză”, „în papuci” etc.",
  "Mi-a părut bine de răul altora.",
  "N-am iertat pe cei ce-mi greşesc şi n-am cerut iertare.",
  "Am călcat posturile. Am mâncat peste măsură, pe ascuns, pe furiş, am mâncat spurcat, printre prânzuri, de dimineaţă, am mâncat sugrumat, de sânge. Am mers mâncat la Spovedanie.",
  "Am vorbit şi am râs la masă.",
  "Am cârtit împotriva mâncătorilor (am postit, am plătit slujbe împotriva vrăjmaşilor etc.).",
  "Am stat şi m-am sculat de la masă fără rugăciune. (Pentru aceasta se dă Anatemă.)",
  "Nu mi-am căutat sănătatea după datorie.",
  "Sunt necumpătat în cheltuieli (bani risipiţi, bomboane, lux, gumă, ţigări).",
  "Am luat Sfânta Anaforă după mâncare şi am băut apă după miezul nopţii.",
  "M-am mâniat. Ţin minte răul, pomenesc răul.",
  "Am cârtit în necazuri (de exemplu: „Of, m-am săturat!”).",
  "Nu tac. („Tăcerea e de aur, a vorbi despre Dumnezeu e de argint, iar restul e osândă”.)",
  "Am mustrat cu asprime (am cicălit peste măsură, deşi a recunoscut greşeala).",
  "Am râvnă nesocotită. (Fac post peste măsură, milostenie fără socoteală, suferind cei din casă, mă ocup de alţii mai mult decât de mine.)",
  "Nu m-am rugat în orice vreme şi loc.",
  "M-am culcat seara fără rugăciune, m-am sculat şi am plecat fără rugăciune. Mi-am pierdut dragostea faţă de aproapele.",
  "N-am aprins candela, lumânările, tămâia la rugăciune.",
  "Am pierdut lucruri sfinte (Icoane, candele, cruci).",
  "N-am rămas statornic în bine.",
  "Am stat într-un genunchi, ca şi catolicii şi evreii, la rugăciune. (Dacă avem doi genunchi, să stăm pe amândoi.)",
  "Am zis „lisus” în loc de „Domnul nostru lisus Hristos”.",
  "Nu m-am rugat la plecarea în şi la sosirea din călătorie sau la începutul şi la sfârşitul lucrului.",
  "N-am sfinţit casa şi vasele ce s-au spurcat.",
  "N-am stropit cu Agheasmă la fiecare întâi a lunii.",
  "M-am lenevit să-mi Spovedesc păcatele (mai mult de un an cu sau fără Canon).",
  "M-am Spovedit incomplet.",
  "Am mers la mai mulţi duhovnici. (Se merge la cel mai bun, indiferent de scopul cu care mergi.)",
  "N-am îndeplinit Canonul dat şi n-am făcut de-ajuns pentru a-mi şterge păcatele.",
  "Mi-am măgulit lenea zicând: „De aş fi la mănăstire, m-aş tot ruga”.",
  "M-am făcut părtaş la păcate străine, îndemnând, ajutând, neoprind, lăudând păcatele altora.",
  "N-am ajutat pe aproape sufleteşte şi trupeşte. Sufleteşte, n-am adus suflete la mântuire, iar trupeşte, n-am îmbrăcat pe goi sau flămânzi.",
  "Nu am virtuţile teologice: Credinţa, Nădejdea, Dragostea şi înţelepciunea, dreptatea, tăria, cumpătarea.",
  "Mi-am folosit în păcate libertatea vieţii. (Oricât am fi fost de ocupaţi în viaţă, timp pentru păcate avem, dar pentru Dumnezeu nu.)",
  "Mă apasă păcatele subţiri, îngâmfarea de sine, cruţarea de sine, mila de sine, părerea de sine, înfumurarea, iubirea de sine etc.",
];

// Generăm ID-uri unice cu prefixul "cleopa-"
const CLEOPA_GUIDE_DATA = [
  {
    id: "cleopa-cat-1",
    title: "Îndreptar de Spovedanie - Sfântul Cleopa Ilie",
    items: CLEOPA_ITEMS.map((text, idx) => ({
      id: `cleopa-${idx + 1}`,
      text: text,
    })),
  },
];

export default function CleopaGuideScreen() {
  const {
    addItem,
    removeItem,
    selectedItems,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
  } = useConfession();

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const pathname = usePathname();

  const isFocused = pathname.includes("cleopa");

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFontSettings, setShowFontSettings] = useState(false);

  // LOGICA PENTRU HEADER
  useEffect(() => {
    if (isFocused) {
      const headerParent = navigation.getParent() || navigation;
      headerParent.setOptions({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => (navigation as any).openDrawer?.()}
            style={{ marginLeft: 15, padding: 5 }}
          >
            <Menu size={24} color="white" />
          </TouchableOpacity>
        ),
        headerTitle: isSearching
          ? () => (
              <TextInput
                placeholder="Caută..."
                placeholderTextColor="#D1D5DB"
                style={{
                  color: "white",
                  fontSize: 18,
                  width: 200,
                  fontFamily: "Lora",
                }}
                autoFocus
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            )
          : "Îndreptar Pr. Cleopa",
        headerRight: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                setIsSearching(!isSearching);
                setShowFontSettings(false);
              }}
              style={{ padding: 8 }}
            >
              {isSearching ? (
                <X size={22} color="white" />
              ) : (
                <Search size={25} color="white" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowFontSettings(!showFontSettings)}
              style={{ paddingVertical: 8, paddingHorizontal: 10 }}
            >
              <MoreVertical size={25} color="white" />
            </TouchableOpacity>
          </View>
        ),
      });
    }

    if (!isFocused) {
      setShowFontSettings(false);
      setIsSearching(false);
    }
  }, [isFocused, isSearching, searchQuery, showFontSettings, navigation]);

  const filteredGuide = useMemo(() => {
    if (!searchQuery.trim()) return CLEOPA_GUIDE_DATA;
    return CLEOPA_GUIDE_DATA.map((c) => ({
      ...c,
      items: c.items.filter((i) =>
        i.text.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    })).filter((c) => c.items.length > 0);
  }, [searchQuery]);

  // Funcție ajutătoare pentru adăugare/eliminare
  const handleToggleItem = (
    item: { id: string; text: string },
    isSelected: boolean
  ) => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (isSelected) {
      removeItem(item.id);
    } else {
      addItem({ id: item.id, text: item.text });
    }
  };

  return (
    <View style={styles.container}>
      {showFontSettings && (
        <View style={styles.fontBar}>
          <Text style={styles.fontLabel}>Dimensiune text:</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 40,
        }}
      >
        {filteredGuide.map((cat) => (
          <View key={cat.id} style={{ marginBottom: 25 }}>
            <Text style={styles.catTitle}>{cat.title}</Text>
            {cat.items.map((item) => {
              const sel = selectedItems.some((i) => i.id === item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.itemCard, sel && styles.itemCardSel]}
                  onPress={() => handleToggleItem(item, sel)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.itemText,
                      { fontSize: fontSize },
                      sel && styles.selText,
                    ]}
                  >
                    {item.text}
                  </Text>
                  <View style={[styles.addB, sel && styles.addBSel]}>
                    {sel ? (
                      <Check size={20} color="#5D2E0A" />
                    ) : (
                      <Plus size={20} color="#8B4513" />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF8F3" },
  fontBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF8E7",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D4A373",
  },
  fontLabel: { fontFamily: "Lora-Bold", color: "#5D2E0A" },
  fBtn: {
    backgroundColor: "#8B4513",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  fBtnT: { color: "white", fontWeight: "bold" },
  fValue: { marginHorizontal: 15, fontWeight: "bold", color: "#5D2E0A" },
  catTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5D2E0A",
    marginBottom: 15,
    textAlign: "center",
  },
  itemCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    elevation: 2,
  },
  itemCardSel: {
    backgroundColor: "#F5EBE1",
    borderColor: "#D4A373",
    borderWidth: 1,
  },
  itemText: { flex: 1, color: "#2C2415", lineHeight: 24 },
  selText: { color: "#8C7A6B", textDecorationLine: "line-through" },
  addB: {
    padding: 5,
    borderRadius: 8,
    backgroundColor: "#FFF8E7",
    marginLeft: 10,
  },
  addBSel: { backgroundColor: "#E6D2C1" },
});