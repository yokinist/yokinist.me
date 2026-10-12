export const STORAGE_KEY = "theme";

// Inlined in <head>: applies the saved theme before the first paint
export const themeScript = `(() => {
  try {
    const theme = localStorage.getItem("${STORAGE_KEY}");
    if (theme === "dark" || theme === "light")
      document.documentElement.classList.toggle("dark", theme === "dark");
  } catch {}
})();`;
