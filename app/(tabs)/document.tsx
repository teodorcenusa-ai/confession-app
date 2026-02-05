import { useConfession } from '@/contexts/ConfessionContext';
import { Trash2, X } from 'lucide-react-native';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DocumentScreen() {
  const { selectedItems, removeItem, customText, setCustomText, clearItems } = useConfession();
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
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={handleClearAll}
            >
              <Trash2 size={18} color="#DC2626" strokeWidth={2} />
              <Text style={styles.clearButtonText}>Șterge tot</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedItems.length > 0 && (
          <View style={styles.selectedItemsContainer}>
            {selectedItems.map((item) => (
              <View key={item.id} style={styles.selectedItem}>
                <Text style={styles.selectedItemText}>• {item.text}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.id)}
                >
                  <X size={16} color="#DC2626" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <View style={styles.customTextSection}>
          <Text style={styles.sectionTitle}>Note Personale</Text>
          <TextInput
            style={styles.textInput}
            value={customText}
            onChangeText={setCustomText}
            placeholder="Scrie aici alte păcate sau detalii despre spovedanie..."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
          />
        </View>

        {selectedItems.length === 0 && !customText && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Folosește pagina &ldquo;Îndreptarul&rdquo; pentru a adăuga păcate din listă
            </Text>
            <Text style={styles.emptyStateSubtext}>
              sau scrie direct în secțiunea de note personale
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F3',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#8B4513',
    marginBottom: 12,
  },
  clearButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
  },
  clearButtonText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#DC2626',
  },
  selectedItemsContainer: {
    gap: 10,
    marginBottom: 28,
  },
  selectedItem: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 3,
    borderLeftColor: '#8B4513',
  },
  selectedItemText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#2C2415',
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  customTextSection: {
    marginTop: 12,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    lineHeight: 22,
    color: '#2C2415',
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyState: {
    marginTop: 60,
    alignItems: 'center' as const,
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6B7280',
    textAlign: 'center' as const,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    lineHeight: 20,
    color: '#9CA3AF',
    textAlign: 'center' as const,
  },
});
