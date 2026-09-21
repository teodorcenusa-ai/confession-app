import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SelectedItem {
  id: string;
  text: string;
}

export interface ConfessionEntry {
  id: string;
  date: string;
  location?: string;
  canon?: string;
  isCanonCompleted: boolean;
  notes?: string;
}

interface ConfessionContextType {
  selectedItems: SelectedItem[];
  customText: string;
  fontSize: number;
  setCustomText: (text: string) => void;
  addItem: (item: SelectedItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, newText: string) => void;
  clearItems: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;

  // Jurnal Spovedanie
  journalEntries: ConfessionEntry[];
  addJournalEntry: (entry: Omit<ConfessionEntry, 'id'>) => Promise<void>;
  toggleCanonCompleted: (id: string) => Promise<void>;
  deleteJournalEntry: (id: string) => Promise<void>;
}

const JOURNAL_STORAGE_KEY = '@confession_journal_entries';
const SELECTED_ITEMS_KEY = '@confession_selected_items';
const CUSTOM_TEXT_KEY = '@confession_custom_text';
const FONT_SIZE_KEY = '@confession_font_size';

const ConfessionContext = createContext<ConfessionContextType | undefined>(undefined);

export function ConfessionProvider({ children }: { children: React.ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [customText, setCustomTextState] = useState<string>('');
  const [fontSize, setFontSizeState] = useState<number>(18);
  const [journalEntries, setJournalEntries] = useState<ConfessionEntry[]>([]);

  // 1. Încărcarea tuturor datelor din AsyncStorage la pornire
  useEffect(() => {
    async function loadStoredData() {
      try {
        const [storedJournal, storedItems, storedText, storedFont] = await Promise.all([
          AsyncStorage.getItem(JOURNAL_STORAGE_KEY),
          AsyncStorage.getItem(SELECTED_ITEMS_KEY),
          AsyncStorage.getItem(CUSTOM_TEXT_KEY),
          AsyncStorage.getItem(FONT_SIZE_KEY),
        ]);

        if (storedJournal) setJournalEntries(JSON.parse(storedJournal));
        if (storedItems) setSelectedItems(JSON.parse(storedItems));
        if (storedText !== null) setCustomTextState(storedText);
        if (storedFont) setFontSizeState(Number(storedFont));
      } catch (e) {
        console.error('Eroare la încărcarea datelor salvate:', e);
      }
    }
    loadStoredData();
  }, []);

  // --- LOGICĂ JURNAL ---
  const saveJournalEntries = useCallback(async (entries: ConfessionEntry[]) => {
    try {
      await AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
      setJournalEntries(entries);
    } catch (e) {
      console.error('Eroare la salvarea jurnalului:', e);
    }
  }, []);

  const addJournalEntry = useCallback(async (entryData: Omit<ConfessionEntry, 'id'>) => {
    const newEntry: ConfessionEntry = {
      ...entryData,
      id: Date.now().toString(),
    };
    setJournalEntries((prev) => {
      const updated = [newEntry, ...prev];
      AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updated)).catch((e) =>
        console.error('Eroare la salvarea jurnalului:', e)
      );
      return updated;
    });
  }, []);

  const toggleCanonCompleted = useCallback(async (id: string) => {
    setJournalEntries((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, isCanonCompleted: !item.isCanonCompleted } : item
      );
      AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updated)).catch((e) =>
        console.error('Eroare la salvarea jurnalului:', e)
      );
      return updated;
    });
  }, []);

  const deleteJournalEntry = useCallback(async (id: string) => {
    setJournalEntries((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updated)).catch((e) =>
        console.error('Eroare la salvarea jurnalului:', e)
      );
      return updated;
    });
  }, []);

  // --- LOGICĂ PĂCATE SELECTATE (PERSISTENTĂ) ---
  const addItem = useCallback((item: SelectedItem) => {
    setSelectedItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      const updated = [...prev, item];
      AsyncStorage.setItem(SELECTED_ITEMS_KEY, JSON.stringify(updated)).catch((e) =>
        console.error('Eroare la salvarea păcatelor selectate:', e)
      );
      return updated;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setSelectedItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      AsyncStorage.setItem(SELECTED_ITEMS_KEY, JSON.stringify(updated)).catch((e) =>
        console.error('Eroare la eliminarea păcatului:', e)
      );
      return updated;
    });
  }, []);

  const updateItem = useCallback((id: string, newText: string) => {
    setSelectedItems((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, text: newText } : item));
      AsyncStorage.setItem(SELECTED_ITEMS_KEY, JSON.stringify(updated)).catch((e) =>
        console.error('Eroare la actualizarea păcatului:', e)
      );
      return updated;
    });
  }, []);

  const clearItems = useCallback(() => {
    setSelectedItems([]);
    setCustomTextState('');
    AsyncStorage.removeItem(SELECTED_ITEMS_KEY).catch((e) =>
      console.error('Eroare la curățarea păcatelor:', e)
    );
    AsyncStorage.removeItem(CUSTOM_TEXT_KEY).catch((e) =>
      console.error('Eroare la curățarea textului personalizat:', e)
    );
  }, []);

  const setCustomText = useCallback((text: string) => {
    setCustomTextState(text);
    AsyncStorage.setItem(CUSTOM_TEXT_KEY, text).catch((e) =>
      console.error('Eroare la salvarea textului personalizat:', e)
    );
  }, []);

  const increaseFontSize = useCallback(() => {
    setFontSizeState((prev) => {
      const newSize = prev < 34 ? prev + 2 : prev;
      AsyncStorage.setItem(FONT_SIZE_KEY, newSize.toString()).catch((e) =>
        console.error('Eroare la salvarea dimensiunii fontului:', e)
      );
      return newSize;
    });
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSizeState((prev) => {
      const newSize = prev > 14 ? prev - 2 : prev;
      AsyncStorage.setItem(FONT_SIZE_KEY, newSize.toString()).catch((e) =>
        console.error('Eroare la salvarea dimensiunii fontului:', e)
      );
      return newSize;
    });
  }, []);

  const value = useMemo(
    () => ({
      selectedItems,
      customText,
      fontSize,
      setCustomText,
      addItem,
      removeItem,
      updateItem,
      clearItems,
      increaseFontSize,
      decreaseFontSize,
      journalEntries,
      addJournalEntry,
      toggleCanonCompleted,
      deleteJournalEntry,
    }),
    [
      selectedItems,
      customText,
      fontSize,
      setCustomText,
      addItem,
      removeItem,
      updateItem,
      clearItems,
      increaseFontSize,
      decreaseFontSize,
      journalEntries,
      addJournalEntry,
      toggleCanonCompleted,
      deleteJournalEntry,
    ]
  );

  return <ConfessionContext.Provider value={value}>{children}</ConfessionContext.Provider>;
}

export function useConfession() {
  const context = useContext(ConfessionContext);
  if (context === undefined) {
    throw new Error('useConfession must be used within a ConfessionProvider');
  }
  return context;
}