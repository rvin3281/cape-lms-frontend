"use client";

import { useEffect, useState } from "react";

export function useLocalStorageState<T>(key: string, initialValue: T) {
  // const [state, setState] = useState<T>(initialValue);

  // console.log("localstorage", state);

  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw != null ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Load On Chage
  // useEffect(() => {
  //   try {
  //     console.log("KEY RUNNING");
  //     const raw = localStorage.getItem(key);
  //     console.log("RAW VALUE", raw);
  //     if (raw != null) {
  //       console.log("IM NOT NULL");
  //       setState(JSON.parse(raw));
  //     }
  //   } catch {}
  // }, [key]);

  // Save on Change
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [key, state]);

  return [state, setState] as const;
}
