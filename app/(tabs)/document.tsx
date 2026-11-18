import React, { useState, useEffect } from 'react';
import { useConfession } from '../../contexts/ConfessionContext';
import { Trash2, X, Send, MoreVertical, Menu, Printer } from 'lucide-react-native';
import { 
  Platform, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  KeyboardAvoidingView, 
  Keyboard, 
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import * as Haptics from 'expo-haptics';
import * as Print from 'expo-print';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, usePathname } from 'expo-router';

export default function DocumentScreen() {
  const { selectedItems, removeItem, updateItem, customText, setCustomText, clearItems, addItem, fontSize, increaseFontSize, decreaseFontSize } = useConfession();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const pathname = usePathname();

  // Verificăm dacă suntem pe acest ecran folosind ruta curentă
  const isFocused = pathname.includes('document');
  
  const [showFontSettings, setShowFontSettings] = useState(false);

  // Funcție pentru printarea sau salvarea ca PDF a listei de păcate
  const handlePrint = async () => {
    if (selectedItems.length === 0) {
      Alert.alert('Listă goală', 'Nu există elemente în listă pentru a fi printate.');
      return;
    }

    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const itemsHtml = selectedItems
        .map((item, index) => `
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px; text-align: center; color: #7f8c8d; width: 40px;">${index + 1}</td>
            <td style="padding: 12px; color: #2c3e50; font-size: 15px; line-height: 1.5;">${item.text}</td>
          </tr>
        `)
        .join('');

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Helvetica', Arial, sans-serif; padding: 40px; color: #333; background-color: #fff; }
              h1 { color: #5D2E0A; text-align: center; text-transform: uppercase; font-size: 22px; margin-bottom: 5px; }
              .subtitle { text-align: center; color: #D4A373; font-size: 13px; text-transform: uppercase; margin-bottom: 30px; letter-spacing: 1px; }
              .date { font-size: 12px; color: #7f8c8d; margin-bottom: 20px; text-align: right; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th { background-color: #FAF8F3; color: #5D2E0A; padding: 10px; border-bottom: 2px solid #D4A373; text-align: left; }
            </style>
          </head>
          <body>
            <h1>Păcatele Mele</h1>
            <div class="subtitle">Listă pentru Spovedanie</div>
            <div class="date">Data: ${new Date().toLocaleDateString('ro-RO')}</div>
            <table>
              <thead>
                <tr>
                  <th style="text-align: center; width: 40px;">#</th>
                  <th>Păcat / Notă</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </body>
        </html>
      `;

      // Deschide direct fereastra nativă de printare / salvare PDF
      await Print.printAsync({
        html: htmlContent,
      });

    } catch (error) {
      console.error('Erore la printare:', error);
      Alert.alert('Erore', 'A apărut o problemă la generarea documentului pentru printare.');
    }
  };

  useEffect(() => {
    if (isFocused) {
      const headerParent = navigation.getParent() || navigation;
      headerParent.setOptions({
        headerLeft: () => (
          <TouchableOpacity 
            onPress={() => {
              const drawerNav = navigation.getParent();
              if (drawerNav && (drawerNav as any).openDrawer) {
                (drawerNav as any).openDrawer();
              } else if ((navigation as any).openDrawer) {
                (navigation as any).openDrawer();
              }
            }} 
            style={{ marginLeft: 15, padding: 5 }}
          >
            <Menu size={24} color="white" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Buton Print în Header */}
            <TouchableOpacity 
              onPress={handlePrint} 
              style={{ paddingVertical: 8, paddingHorizontal: 10 }}
            >
              <Printer size={22} color="white" />
            </TouchableOpacity>

            {/* Buton Setări Font */}
            <TouchableOpacity 
              onPress={() => setShowFontSettings(prev => !prev)} 
              style={{ paddingVertical: 8, paddingHorizontal: 10, marginRight: 5 }} 
            >
              <MoreVertical size={24} color="white" />
            </TouchableOpacity>
          </View>
        ),
      });
    } else {
      setShowFontSettings(false);
    }
  }, [isFocused, showFontSettings, navigation, selectedItems]);

  const handleRemoveItem = (id: string) => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    removeItem(id);
  };

  const handleClearAll = () => {
    if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    clearItems();
  };

  const handleAddCustomNote = () => {
    if (customText.trim().length === 0) return;
    const newNote = { id: `custom-${Date.now()}`, text: customText.trim() };
    addItem(newNote);
    setCustomText('');
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} 
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 100} 
    >
      {showFontSettings && (
        <View style={styles.fontBar}>
          <Text style={styles.fontLabel}>Dimensiune text:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={decreaseFontSize} style={styles.fBtn}><Text style={styles.fBtnT}>A-</Text></TouchableOpacity>
            <Text style={styles.fValue}>{fontSize}</Text>
            <TouchableOpacity onPress={increaseFontSize} style={styles.fBtn}><Text style={styles.fBtnT}>A+</Text></TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          style={styles.scrollView}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: 10, paddingBottom: insets.bottom + 100 }
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* TITLU ÎNGROȘAT ȘI MAI JOS */}
          <Text style={[styles.sectionTitle, { fontSize: fontSize + 2 }]}>Păcatele Mele</Text>

          {selectedItems.length > 0 && (
            <View style={styles.headerRow}>
              <Text style={[styles.subTitle, { fontSize: fontSize - 2 }]}>LISTĂ PENTRU SPOVEDANIE</Text>
              <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
                <Trash2 size={14} color="#DC2626" strokeWidth={2} />
                <Text style={styles.clearButtonText}>Șterge tot</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.selectedItemsContainer}>
            {selectedItems.map((item) => (
              <View key={item.id} style={styles.selectedItem}>
                <TextInput
                  style={[styles.selectedItemInput, { fontSize: fontSize }]}
                  value={item.text}
                  onChangeText={(newText) => updateItem(item.id, newText)}
                  multiline
                  scrollEnabled={false}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.id)}
                >
                  <X size={18} color="#DC2626" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={[
            styles.customNoteInputContainer, 
            selectedItems.length === 0 && { borderTopWidth: 0, marginTop: 10 } 
          ]}>
            <Text style={[styles.subTitle, { fontSize: fontSize - 2, textAlign: 'left', marginBottom: 10 }]}>ADĂUGĂ NOTĂ NOUĂ</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.textInputNew, { fontSize: fontSize }]}
                value={customText}
                onChangeText={setCustomText}
                placeholder="Scrie aici..."
                placeholderTextColor="#9CA3AF"
                multiline
              />
              <TouchableOpacity 
                style={[styles.sendButton, !customText.trim() && styles.sendButtonDisabled]} 
                onPress={handleAddCustomNote}
                disabled={!customText.trim()}
              >
                <Send size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          {selectedItems.length === 0 && !customText && (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyStateText, { fontSize: fontSize }]}>Lista este goală.</Text>
              <Text style={[styles.emptyStateSubtext, { fontSize: fontSize - 2 }]}>Adaugă din îndreptar sau scrie mai sus.</Text>
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8F3' },
  fontBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF8E7', padding: 12, borderBottomWidth: 1, borderBottomColor: '#D4A373' },
  fontLabel: { fontFamily: 'Lora-Bold', color: '#5D2E0A' },
  fBtn: { backgroundColor: '#8B4513', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  fBtnT: { color: 'white', fontWeight: 'bold' },
  fValue: { marginHorizontal: 15, fontWeight: 'bold', color: '#5D2E0A' },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  
  // STIL TITLU MODIFICAT
  sectionTitle: { 
    fontFamily: 'Playfair-Bold', 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 30,      
    marginBottom: 20, 
    color: '#5D2E0A', 
    textTransform: 'uppercase' 
  },

  subTitle: { fontFamily: 'Lora-Bold', color: '#D4A373', textTransform: 'uppercase', letterSpacing: 1 },
  clearButton: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: '#FEE2E2' },
  clearButtonText: { fontSize: 10, fontFamily: 'Lora-Bold', color: '#DC2626' },
  selectedItemsContainer: { gap: 12, marginBottom: 20 },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#D4A373',
  },
  selectedItemInput: { flex: 1, color: '#2C2415', fontFamily: 'Lora', paddingVertical: 0 },
  removeButton: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#FFF1F1', justifyContent: 'center', alignItems: 'center' },
  customNoteInputContainer: { marginTop: 10, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 8,
    borderWidth: 1,
    borderColor: '#D4A373',
  },
  textInputNew: { flex: 1, fontFamily: 'Lora', color: '#2C2415', minHeight: 45, maxHeight: 120, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10 },
  sendButton: { backgroundColor: '#5D2E0A', width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  sendButtonDisabled: { backgroundColor: '#D4A373' },
  emptyState: { marginTop: 40, alignItems: 'center' },
  emptyStateText: { fontFamily: 'Lora', color: '#6B7280' },
  emptyStateSubtext: { fontFamily: 'Lora', fontStyle: 'italic', color: '#9CA3AF', marginTop: 5 },
});