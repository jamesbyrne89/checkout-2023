import { useState } from "react";

const APP_KEY_PREFIX = "checkout-frontend-challenge";

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  const prefixedKey = `${APP_KEY_PREFIX}_${key}`;
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(prefixedKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
      return initialValue;
    }
  });

  const setValue: SetValue<T> = (value: T | ((val: T) => void)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(prefixedKey, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  };
  return [storedValue, setValue];
}
