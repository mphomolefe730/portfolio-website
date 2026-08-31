import { useState, useEffect, useCallback, useMemo } from 'react';

export type ThemeName = 
  | 'default'
  | 'retro'
  | 'cyberpunk'
  | 'botanical'
  | 'solarpunk'
  | 'bioluminescence'
  | 'terminal'
  | 'monochrome'
  | 'synthpop'
  | 'luxury';

export interface ThemeMeta {
  id: ThemeName;
  label: string;
}

export const THEMES: Record<ThemeName, ThemeMeta> = {
  default: { id: 'default', label: 'Default' },
  retro: { id: 'retro', label: 'Retro' },
  cyberpunk: { id: 'cyberpunk', label: 'Cyberpunk' },
  botanical: { id: 'botanical', label: 'Botanical' },
  solarpunk: { id: 'solarpunk', label: 'Solarpunk' },
  bioluminescence: { id: 'bioluminescence', label: 'Bioluminescence' },
  terminal: { id: 'terminal', label: 'Terminal' },
  monochrome: { id: 'monochrome', label: 'Monochrome' },
  synthpop: { id: 'synthpop', label: 'Synthpop' },
  luxury: { id: 'luxury', label: 'Obsidian Gold' },
};

export function isThemeAvailable(theme: ThemeName): boolean {
  if (theme === 'default') return true;
  if (typeof window === 'undefined') return false;

  const testElement = document.createElement('div');
  testElement.setAttribute('data-theme', theme);
  document.body.appendChild(testElement);

  const styles = getComputedStyle(testElement);
  const loaded = styles.getPropertyValue('--theme-accent').trim() !== '';
  document.body.removeChild(testElement);

  return loaded;
}

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

  return { theme, setTheme, cycleTheme, availableThemes };
}