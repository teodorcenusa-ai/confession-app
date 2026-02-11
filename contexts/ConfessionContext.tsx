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
      if (exists) {
        return prev;
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
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
      clearItems,
    }),
    [selectedItems, customText, addItem, removeItem, clearItems]
  );
});
