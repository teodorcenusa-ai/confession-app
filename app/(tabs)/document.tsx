import { useConfession } from '../../contexts/ConfessionContext';
import { Trash2, X, Send } from 'lucide-react-native';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DocumentScreen() {
  const { selectedItems, removeItem, updateItem, customText, setCustomText, clearItems, addItem } = useConfession();
  const insets = useSafeAreaInsets();

  const handleRemoveItem = (id: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    removeItem(id);
  };

  const handleClearAll = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    clearItems();
  };

  const handleAddCustomNote = () => {
    if (customText.trim().length === 0) return;

    const newNote = {
      id: `custom-${Date.now()}`,
      text: customText.trim()
    };

    addItem(newNote);
    setCustomText('');
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 40 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {selectedItems.length > 0 && (
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>Păcatele Mele</Text>
            <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
              <Trash2 size={16} color="#DC2626" strokeWidth={2} />
              <Text style={styles.clearButtonText}>Șterge tot</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.selectedItemsContainer}>
          {selectedItems.map((item) => (
            <View key={item.id} style={styles.selectedItem}>
              <TextInput
                style={styles.selectedItemInput}
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
 	 selectedItems.length === 0 && { borderTopWidth: 0, marginTop: 0 } 
	]}>
          <Text style={styles.sectionTitle}>Adaugă Notă Nouă</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInputNew}
              value={customText}
              onChangeText={setCustomText}
              placeholder="Scrie aici un păcat sau o notă..."
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
            <Text style={styles.emptyStateText}>Lista este goală.</Text>
            <Text style={styles.emptyStateSubtext}>Adaugă din îndreptar sau scrie mai sus.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8F3' },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 0 },
  sectionTitle: { fontSize: 20, fontFamily: 'Playfair-Bold',textAlign: 'center', marginBottom: 20, color: '#5D2E0A' },
  clearButton: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: '#FEE2E2' },
  clearButtonText: { fontSize: 12, fontFamily: 'Lora-Bold', color: '#DC2626', textTransform: 'uppercase' },
  selectedItemsContainer: { gap: 12, marginBottom: 20 },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#D4A373',
  },
  selectedItemInput: { flex: 1, fontSize: 16, lineHeight: 24, color: '#2C2415', fontFamily: 'Lora', paddingVertical: 0 },
  removeButton: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#FFF1F1', justifyContent: 'center', alignItems: 'center' },
  customNoteInputContainer: { marginTop: 10, paddingTop: 25, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
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
  textInputNew: { flex: 1, fontFamily: 'Lora', fontSize: 16, color: '#2C2415', minHeight: 45, maxHeight: 120, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10 },
  sendButton: { backgroundColor: '#5D2E0A', width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  sendButtonDisabled: { backgroundColor: '#D4A373' },
  emptyState: { marginTop: 60, alignItems: 'center' },
  emptyStateText: { fontSize: 16, fontFamily: 'Lora', color: '#6B7280' },
  emptyStateSubtext: { fontSize: 14, fontFamily: 'Lora', fontStyle: 'italic', color: '#9CA3AF' },
});