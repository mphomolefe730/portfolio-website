import { useState, useEffect, useCallback, useMemo } from 'react';
import { ThemeName, THEMES, isThemeAvailable } from '../configs/themes';

const STORAGE_KEY = 'themePortfolioWebsite';
const EXPIRY_DAYS = 7;

interface StoredTheme {
  value: ThemeName;
  expiry: number;
}

function readStoredTheme(): ThemeName {
  if (typeof window === 'undefined') return 'default';
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return 'default';

    const parsed: StoredTheme = JSON.parse(item);

    if (new Date().getTime() > parsed.expiry) {
      localStorage.removeItem(STORAGE_KEY);
      return 'default';
    }

    if (!isThemeAvailable(parsed.value)) {
      return 'default';
    }

    return parsed.value;
  } catch {
    return 'default';
  }
}

function persistTheme(theme: ThemeName) {
  const now = new Date();
  const item: StoredTheme = {
    value: theme,
    expiry: now.getTime() + EXPIRY_DAYS * 24 * 60 * 60 * 1000,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(item));
}

export function useThemePreference() {
  const [theme, setThemeState] = useState<ThemeName>(() => readStoredTheme());

  // Filter available themes dynamically based on imported CSS files
  const availableThemes = useMemo(() => {
    return (Object.keys(THEMES) as ThemeName[]).filter((themeKey) => 
      isThemeAvailable(themeKey)
    );
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = useCallback((nextTheme: ThemeName) => {
    if (!isThemeAvailable(nextTheme)) {
      console.warn(`Theme "${nextTheme}" is not available or its CSS was not loaded.`);
      return;
    }
    setThemeState(nextTheme);
    persistTheme(nextTheme);
  }, []);

  const cycleTheme = useCallback(() => {
    if (availableThemes.length <= 1) return;
    const currentIndex = availableThemes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    setTheme(availableThemes[nextIndex]);
  }, [theme, availableThemes, setTheme]);

  return { 
    theme, 
    setTheme, 
    cycleTheme, 
    availableThemes 
  };
}