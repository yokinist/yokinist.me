"use client";

import { STORAGE_KEY } from "~/lib/themeScript";

export const toggleTheme = () => {
  const dark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  } catch {}
};
