import createContextHook from '@nkzw/create-context-hook';
import { useCallback, useMemo, useState } from 'react';

export interface SelectedItem {
  id: string;
  text: string;
}

export const [ConfessionContext, useConfession] = createContextHook(() => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [customText, setCustomText] = useState<string>('');

  const addItem = useCallback((item: SelectedItem) => {
    setSelectedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) return prev;
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // ADAUGĂ ACEASTĂ FUNCȚIE (LIPSEA!)
  const updateItem = useCallback((id: string, newText: string) => {
    setSelectedItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: newText } : item))
    );
  }, []);

  const clearItems = useCallback(() => {
    setSelectedItems([]);
    setCustomText('');
  }, []);

  return useMemo(
    () => ({
      selectedItems,
      customText,
      setCustomText,
      addItem,
      removeItem,
      updateItem, // NU UITA SĂ O ADAUGI ȘI AICI
      clearItems,
    }),
    [selectedItems, customText, addItem, removeItem, updateItem, clearItems]
  );
});