export interface ConfessionCategory {
  id: string;
  title: string;
  items: ConfessionItem[];
}

export interface ConfessionItem {
  id: string;
  text: string;
}

export const CONFESSION_GUIDE: ConfessionCategory[] = [
  {
    id: "indreptar-complet",
    title: "ÎNDREPTAR DE SPOVEDANIE",
    items: [
      { id: "1", text: "Sunt indiferent față de învățătura Bisericii; nu caut să înțeleg credința și contest fără să cercetez." },
 { id: "1.1", text: " M-am lenevit să citesc Sfânta Scriptură și cărți duhovnicești. În privința credinței mă informez mai mult din surse superficiale decât din învățătura Bisericii." },
      { id: "2", text: "L-am lăsat pe Dumnezeu pe ultimul plan al preocupărilor mele zilnice." },
      { id: "3", text: "Nu am rânduială de rugăciune. Mă rog rar sau superficial, grăbit și fără atenție. Sunt formalist." },
      { id: "4", text: "Am căzut în deznădejde, pierzând nădejdea în mila lui Dumnezeu, sau, dimpotrivă, am abuzat de bunătatea Lui, justificând păcatul și îngăduindu-mi să greșesc oricât." },
      { id: "5", text: "Nu sunt preocupat de îmbunătățirea vieții mele spirituale. Mă spovedesc foarte rar, fără pregătire sau fără dorință reală de schimbare, din obișnuință sau rutină." },
      { id: "6", text: "Mă rușinez să-mi arăt credința în public. Evit să mărturisesc că sunt creștin din teama de a nu fi judecat sau ironizat." },
      { id: "7", text: "Am tratat cu superficialitate sau lipsă de respect lucrurile sfinte (biserica, icoanele, slujbele, preoții)." },
      { id: "8", text: "Am folosit un limbaj vulgar și am ironizat lucrurile sfinte. Am distribuit sau apreciat conținut batjocoritor la adresa credinței (inclusiv online)." },
      { id: "9", text: "Mă preocupă aproape exclusiv bunăstarea materială și imaginea mea, neglijând viața sufletească." },
      { id: "10", text: "Am apelat la superstiții, talismane sau practici care exprimă lipsă de încredere în purtarea de grijă a lui Dumnezeu." },
      { id: "11", text: "Am avut îndoială în credință și nu am căutat lămurire în Biserică. Am frecventat adunări sectare. Am primit și am lecturat cărți sectare." },
      { id: "12", text: "Nu particip cu regularitate la Sfânta Liturghie în duminici și sărbători. În biserică sunt neatent, distras (telefon, priviri, conversații), criticând în loc să mă rog." },
      { id: "13", text: "Nu cinstesc ziua Domnului, tratând-o ca pe o zi obișnuită de lucru sau comerț, fără a acorda timp lui Dumnezeu." },
      { id: "14", text: "Am fost nerecunoscător față de Dumnezeu pentru darurile primite și am cârtit în încercări." },
      { id: "15", text: "M-am împărtășit fără pregătire sau, dimpotrivă, am neglijat mult timp Sfânta Împărtășanie din nepăsare." },
      { id: "16", text: "Am distrus sau am folosit iresponsabil mediul și bunurile create de Dumnezeu." },
      { id: "17", text: "Aleg ținute sau comportamente prin care caut să atrag atenția și admirația, cultivând slava deșartă." },
      { id: "18", text: "Am apelat la vrăjitorie, ghicire sau practici oculte. Am crezut în horoscop, energii, preziceri sau alte forme de ocultism." },
      { id: "19", text: "Am înjurat (chiar de cele sfinte). Am drăcuit. Am blestemat." },
      { id: "20", text: "Am jurat mincinos sau fără trebuință. Am încălcat un legământ făcut lui Dumnezeu." },
      { id: "21", text: "Îmi risipesc timpul în divertisment excesiv (televizor, internet, rețele sociale, jocuri)." },
      { id: "22", text: "M-am implicat în bârfe, comentarii negative și conflicte, inclusiv în mediul digital." },
      { id: "23", text: "Am consumat sau distribuit conținut care răspândește violență, imoralitate sau dispreț față de valori creștine (internet, rețele sociale)." },
      { id: "24", text: "Am judecat și condamnat pe alții, asumându-mi rolul de judecător, fără dragoste și discernământ." },
      { id: "25", text: "Am disprețuit, am ironizat, am vorbit de rău și am judecat pe alții." },
      { id: "26", text: "Am fost lipsit de respect și recunoștință față de părinți. Nu i-am sprijinit material sau sufletește la nevoie." },
      { id: "27", text: "Nu mi-am educat creștinește copiii. Am făcut diferențieri între copii." },
      { id: "28", text: "Am neglijat responsabilitatea duhovnicească asumată la botez sau cununie." },
      { id: "29", text: "Prin comportament violent, cuvinte grele sau gelozie mi-am rănit sufletește familia." },
      { id: "30", text: "Nu mi-am împlinit canonul dat de duhovnic. Nu am fost întotdeauna sincer la spovedanie, ascunzând sau minimalizând păcatele." },
      { id: "31", text: "Am săvârșit avort sau am îndemnat la avort." },
      { id: "32", text: "Am dorit răul sau moartea cuiva. Am avut gânduri sau tentative de sinucidere. Am ucis." },
      { id: "33", text: "Mi-am vătămat trupul – templu al Duhului Sfânt – prin excese și dependențe (alcool, droguri, nopți pierdute etc.)." },
      { id: "34", text: "Sunt în dușmănie cu cineva. Refuz să iert sau să cer iertare." },
      { id: "35", text: "M-am lăsat stăpânit de mânie, agresivitate sau violență fizică și verbală." },
      { id: "36", text: "Am consumat pornografie, am trăit în concubinaj, am relativizat rânduiala Bisericii privind viața conjugală." },
      { id: "37", text: "Mi-am satisfăcut singur plăcerile sexuale." },
      { id: "38", text: "M-am uitat cu gând păcătos la alte persoane." },
      { id: "39", text: "Am întreținut conversații și glume obscene, alimentând o gândire desfrânată." },
      { id: "40", text: "Am furat sau am înșelat pe alții pentru câștig material, inclusiv prin mijloace digitale." },
      { id: "41", text: "Am înșelat, am exploatat sau am profitat material de alții." },
      { id: "42", text: "Nu am plătit corect sau la timp pe cei care au muncit pentru mine." },
      { id: "43", text: "Am recurs la fraudă, evaziune sau alte forme de înșelăciune pentru câștig personal." },
      { id: "44", text: "Am mințit sau am indus pe alții în eroare prin cuvintele mele." },
      { id: "45", text: "Am contribuit la nedreptatea altuia prin declarații false sau manipulare." },
      { id: "46", text: "Am participat, direct sau indirect, la rănirea reputației sau dreptății aproapelui." },
      { id: "47", text: "Am rămas indiferent față de suferința sau nevoile aproapelui, deși puteam ajuta." },
      { id: "48", text: "M-am lăsat stăpânit de mândrie și slavă deșartă. Caut aprecierea și validarea celorlalți, mă cred superior și refuz să primesc sfat sau mustrare. Sunt încăpățânat." },
      { id: "49", text: "Am exploatat vulnerabilitatea altuia. Am defăimat, insultat sau umilit prin cuvinte, mesaje sau atitudini." },
      { id: "50", text: "Am manipulat sau am încercat să controlez pe alții pentru interesul sau orgoliul meu." },
      { id: "51", text: "Am invidiat pe alții pentru avere, inteligență, cultură, poziție socială, succes, reușită familială etc. M-am bucurat de eșecul sau suferința aproapelui." },
      { id: "52", text: "Am dorit bunuri care nu mi se cuvin. Am mutat hotarul. Sunt lacom, pofticios, posesiv, necumpătat, leneș." },
      { id: "53", text: "Am fost zgârcit și nu am ajutat pe cei în nevoie." },
      { id: "54", text: "Când am făcut milostenie, am dăruit fără dragoste, din interes, pentru imagine sau cu dispreț." },
      { id: "55", text: "Am oprit soția sau copiii să meargă la biserică. Nu m-am îngrijit de pomenirea rudelor apropiate care au trecut la cele veșnice." },
      { id: "56", text: "Am căzut în patima beției și am provocat scandal, violență sau tulburare în familie sau în societate." },
      { id: "57", text: "Sunt lacom la băutură și la mâncare. Nu am ținut posturile, nici miercurile și vinerele." },
      { id: "58", text: "Îmi place să ascult muzică necuviincioasă. Am organizat sau am participat la petreceri în posturi." },
      { id: "59", text: "Am incitat pe alții la păcat. Am pârât. Sunt ușor influențabil. Sunt fanatic. Sunt fățarnic. Sunt aspru cu animalele." },
      { id: "60", text: "Am fost indiferent față de rău și nepăsător față de bine. Am omis să fac binele atunci când aveam posibilitatea." },
      { id: "61", text: "Nu am păstrat decența în comportament, limbaj și înfățișare. Am căutat să atrag atenția prin ținută sau atitudine nepotrivită." },
    ],
  },
];
export const CONFESSION_GUIDE_KIDS: ConfessionCategory[] = [
  {
    id: "copii_ghid_detaliat",
    title: "ÎNDREPTAR PENTRU COPII",
    items: [
      { id: "k1", text: "Nu mi-am făcut semnul sfintei cruci dimineața, seara, la masă sau în dreptul unei biserici." },
      { id: "k2", text: "Nu m-am închinat seara și dimineața, din lenevire. N-am vrut să mă rog nici când mi-au spus părinții, i-am mințit spunând că sunt obosit sau că mi-am făcut deja rugăciunea." },
      { id: "k3", text: "Nu am vrut să merg la Biserică în duminici și sărbători. Am preferat să merg la joacă cu colegii sau să mă uit la televizor ori pe telefon în timpul slujbei." },
      { id: "k4", text: "La biserică nu am avut răbdare. Am vorbit, am râs cu alți copii, m-am uitat mereu în jur și nu am fost atent la slujbă. Am ieșit din biserică înainte de terminarea slujbei." },
      { id: "k5", text: "Nu am postit miercurea și vinerea sau în posturile rânduite. M-am lăcomit la dulciuri sau am căutat mâncare de dulce în zilele de post." },
      { id: "k6", text: "Am folosit cuvinte urâte, cuvinte murdare. Am înjurat. Am înjurat de cele sfinte." },
      { id: "k7", text: "M-am adresat cu cuvinte urâte părinților, fraților, prietenilor de joacă sau colegilor de la grădiniță/școală." },
      { id: "k8", text: "Am folosit porecle. Am râs de colegi sau de oameni mari." },
      { id: "k9", text: "Am fost rău cu cei săraci, cerșetori sau cu oameni neputincioși." },
      { id: "k10", text: "Nu am fost cu mai multă atenție în ziua în care m-am împărtășit. Am scuipat. Am vorbit urât. Am vorbit de rău." },
      { id: "k11", text: "Nu am ascultat de părinți și bunici. Am răspuns înapoi. M-am purtat cu obrăznicie. Nu i-am ajutat atunci când mi-au cerut. I-am supărat prin această purtare a mea." },
      { id: "k12", text: "Am pierdut mult timp la televizor, calculator, telefon sau tabletă. Mi-au plăcut desenele animate cu violență, jocurile de acțiune, război etc." },
      { id: "k13", text: "Am văzut imagini nepotrivite pentru vârsta mea." },
      { id: "k14", text: "Am fost răutăcios. M-am certat (cu părinții, frații, surorile, colegii, prietenii etc.). Nu am vorbit cu ei după ceartă. Nu mi-am cerut iertare când am greșit. Nu am vrut să iert celor care mi-au greșit." },
      { id: "k15", text: "M-am bătut cu alți copii sau i-am lovit." },
      { id: "k16", text: "M-purtat aspru cu animalele sau le-am chinuit." },
      { id: "k17", text: "Am luat lucrurile altuia (la școală/grădiniță; acasă, fără știrea fraților sau a surorilor). Am găsit ceva pierdut și nu am încercat să îl dau înapoi celui care l-a pierdut." },
      { id: "k18", text: "Am înșelat în felurite chipuri (am faultat la fotbal, am trișat la jocuri; am copiat la examene; am primit rest mai mult și nu am dat înapoi etc.)." },
      { id: "k19", text: "Am mințit. Nu am recunoscut când am greșit. Am dat vina pe altcineva." },
      { id: "k20", text: "Am acoperit fapta rea a cuiva. Am făcut o faptă rea și nu am recunoscut-o singur, sperând să nu se afle." },
      { id: "k21", text: "Am făcut promisiune lui Dumnezeu sau în fața părinților și nu le-am împlinit." },
      { id: "k22", text: "Am vrut să mi se facă mereu pe plac și m-am supărat când nu am primit ce mi-am dorit." },
      { id: "k23", text: "Mi-am făcut prieteni care înjură, vorbesc urât sau fac lucruri rele și m-am lăsat influențat de ei." },
      { id: "k24", text: "Am invidiat colegii mai buni la învățătură sau mai apreciați și nu m-am bucurat pentru reușita lor." },
      { id: "k25", text: "Nu i-am ajutat pe colegii care aveau nevoie de ajutor la învățătură." }
    ]
  }
];