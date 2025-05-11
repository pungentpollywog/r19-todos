import { useState, useEffect } from 'react';

function getStoredValue(defaultValue, key) {
  const storageValue = window.localStorage.getItem(key);
  return storageValue !== null ? JSON.parse(storageValue) : defaultValue;
}

export function useLocalStorage(defaultValue, key) {
  const initialValue = getStoredValue(defaultValue, key);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
