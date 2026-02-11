import { CONFESSION_GUIDE, CONFESSION_GUIDE_KIDS } from '../../constants/confessionItems';
import { useConfession } from '../../contexts/ConfessionContext';
import { Plus } from 'lucide-react-native';
import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GuideScreen() {
  const { addItem, selectedItems } = useConfession();
  const insets = useSafeAreaInsets();
  
  // Începem direct cu un mod selectat pentru a evita ecranul gol
  const [mode, setMode] = useState<'adulti' | 'copii'>('adulti');

  const handleAddItem = (id: string, text: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    addItem({ id, text });
  };

  const isSelected = (id: string) => {
    return selectedItems.some((item) => item.id === id);
  };

  const currentGuide = mode === 'copii' ? CONFESSION_GUIDE_KIDS : CONFESSION_GUIDE;

  return (
    <View style={styles.container}>
      {/* --- TAB-URILE DE SUS --- */}
      <View style={[styles.tabsContainer, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity 
          style={[styles.tab, mode === 'adulti' ? styles.activeTab : styles.inactiveTab]} 
          onPress={() => setMode('adulti')}
        >
          <Text style={[styles.tabText, mode === 'adulti' ? styles.activeTabText : styles.inactiveTabText]}>
            Îndreptar Adulți
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, mode === 'copii' ? styles.activeTab : styles.inactiveTab]} 
          onPress={() => setMode('copii')}
        >
          <Text style={[styles.tabText, mode === 'copii' ? styles.activeTabText : styles.inactiveTabText]}>
            Îndreptar Copii
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 40 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {currentGuide.map((category) => (
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
                        size={20} 
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    backgroundColor: '#FAF8F3',
    paddingBottom: 20,
    gap: 20,
  },

  tab: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
  },

  activeTab: {
    backgroundColor: '#5D2E0A',
    borderColor: '#5D2E0A',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  inactiveTab: {
    backgroundColor: 'transparent',
    borderColor: '#D4A373',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Lora-Bold',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  inactiveTabText: {
    color: '#D4A373',
  },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20 },
  categoryContainer: { marginBottom: 30 },
  categoryTitle: { 
    fontSize: 18, 
    fontFamily: 'Playfair-Bold', 
    color: '#5D2E0A', 
    marginBottom: 15, 
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  itemsContainer: { gap: 10 },
  itemRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemText: { flex: 1, fontSize: 16, fontFamily: 'Lora', color: '#2C2415' },
  // AICI ERA EROAREA: am reparat 'line-through'
  itemTextSelected: { color: '#9CA3AF', textDecorationLine: 'line-through' }, 
  addButton: { 
    width: 30, 
    height: 30, 
    borderRadius: 10, 
    backgroundColor: '#FFF8E7', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#D4A373' 
  },
  addButtonSelected: { backgroundColor: '#F3F4F6', borderColor: '#E5E7EB' },
});