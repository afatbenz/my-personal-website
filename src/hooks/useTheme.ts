import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

const getSystemTheme = (): Theme => (
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
);

export const getInitialTheme = (): Theme => {
  if (typeof document !== 'undefined') {
    const documentTheme = document.documentElement.dataset.theme;
    if (documentTheme === 'light' || documentTheme === 'dark') return documentTheme;
  }

  if (typeof window !== 'undefined') {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
  }

  return getSystemTheme();
};

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
      return nextTheme;
    });
  }, []);

  return { theme, toggleTheme };
};
