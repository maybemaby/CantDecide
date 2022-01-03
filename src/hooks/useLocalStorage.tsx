import { useState } from "react";

interface UseLocalStorageReturn<T> {
  value: T[];
  getFromStorage: () => T[];
  saveToStorage: (toSave: T[]) => void;
}

export function useLocalStorage<T>(key: string): UseLocalStorageReturn<T> {
  const [value] = useState<T[]>((): T[] => {
    const retrieved = window.localStorage.getItem(key);
    if (retrieved) {
      return JSON.parse(retrieved) as T[];
    } else return [];
  });

  const getFromStorage = (): T[] => {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value) as T[];
    } else return [];
  };

  // Returns true if save succceeds, false otherwise
  const saveToStorage = (toSave: T[]): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(toSave));
    } catch (err) {
      console.log(err);
    }
  };

  return { value, getFromStorage, saveToStorage };
}
