import React, { useState, useMemo, useEffect } from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Plus, Check, Search, X, MoreVertical, Menu } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, usePathname } from 'expo-router';
import { CONFESSION_GUIDE, CONFESSION_GUIDE_KIDS } from '../../constants/confessionItems';
import { useConfession } from '../../contexts/ConfessionContext';

export default function GuideScreen() {
  const { 
    addItem, 
    removeItem, 
    selectedItems, 
    fontSize, 
    increaseFontSize, 
    decreaseFontSize 
  } = useConfession();
  
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const pathname = usePathname();
  
  const isFocused = pathname.includes('guide');
  
  const [mode, setMode] = useState<'adulti' | 'copii'>('adulti');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
        headerTitle: isSearching ? () => (
          <TextInput
            placeholder="Caută..."
            placeholderTextColor="#D1D5DB"
            style={{ color: 'white', fontSize: 18, width: 200, fontFamily: 'Lora' }}
            autoFocus
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        ) : "Taina Spovedaniei",
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity 
              onPress={() => {
                if (isSearching) {
                  // AICI ESTE REPARAȚIA: Când apeși pe X, ștergem și textul de căutare
                  setSearchQuery('');
                  setIsSearching(false);
                } else {
                  setIsSearching(true);
                  setShowFontSettings(false);
                }
              }} 
              style={{ padding: 8 }}
            >
              {isSearching ? <X size={22} color="white" /> : <Search size={25} color="white" />}
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
      setSearchQuery(''); // Curăță textul de căutare și când pleci de pe pagină
    }
  }, [isFocused, isSearching, searchQuery, showFontSettings, navigation]);

  const filteredGuide = useMemo(() => {
    const base = mode === 'copii' ? CONFESSION_GUIDE_KIDS : CONFESSION_GUIDE;
    if (!searchQuery.trim()) return base;
    return base.map(c => ({
      ...c,
      items: c.items.filter(i => i.text.toLowerCase().includes(searchQuery.toLowerCase()))
    })).filter(c => c.items.length > 0);
  }, [mode, searchQuery]);

  // Funcție ajutătoare pentru adăugare/eliminare
  const handleToggleItem = (item: { id: string; text: string }, isSelected: boolean) => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          onPress={() => setMode('adulti')} 
          style={[styles.tab, mode === 'adulti' && styles.activeTab]}
        >
          <Text style={[styles.tabT, mode === 'adulti' && styles.activeTabT]}>Adulți</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setMode('copii')} 
          style={[styles.tab, mode === 'copii' && styles.activeTab]}
        >
          <Text style={[styles.tabT, mode === 'copii' && styles.activeTabT]}>Copii</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 40 }}
      >
        {filteredGuide.map((cat) => (
          <View key={cat.id} style={{ marginBottom: 25 }}>
            <Text style={styles.catTitle}>{cat.title}</Text>
            {cat.items.map((item) => {
              const sel = selectedItems.some(i => i.id === item.id);
              return (
                <TouchableOpacity 
                  key={item.id} 
                  style={[styles.itemCard, sel && styles.itemCardSel]}
                  onPress={() => handleToggleItem(item, sel)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.itemText, { fontSize: fontSize }, sel && styles.selText]}>
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
  container: { flex: 1, backgroundColor: '#FAF8F3' },
  fontBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF8E7', padding: 12, borderBottomWidth: 1, borderBottomColor: '#D4A373' },
  fontLabel: { fontFamily: 'Lora-Bold', color: '#5D2E0A' },
  fBtn: { backgroundColor: '#8B4513', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  fBtnT: { color: 'white', fontWeight: 'bold' },
  fValue: { marginHorizontal: 15, fontWeight: 'bold', color: '#5D2E0A' },
  tabContainer: { flexDirection: 'row', padding: 15, justifyContent: 'center' },
  tab: { paddingVertical: 10, paddingHorizontal: 40, borderRadius: 12, borderWidth: 1, borderColor: '#D4A373', marginHorizontal: 10 },
  activeTab: { backgroundColor: '#5D2E0A', borderColor: '#5D2E0A' },
  tabT: { color: '#D4A373', fontWeight: 'bold' },
  activeTabT: { color: '#FFF' },
  catTitle: { fontSize: 18, fontWeight: 'bold', color: '#5D2E0A', marginBottom: 15, textAlign: 'center' },
  itemCard: { flexDirection: 'row', backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 10, alignItems: 'center', elevation: 2 },
  itemCardSel: { backgroundColor: '#F5EBE1', borderColor: '#D4A373', borderWidth: 1 },
  itemText: { flex: 1, color: '#2C2415', lineHeight: 24 },
  selText: { color: '#8C7A6B', textDecorationLine: 'line-through' },
  addB: { padding: 5, borderRadius: 8, backgroundColor: '#FFF8E7', marginLeft: 10 },
  addBSel: { backgroundColor: '#E6D2C1' }
});