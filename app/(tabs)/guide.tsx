import { CONFESSION_GUIDE } from '@/constants/confessionItems';
import { useConfession } from '@/contexts/ConfessionContext';
import { Plus } from 'lucide-react-native';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GuideScreen() {
  const { addItem, selectedItems } = useConfession();
  const insets = useSafeAreaInsets();

  const handleAddItem = (id: string, text: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    addItem({ id, text });
  };

  const isSelected = (id: string) => {
    return selectedItems.some((item) => item.id === id);
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
        {CONFESSION_GUIDE.map((category) => (
          <View key={category.id} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <View style={styles.itemsContainer}>
              {category.items.map((item) => {
                const selected = isSelected(item.id);
                return (
                  <View key={item.id} style={styles.itemRow}>
                    <Text style={[styles.itemText, selected && styles.itemTextSelected]}>
                      {item.text}
                    </Text>
                    <TouchableOpacity
                      style={[styles.addButton, selected && styles.addButtonSelected]}
                      onPress={() => handleAddItem(item.id, item.text)}
                      disabled={selected}
                    >
                      <Plus 
                        size={18} 
                        color={selected ? '#9CA3AF' : '#8B4513'} 
                        strokeWidth={2.5}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
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
  categoryContainer: {
    marginBottom: 28,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: '#8B4513',
    marginBottom: 16,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
  itemsContainer: {
    gap: 12,
  },
  itemRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#2C2415',
    letterSpacing: 0.1,
  },
  itemTextSelected: {
    color: '#9CA3AF',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFF8E7',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: '#D4A373',
  },
  addButtonSelected: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
});
