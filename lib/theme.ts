"use client";

import { useSyncExternalStore } from "react";
import BLOG from "~/blog.config";

import { STORAGE_KEY } from "~/lib/themeScript";

export const toggleTheme = () => {
  const dark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  } catch {}
};

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["class"] });
  return () => observer.disconnect();
};

// Server and hydration use the configured default; the client then follows
// the class on <html>
export const useIsDark = () =>
  useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => BLOG.appearance === "dark",
  );
