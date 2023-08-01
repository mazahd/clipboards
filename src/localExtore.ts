import { writable } from "svelte/store";
import type { JsonValue } from "./types/json.type";

export const localXtore = <T extends JsonValue>(key: string, initial: T) => {
  const toString = (value: T) => JSON.stringify(value, null, 2); // helper function
  const toObj = (value: string) => JSON.parse(value); // helper function

  // Using chrome.storage.local.get method to retrieve the value from local storage
  chrome.storage.local.get([key], (result) => {
    const saved = toObj(result[key] || toString(initial));
    set(saved); // set the initial value for the writable store
  });

  const { subscribe, set, update } = writable<T>(initial); // create the underlying writable store

  return {
    subscribe,
    set: (value: T) => {
      // Using chrome.storage.local.set method to save the value to local storage
      chrome.storage.local.set({ [key]: toString(value) });
      return set(value);
    },
    update,
  };
};
