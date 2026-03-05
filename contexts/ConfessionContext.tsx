import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

export interface SelectedItem {
  id: string;
  text: string;
}

interface ConfessionContextType {
  selectedItems: SelectedItem[];
  customText: string;
  fontSize: number; // NOU
  setCustomText: (text: string) => void;
  addItem: (item: SelectedItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, newText: string) => void;
  clearItems: () => void;
  increaseFontSize: () => void; // NOU
  decreaseFontSize: () => void; // NOU
}

const ConfessionContext = createContext<ConfessionContextType | undefined>(undefined);

export function ConfessionProvider({ children }: { children: React.ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [customText, setCustomText] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(18); // NOU: mărimea de start

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

  // FUNCȚII NOI PENTRU FONT
  const increaseFontSize = useCallback(() => {
    setFontSize((prev) => (prev < 34 ? prev + 2 : prev));
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSize((prev) => (prev > 14 ? prev - 2 : prev));
  }, []);

  const value = useMemo(() => ({
    selectedItems,
    customText,
    fontSize, // ADĂUGAT ÎN VALOARE
    setCustomText,
    addItem,
    removeItem,
    updateItem,
    clearItems,
    increaseFontSize, // ADĂUGAT ÎN VALOARE
    decreaseFontSize, // ADĂUGAT ÎN VALOARE
  }), [selectedItems, customText, fontSize, addItem, removeItem, updateItem, clearItems, increaseFontSize, decreaseFontSize]);

  return <ConfessionContext.Provider value={value}>{children}</ConfessionContext.Provider>;
}

export function useConfession() {
  const context = useContext(ConfessionContext);
  if (context === undefined) {
    throw new Error('useConfession must be used within a ConfessionProvider');
  }
  return context;
}