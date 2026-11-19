const fs = require('fs');
const path = require('path');

const workletsPath = path.join(__dirname, '..', 'node_modules', 'react-native-worklets-core', 'ios', 'Worklets.mm');

if (fs.existsSync(workletsPath)) {
let content = fs.readFileSync(workletsPath, 'utf8');

content = content.replace(/RCTCxxBridge/g, 'RCTBridge');
content = content.replace(/if\s*\(\s*cxxBridge\.runtime\s*!=\s*nullptr\s*\)/g, 'if (false)');
content = content.replace(/\(facebook::jsi::Runtime\s*\*\s*\)cxxBridge\.runtime/g, 'nullptr');

fs.writeFileSync(workletsPath, content, 'utf8');
console.log('Succes: S-a aplicat patch-ul pentru react-native-worklets-core (Worklets.mm)');
} else {
console.log('Notă: Nu s-a găsit Worklets.mm pentru patch.');
}
