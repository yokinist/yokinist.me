"use client";

import { STORAGE_KEY } from "~/lib/themeScript";

export const toggleTheme = () => {
  const dark = document.documentElement.classList.toggle("dark");
  // notion-rsc's styles follow the OS theme unless told it is light
  document.documentElement.classList.toggle("light", !dark);
  try {
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  } catch {}
};
