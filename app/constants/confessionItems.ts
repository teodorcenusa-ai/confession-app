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
    id: "credinta",
    title: "ÎNDREPTAR DE SPOVEDANIE",
    items: [
      { id: "c1", text: "Sunt indiferent față de învățătura de credință, nu înțeleg și sunt împotriva unor puncte din învățătura de credință. M-am lenevit a citi cărți duhovnicești." },
      { id: "c2", text: "L-am lăsat pe Dumnezeu pe ultimul plan al preocupărilor mele zilnice." },
      { id: "c3", text: "Nu mă rog regulat seara, dimineața și la masă. Mă lenevesc la rugăciune, nu sunt atent. Sunt formalist." },
      { id: "c4", text: "Am fost cuprins de deznădejde sau am avut încredere prea mare în ajutorul lui Dumnezeu, îngăduindu-mi să greșesc oricât." },
      { id: "c5", text: "Nu sunt preocupat de îmbunătățirea vieții mele spirituale (prin Sfânta Împărtășanie, spovedanie, rugăciune, meditație, lecturi duhovnicești, milostenie). N-am nici un fel de preocupare duhovnicească. Mă spovedesc foarte rar, și atunci din obicei, tradiție sau rutină." },
      { id: "c6", text: "Mă rușinez a-mi mărturisi credința. M-am rușinat a-mi face semnul crucii în dreptul bisericii." },
      { id: "c7", text: "Am fost lipsit de cuviință față de unele lucruri sfinte." },
      { id: "c8", text: "Mă preocupă mai mult lucrurile lumești decât cele duhovnicești." },
      { id: "c9", text: "Port diverse obiecte care să aducă noroc." },
      { id: "c10", text: "Îmi place să mă îmbrac deocheat și cu podoabe pentru a 'crea impresie'." },
      { id: "c11", text: "Am fost la vrăjitori, ghicitoare, descântătoare. Am crezut în vise. Sunt superstițios." },
      { id: "c12", text: "Am avut îndoială în credință. Am frecventat adunări sectare. Am primit și am lecturat cărți sectare." },
      { id: "c13", text: "Nu am ascultat de duhovnic. Nu am fost întotdeauna sincer la spovedanie. Am mărturisit o parte din păcate la un duhovnic, altele la altul." },

      { id: "b1", text: "Am înjurat (chiar de cele sfinte). Am drăcuit. Am blestemat." },
      { id: "b2", text: "Am jurat mincinos sau fără trebuință. Am încălcat un legământ făcut lui Dumnezeu." },
      { id: "b3", text: "Am vorbit vulgar; am blasfemiat (hulit); am spus glume sau bancuri pe seama celor sfinte. Am râs peste măsură." },

      { id: "d1", text: "Nu merg regulat în duminici și sărbători la biserică. Nu sunt atent la slujbă. În biserică am vorbit, am râs, m-am uitat în jur criticând, judecând pe alții (ex. pentru ținuta vestimentară), în loc să-mi văd de rugăciune." },
      { id: "d2", text: "Fac afaceri, merg la piață sau fac alte munci (spălat, călcat gătit, muncile câmpului etc.) în zile de duminică și sărbători." },

      { id: "a1", text: "Pierd mult timp în fața televizorului. Mi-am irosit timpul în discuții nefolositoare, bârfă. Am provocat certuri și scandaluri." },
      { id: "a2", text: "Am judecat pe alții, inclusiv pe preoți. Am condamnat." },
      { id: "a3", text: "Am desconsiderat, am ironizat, am vorbit de rău și am judecat pe alții." },
      { id: "a4", text: "M-am certat, mâniat, m-am bătut cu alții. N-am iertat pe cei ce mi-au greșit. Nu mi-am cerut iertare. Am dus pe cineva la deznădejde." },
      { id: "a5", text: "Îmi pierd ușor răbdarea. Sunt nervos, agresiv." },
      { id: "a6", text: "Sunt în dușmănie cu cineva. Sunt răzbunător. Am rănit sau ucis pe cineva cu voie sau fără voie (ex. în accident, la o ceartă etc.)." },
      { id: "a7", text: "Am profitat de slăbiciunea sau ignoranța unui semen al meu. Am calomniat, ocărât. Am jignit pe alții." },
      { id: "a8", text: "Am dat ca milostenie hrană alterată. Sunt zgârcit. Fac milostenie cârtind." },
      { id: "a9", text: "Am incitat pe alții la păcat. Am pârât. Sunt ușor influențabil. Sunt fanatic. Sunt fățarnic. Sunt aspru cu animalele." },
      { id: "a10", text: "N-am oprit, când puteam, săvârșirea răului. Putând să săvârșesc binele, nu l-am făcut." },
      { id: "a11", text: "N-am fost cuviincios în ținută, purtare, vorbe, gesturi." },

      { id: "p1", text: "Sunt obraznic, cârtitor și neascultător față de părinți. N-am avut grijă de părinți la boală sau la bătrânețe." },
      { id: "p2", text: "Nu mi-am educat creștinește copiii. Am făcut diferențieri între copii." },
      { id: "p3", text: "Nu mi-am îndeplinit obligațiile spirituale ca naș (de botez sau de căsătorie)." },
      { id: "p4", text: "Am fumat. Am contribuit la uciderea sufletească a copiilor (ex. înjurând, vorbind urât, fac scandal etc.). Sunt rău, aspru și gelos cu femeia." },
      { id: "p5", text: "Am oprit soția sau copiii să meargă la biserică. Nu m-am îngrijit de pomenirea rudelor apropiate care au trecut la cele veșnice." },
 { id: "v1", text: "Am săvârșit avort (chiar și din neglijență). Mi-am dat consimțământul sau am îndemnat pe cineva la comiterea unui avort." },
      { id: "v2", text: "Am dorit moartea cuiva. Am avut gânduri sau tentative de sinucidere." },
      { id: "v3", text: "Mi-am distrus propria sănătate printr-o viață dezordonată: băutură, fumat, droguri, petreceri, nopți nedormite, necumpătare la mâncare." },

      { id: "des1", text: "Am vizionat filme pornografice. Trăiesc în concubinaj. Am divorțat. Am făcut desfrânare." },
      { id: "des2", text: "Am avut relații nefirești (sex oral-gomorie, sex anal-sodomie, masturbare-malahie, cu animalele). Am stricat familia altora. Am utilizat practici contraceptive." },
      { id: "des3", text: "Mi-am satisfăcut singur plăcerile sexuale. M-am îndulcit de imagini desfrânate. Am avut gânduri nerușinate. Am postere indecente pe pereți sau în mașină. M-am desfătat cu lecturi erotice. Am frecventat discotecile." },
      { id: "des4", text: "M-am uitat cu gând păcătos la alte persoane. M-am îmbrăcat indecent pentru a atrage privirile celor din jur." },
      { id: "des5", text: "M-am antrenat sau am provocat discuții obscene. Am fost neserios încurajând în mintea mea desfrânarea." },

      { id: "f1", text: "Am furat. Am îndemnat sau am ajutat pe alții la furt. Am furat de la biserică. Am agonisit bani pe căi neinstite." },
      { id: "f2", text: "Am înșelat pe altcineva. Am primit și am dat mită. Am dat pretinzând dobândă. Am jefuit, călcat, profanat morminte." },
      { id: "f3", text: "Am oprit plata lucrătorilor. I-am nedreptățit la plată. Am practicat jocuri de noroc." },
      { id: "f4", text: "Am căutat să înșel în diverse situații (călătorii fără bilet, speculă, furt la cântar, falsificarea produselor, neplata dărilor către stat, etc.)." },
      { id: "f5", text: "Am adus jertfă la biserică din bunuri furate. Am făcut milostenie din orgoliu și pentru a fi apreciat de alții." },

      { id: "m1", text: "Am minţit. Am vorbit cu două înţelesuri. Am fost linguşitor pentru a-mi atinge scopul. Am dorit (încă doresc) răul cuiva. Ţin minte răul." },
      { id: "m2", text: "Am fost martor mincinos la proces. Am corupt pe cineva să dea declarații false împotriva cuiva." },
      { id: "m3", text: "În loc să caut o soluție creștinească am dat repede pe alții în judecată. Am desconsiderat pe alții." },
      { id: "m4", text: "Am contribuit (direct sau indirect) la umilirea, nedreptățirea sau condamnarea unui semen al meu." },

      { id: "man1", text: "M-am mândrit și m-am lăudat pe mine însumi. Îmi place să fiu lăudat. Mă consider superior altora. Sunt încăpățânat." },
      { id: "man2", text: "Am invidiat pe alții pentru avere, inteligență, cultură, poziție socială, succes, reușită familială etc. M-am bucurat de răul altuia." },

      { id: "l1", text: "Sunt hrăpăreț, având pretenții asupra unor moșteniri necuvenite. Am mutat hotarul. Sunt lacom, pofticios, posesiv, necumpătat, leneș." },
      { id: "l2", text: "M-am îmbătat, m-am certat cu soția sau cu alte persoane fiind în stare de ebrietate, sau chiar m-am bătut." },
      { id: "l3", text: "Sunt lacom la băutură și la mâncare. Nu am ținut posturile, nici miercurile și vinerile." },
      { id: "l4", text: "Îmi place să ascult muzică necuviincioasă. Îmi place să dansez necuviincios. Am organizat sau am participat la petreceri în posturi." },
    ],
  },
];
