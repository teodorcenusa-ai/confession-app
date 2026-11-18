const fs = require('fs');
const path = require('path');

const workletsPath = path.join(__dirname, '..', 'node_modules', 'react-native-worklets-core', 'ios', 'Worklets.mm');

if (fs.existsSync(workletsPath)) {
  let content = fs.readFileSync(workletsPath, 'utf8');
  
  // Înlocuim referințele problematice la RCTCxxBridge pentru a folosi RCTBridge în siguranță pe RN modern
  content = content.replace(/RCTCxxBridge/g, 'RCTBridge');
  
  fs.writeFileSync(workletsPath, content, 'utf8');
  console.log('Succes: S-a aplicat patch-ul pentru react-native-worklets-core (Worklets.mm)');
} else {
  console.log('Notă: Nu s-a găsit Worklets.mm pentru patch.');
}