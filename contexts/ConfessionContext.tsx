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

const ConfessionContext = createContext<ConfessionContextType | undefined>(undefined);

export function ConfessionProvider({ children }: { children: React.ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [customText, setCustomText] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(18);
  const [journalEntries, setJournalEntries] = useState<ConfessionEntry[]>([]);

  // Încărcare jurnal din stocarea locală la pornire
  useEffect(() => {
    async function loadJournal() {
      try {
        const data = await AsyncStorage.getItem(JOURNAL_STORAGE_KEY);
        if (data) {
          setJournalEntries(JSON.parse(data));
        }
      } catch (e) {
        console.error('Eroare la încărcarea jurnalului:', e);
      }
    }
    loadJournal();
  }, []);

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

  const addItem = useCallback((item: SelectedItem) => {
    setSelectedItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateItem = useCallback((id: string, newText: string) => {
    setSelectedItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: newText } : item))
    );
  }, []);

  const clearItems = useCallback(() => {
    setSelectedItems([]);
    setCustomText('');
  }, []);

  const increaseFontSize = useCallback(() => {
    setFontSize((prev) => (prev < 34 ? prev + 2 : prev));
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSize((prev) => (prev > 14 ? prev - 2 : prev));
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