import { useEffect, useState } from "react";

/** Keep a React state value across reloads on the same browser origin. */
export function useSaved(key, fallback) {
  const storageKey = `grantly-${key}`;
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) ?? fallback;
    } catch {
      return fallback;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      // The interface can still work when browser storage is unavailable.
      console.warn("Grantly could not save progress to this browser.", error);
    }
  }, [storageKey, value]);

  return [value, setValue];
}
