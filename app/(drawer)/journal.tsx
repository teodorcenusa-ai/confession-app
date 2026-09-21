import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, usePathname } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Calendar,
  MapPin,
  BookOpen,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Menu,
  MoreVertical,
  X,
  CalendarDays,
} from 'lucide-react-native';
import { useConfession } from '../../contexts/ConfessionContext';

export default function JournalScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const pathname = usePathname();
  const isFocused = pathname.includes('journal');

  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    journalEntries,
    addJournalEntry,
    toggleCanonCompleted,
    deleteJournalEntry,
  } = useConfession();

  const [showFontSettings, setShowFontSettings] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Stări Formular
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [canon, setCanon] = useState('');
  const [notes, setNotes] = useState('');

  // Sincronizare Header
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
          <TouchableOpacity
            onPress={() => setShowFontSettings((prev) => !prev)}
            style={{ paddingVertical: 8, paddingHorizontal: 15 }}
          >
            <MoreVertical size={25} color="white" />
          </TouchableOpacity>
        ),
      });
    } else {
      setShowFontSettings(false);
    }
  }, [isFocused, showFontSettings, navigation]);

  // Formatare dată în română (ex: 21 Septembrie 2026)
  const formatDateString = (dateObj: Date) => {
    return dateObj.toLocaleDateString('ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSave = async () => {
    const formattedDate = formatDateString(selectedDate);

    await addJournalEntry({
      date: formattedDate,
      location,
      canon,
      notes,
      isCanonCompleted: false,
    });

    // Resetare formular
    setLocation('');
    setCanon('');
    setNotes('');
    setSelectedDate(new Date());
    setModalVisible(false);
  };

  const confirmDelete = (id: string) => {
    Alert.alert(
      'Șterge înregistrarea',
      'Ești sigur că vrei să ștergi această spovedanie din jurnal?',
      [
        { text: 'Anulează', style: 'cancel' },
        { text: 'Șterge', style: 'destructive', onPress: () => deleteJournalEntry(id) },
      ]
    );
  };

  const lastEntry = journalEntries[0];

  return (
    <View style={styles.container}>
      {/* Bara de reglare font */}
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

      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Card Ultima Spovedanie */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Ultima Spovedanie</Text>
          {lastEntry ? (
            <View>
              <View style={styles.infoRow}>
                <Calendar size={18} color="#8B4513" />
                <Text style={[styles.summaryText, { fontSize }]}>{lastEntry.date}</Text>
              </View>
              {lastEntry.location ? (
                <View style={styles.infoRow}>
                  <MapPin size={18} color="#8B4513" />
                  <Text style={[styles.summaryText, { fontSize }]}>{lastEntry.location}</Text>
                </View>
              ) : null}
            </View>
          ) : (
            <Text style={[styles.emptyText, { fontSize }]}>
              Nu ai nicio spovedanie înregistrată încă.
            </Text>
          )}
        </View>

        <Text style={[styles.sectionTitle, { fontSize: fontSize + 2 }]}>Istoric Spovedanii</Text>

        {/* Lista cu toate spovedaniile */}
        {journalEntries.map((entry) => (
          <View key={entry.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.infoRow}>
                <Calendar size={18} color="#5D2E0A" />
                <Text style={[styles.cardDate, { fontSize: fontSize + 1 }]}>{entry.date}</Text>
              </View>
              <TouchableOpacity onPress={() => confirmDelete(entry.id)}>
                <Trash2 size={18} color="#A30000" />
              </TouchableOpacity>
            </View>

            {entry.location ? (
              <View style={styles.infoRow}>
                <MapPin size={16} color="#8B4513" />
                <Text style={[styles.cardSubText, { fontSize }]}>{entry.location}</Text>
              </View>
            ) : null}

            {entry.canon ? (
              <View style={styles.canonBox}>
                <Text style={[styles.boxLabel, { fontSize: fontSize - 1 }]}>Canon primit:</Text>
                <Text style={[styles.boxContent, { fontSize }]}>{entry.canon}</Text>

                <TouchableOpacity
                  style={styles.canonToggle}
                  onPress={() => toggleCanonCompleted(entry.id)}
                >
                  {entry.isCanonCompleted ? (
                    <CheckCircle2 size={20} color="#2E7D32" />
                  ) : (
                    <Circle size={20} color="#8B4513" />
                  )}
                  <Text
                    style={[
                      styles.canonToggleText,
                      { fontSize: fontSize - 1 },
                      entry.isCanonCompleted && styles.completedText,
                    ]}
                  >
                    {entry.isCanonCompleted ? 'Canon împlinit' : 'Marchează ca împlinit'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {entry.notes ? (
              <View style={styles.notesBox}>
                <View style={styles.infoRow}>
                  <BookOpen size={16} color="#8B4513" />
                  <Text style={[styles.boxLabel, { fontSize: fontSize - 1 }]}>
                    Notițe / Recomandări:
                  </Text>
                </View>
                <Text style={[styles.boxContent, { fontSize }]}>{entry.notes}</Text>
              </View>
            ) : null}
          </View>
        ))}
      </ScrollView>

      {/* Buton Adăugare (FAB) */}
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 20 }]}
        onPress={() => setModalVisible(true)}
      >
        <Plus size={28} color="white" />
      </TouchableOpacity>

      {/* Modal Adăugare Spovedanie */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adaugă Spovedanie</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color="#5D2E0A" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Selector dată interactiv */}
              <Text style={styles.inputLabel}>Data spovedaniei:</Text>
              <View style={styles.datePickerContainer}>
                <TouchableOpacity
                  style={styles.dateSelectorBtn}
                  onPress={() => setShowDatePicker(true)}
                >
                  <CalendarDays size={20} color="#8B4513" />
                  <Text style={styles.dateSelectorText}>{formatDateString(selectedDate)}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.todayBtn}
                  onPress={() => setSelectedDate(new Date())}
                >
                  <Text style={styles.todayBtnText}>Azi</Text>
                </TouchableOpacity>
              </View>

              {/* Afișare calendar nativ */}
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}

              {Platform.OS === 'ios' && showDatePicker && (
                <TouchableOpacity
                  style={styles.closeDatePickerBtn}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={styles.closeDatePickerText}>Confirmă data</Text>
                </TouchableOpacity>
              )}

              <Text style={styles.inputLabel}>Locul / Biserica / Duhovnicul:</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="ex: Mănăstirea Putna / Părintele..."
              />

              <Text style={styles.inputLabel}>Canon primit:</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={canon}
                onChangeText={setCanon}
                placeholder="ex: Rugăciunea de seară + 10 metanii"
                multiline
                numberOfLines={3}
              />

              <Text style={styles.inputLabel}>Notițe / Sfaturi duhovnicești:</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Recomandări de lectură, gânduri..."
                multiline
                numberOfLines={3}
              />

              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>Salvează în Jurnal</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8F3' },
  fontBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF8E7',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D4A373',
  },
  fontLabel: { fontFamily: 'Lora-Bold', color: '#5D2E0A' },
  fBtn: { backgroundColor: '#8B4513', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  fBtnT: { color: 'white', fontWeight: 'bold' },
  fValue: { marginHorizontal: 15, fontWeight: 'bold', color: '#5D2E0A' },

  summaryCard: {
    backgroundColor: '#FFF8E7',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D4A373',
    marginBottom: 20,
  },
  summaryTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 10,
  },
  summaryText: { fontFamily: 'Lora-Bold', color: '#5D2E0A', marginLeft: 8 },
  emptyText: { fontFamily: 'Lora', color: '#777', fontStyle: 'italic' },

  sectionTitle: {
    fontFamily: 'Playfair-Bold',
    fontWeight: 'bold',
    color: '#5D2E0A',
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardDate: { fontFamily: 'Playfair-Bold', fontWeight: 'bold', color: '#5D2E0A', marginLeft: 8 },
  cardSubText: { fontFamily: 'Lora', color: '#666', marginLeft: 8, marginBottom: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },

  canonBox: {
    backgroundColor: '#FAF8F3',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#8B4513',
    marginTop: 8,
  },
  notesBox: {
    backgroundColor: '#FAF8F3',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#D4A373',
    marginTop: 8,
  },
  boxLabel: { fontFamily: 'Lora-Bold', color: '#8B4513', marginBottom: 2 },
  boxContent: { fontFamily: 'Lora', color: '#2C2415' },

  canonToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  canonToggleText: { fontFamily: 'Lora-Bold', color: '#8B4513', marginLeft: 8 },
  completedText: { color: '#2E7D32', textDecorationLine: 'line-through' },

  fab: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#8B4513',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  // Selector dată
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  dateSelectorBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D4A373',
    borderRadius: 8,
    padding: 12,
  },
  dateSelectorText: {
    fontFamily: 'Lora-Bold',
    color: '#5D2E0A',
    marginLeft: 10,
    fontSize: 15,
  },
  todayBtn: {
    backgroundColor: '#D4A373',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  todayBtnText: {
    color: 'white',
    fontFamily: 'Lora-Bold',
    fontWeight: 'bold',
  },
  closeDatePickerBtn: {
    backgroundColor: '#8B4513',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  closeDatePickerText: { color: 'white', fontWeight: 'bold' },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FAF8F3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: { fontFamily: 'Playfair-Bold', fontSize: 20, fontWeight: 'bold', color: '#5D2E0A' },
  inputLabel: { fontFamily: 'Lora-Bold', color: '#5D2E0A', marginTop: 10, marginBottom: 4 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D4A373',
    borderRadius: 8,
    padding: 10,
    fontFamily: 'Lora',
    color: '#2C2415',
  },
  textArea: { height: 70, textAlignVertical: 'top' },
  saveBtn: {
    backgroundColor: '#8B4513',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  saveBtnText: { color: 'white', fontFamily: 'Lora-Bold', fontWeight: 'bold', fontSize: 16 },
});