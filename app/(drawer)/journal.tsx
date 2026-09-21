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
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, usePathname } from 'expo-router';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  Bell,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import { useConfession } from '../../contexts/ConfessionContext';

// Importăm funcțiile din notifications.ts
import { scheduleCanonReminder, cancelCanonReminder } from '../../services/notifications';

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

  // Stare pentru cardurile extinse (reține ID-urile cardurilor deschise)
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>({});

  // Stări Formular Modal Spovedanie
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [canon, setCanon] = useState('');
  const [canonDays, setCanonDays] = useState('40'); // Valoare implicită 40 zile
  const [notes, setNotes] = useState('');

  // Stări Notificare (Sincronizate cu AsyncStorage)
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('21:00');

  // Stare pentru Selectorul de Oră Notificare
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminderDateObj, setReminderDateObj] = useState(() => {
    const d = new Date();
    d.setHours(21, 0, 0, 0);
    return d;
  });

  // Separare: Ultima spovedanie (sus) și Istoricul (restul, jos)
  const lastEntry = journalEntries[0];
  const previousEntries = journalEntries.slice(1);

  // Implicit, deschidem automat ultimul card adăugat
  useEffect(() => {
    if (lastEntry && expandedCardIds[lastEntry.id] === undefined) {
      setExpandedCardIds((prev) => ({ ...prev, [lastEntry.id]: true }));
    }
  }, [lastEntry?.id]);

  // Funcție de comutare extindere/pliere card
  const toggleCardExpansion = (id: string) => {
    setExpandedCardIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Încărcarea setărilor de notificare salvate la deschiderea ecranului
  useEffect(() => {
    loadNotificationSettings();
  }, []);

  const loadNotificationSettings = async () => {
    try {
      const savedEnabled = await AsyncStorage.getItem('@canon_reminder_enabled');
      const savedTime = await AsyncStorage.getItem('@canon_reminder_time');
      if (savedEnabled !== null) setReminderEnabled(JSON.parse(savedEnabled));
      if (savedTime !== null) {
        setReminderTime(savedTime);
        const [h, m] = savedTime.split(':').map(Number);
        if (!isNaN(h) && !isNaN(m)) {
          const d = new Date();
          d.setHours(h, m, 0, 0);
          setReminderDateObj(d);
        }
      }
    } catch (e) {
      console.error('Eroare la încărcarea setărilor de notificare:', e);
    }
  };

  const saveNotificationSettings = async (enabled: boolean, time: string) => {
    try {
      await AsyncStorage.setItem('@canon_reminder_enabled', JSON.stringify(enabled));
      await AsyncStorage.setItem('@canon_reminder_time', time);
    } catch (e) {
      console.error('Eroare la salvarea setărilor de notificare:', e);
    }
  };

  const handleToggleReminder = async (value: boolean) => {
    setReminderEnabled(value);
    await saveNotificationSettings(value, reminderTime);

    if (value) {
      const [h, m] = reminderTime.split(':').map(Number);
      const currentCanon = lastEntry?.canon || '';
      const success = await scheduleCanonReminder(h || 21, m || 0, currentCanon);
      if (!success) {
        setReminderEnabled(false);
        await saveNotificationSettings(false, reminderTime);
      }
    } else {
      await cancelCanonReminder();
    }
  };

  const handleTimeChange = async (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }

    if (date) {
      setReminderDateObj(date);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const newTimeString = `${hours}:${minutes}`;

      setReminderTime(newTimeString);
      await saveNotificationSettings(reminderEnabled, newTimeString);

      if (reminderEnabled) {
        const currentCanon = lastEntry?.canon || '';
        await scheduleCanonReminder(date.getHours(), date.getMinutes(), currentCanon);
      }
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

  const formatDateString = (dateObj: Date) => {
    return dateObj.toLocaleDateString('ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSave = async () => {
    const formattedDate = formatDateString(selectedDate);
    const parsedDays = parseInt(canonDays, 10) || 40;

    await addJournalEntry({
      date: formattedDate,
      location,
      canon,
      canonDays: parsedDays,
      rawDate: selectedDate.toISOString(),
      notes,
      isCanonCompleted: false,
    });

    if (reminderEnabled && canon.trim() !== '') {
      const [h, m] = reminderTime.split(':').map(Number);
      await scheduleCanonReminder(h || 21, m || 0, canon);
    }

    setLocation('');
    setCanon('');
    setCanonDays('40');
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

  const calculateProgress = (entry: any) => {
    if (!entry.rawDate || !entry.canonDays) return null;
    const start = new Date(entry.rawDate);
    const now = new Date();

    start.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffTime = now.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const totalDays = entry.canonDays;

    if (diffDays < 1) return `Urmează să înceapă (Total: ${totalDays} zile)`;
    if (diffDays > totalDays) return `Perioadă finalizată (${totalDays}/${totalDays} zile)`;

    return `Ziua ${diffDays} din ${totalDays}`;
  };

  // Componentă reutilizabilă pentru afișarea unui card de spovedanie
  const renderEntryCard = (entry: any, isMainCard: boolean = false) => {
    const isExpanded = !!expandedCardIds[entry.id];

    return (
      <View
        key={entry.id}
        style={[
          styles.card,
          isMainCard && styles.summaryCard,
        ]}
      >
        {/* Antetul Cardului (Apasă oriunde pe el pentru extindere) */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => toggleCardExpansion(entry.id)}
          style={styles.cardHeaderPressable}
        >
          <View style={styles.cardHeaderLeft}>
            <View style={styles.infoRow}>
              <Calendar size={18} color="#8B4513" />
              <Text style={[styles.cardDate, { fontSize: fontSize + 1 }]}>
                {entry.date}
              </Text>
            </View>

            {entry.location ? (
              <View style={styles.infoRow}>
                <MapPin size={15} color="#8B4513" />
                <Text style={[styles.cardSubText, { fontSize: fontSize - 1 }]}>
                  {entry.location}
                </Text>
              </View>
            ) : null}
          </View>

          <View style={styles.cardHeaderRight}>
            <TouchableOpacity
              onPress={() => confirmDelete(entry.id)}
              style={styles.actionBtn}
            >
              <Trash2 size={18} color="#A30000" />
            </TouchableOpacity>

            <View style={styles.chevronIcon}>
              {isExpanded ? (
                <ChevronUp size={22} color="#8B4513" />
              ) : (
                <ChevronDown size={22} color="#8B4513" />
              )}
            </View>
          </View>
        </TouchableOpacity>

        {/* Conținutul Extins (Vizibil doar dacă isExpanded === true) */}
        {isExpanded && (
          <View style={styles.expandedContent}>
            {entry.canon ? (
              <View style={styles.canonBox}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={[styles.boxLabel, { fontSize: fontSize - 1 }]}>
                    Canon primit:
                  </Text>
                  {entry.canonDays ? (
                    <Text style={[styles.durationBadgeText, { fontSize: fontSize - 2 }]}>
                      {calculateProgress(entry)}
                    </Text>
                  ) : null}
                </View>
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
                    Notițe / Sfaturi duhovnicești:
                  </Text>
                </View>
                <Text style={[styles.boxContent, { fontSize }]}>{entry.notes}</Text>
              </View>
            ) : null}
          </View>
        )}
      </View>
    );
  };

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
        {/* CARD SUS: Ultima Spovedanie */}
        <Text style={[styles.sectionTitle, { fontSize: fontSize + 2 }]}>Ultima Spovedanie</Text>
        {lastEntry ? (
          renderEntryCard(lastEntry, true)
        ) : (
          <View style={styles.summaryCard}>
            <Text style={[styles.emptyText, { fontSize }]}>
              Nu ai nicio spovedanie înregistrată încă.
            </Text>
          </View>
        )}

        {/* CĂSUȚĂ PERMANENTĂ: Setări Notificare Canon */}
        <View style={styles.globalReminderCard}>
          <View style={styles.reminderHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Bell size={20} color="#8B4513" style={{ marginRight: 8 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.reminderTitle}>Notificare zilnică pentru canon</Text>
                <Text style={styles.reminderSubtitle}>
                  {reminderEnabled
                    ? `Setată la ora ${reminderTime}`
                    : 'Apasă pentru a primi un reminder zilnic'}
                </Text>
                {reminderEnabled && lastEntry?.canon ? (
                  <Text style={styles.activeCanonBadge}>
                    Canon curent: {lastEntry.canon}
                  </Text>
                ) : null}
              </View>
            </View>
            <Switch
              trackColor={{ false: '#D1C7BD', true: '#8B4513' }}
              thumbColor={reminderEnabled ? '#FFF8E7' : '#f4f3f4'}
              onValueChange={handleToggleReminder}
              value={reminderEnabled}
            />
          </View>

          {reminderEnabled && (
            <View style={styles.timeRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Clock size={16} color="#8B4513" style={{ marginRight: 6 }} />
                <Text style={styles.timeLabel}>Ora notificării:</Text>
              </View>

              <TouchableOpacity
                style={styles.timePickerButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Clock size={14} color="#8B4513" style={{ marginRight: 4 }} />
                <Text style={styles.timePickerButtonText}>{reminderTime}</Text>
              </TouchableOpacity>
            </View>
          )}

          {showTimePicker && (
            <DateTimePicker
              value={reminderDateObj}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
            />
          )}

          {Platform.OS === 'ios' && showTimePicker && (
            <TouchableOpacity
              style={styles.closeDatePickerBtn}
              onPress={() => setShowTimePicker(false)}
            >
              <Text style={styles.closeDatePickerText}>Confirmă ora</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* SECȚIUNEA JOS: Istoric Spovedanii Anterioare */}
        <Text style={[styles.sectionTitle, { fontSize: fontSize + 2 }]}>Istoric Spovedanii</Text>

        {previousEntries.length > 0 ? (
          previousEntries.map((entry) => renderEntryCard(entry, false))
        ) : (
          <Text style={[styles.emptyHistoryText, { fontSize: fontSize - 1 }]}>
            {lastEntry
              ? 'Spovedaniile anterioare vor apărea aici când adaugi o nouă spovedanie.'
              : 'Nicio spovedanie anterioară.'}
          </Text>
        )}
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

              <Text style={styles.inputLabel}>Durata canonului (în zile):</Text>
              <TextInput
                style={styles.input}
                value={canonDays}
                onChangeText={setCanonDays}
                placeholder="ex: 40"
                keyboardType="numeric"
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

  sectionTitle: {
    fontFamily: 'Playfair-Bold',
    fontWeight: 'bold',
    color: '#5D2E0A',
    marginBottom: 10,
    marginTop: 6,
  },

  summaryCard: {
    backgroundColor: '#FFF8E7',
    borderColor: '#D4A373',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardHeaderPressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  cardHeaderLeft: { flex: 1 },
  cardHeaderRight: { flexDirection: 'row', alignItems: 'center' },

  actionBtn: { padding: 6, marginRight: 4 },
  chevronIcon: { padding: 2 },

  cardDate: { fontFamily: 'Playfair-Bold', fontWeight: 'bold', color: '#5D2E0A', marginLeft: 8 },
  cardSubText: { fontFamily: 'Lora', color: '#666', marginLeft: 8, marginTop: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'center' },

  expandedContent: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: '#F3E5D8',
    paddingTop: 8,
  },

  emptyText: { fontFamily: 'Lora', color: '#777', fontStyle: 'italic', padding: 14 },
  emptyHistoryText: {
    fontFamily: 'Lora',
    color: '#8C7A6B',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },

  durationBadgeText: {
    fontFamily: 'Lora',
    color: '#8C7A6B',
    fontStyle: 'italic',
  },

  globalReminderCard: {
    backgroundColor: '#FFF8E7',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D4A373',
    marginVertical: 14,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5D2E0A',
  },
  reminderSubtitle: {
    fontFamily: 'Lora',
    fontSize: 12,
    color: '#8C7A6B',
    marginTop: 2,
  },
  activeCanonBadge: {
    fontFamily: 'Lora-Bold',
    fontSize: 12,
    color: '#8B4513',
    marginTop: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E6D2C1',
  },
  timeLabel: { fontFamily: 'Lora', color: '#5D2E0A', fontSize: 13 },

  timePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D4A373',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  timePickerButtonText: {
    fontFamily: 'Lora-Bold',
    color: '#8B4513',
    fontSize: 14,
    fontWeight: 'bold',
  },

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
    marginTop: 5,
  },
  closeDatePickerText: { color: 'white', fontWeight: 'bold' },

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