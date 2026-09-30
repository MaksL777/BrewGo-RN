import React, { createContext, useState, useContext } from 'react';

// Define themes
export const themes = {
  light: {
    background: '#FFF8F1',
    card: '#FFFFFF',
    text: '#1C1C1C',
    primary: '#6F4E37',
  },
  dark: {
    background: '#121212',
    card: '#1E1E1E',
    text: '#F5F5F5',
    primary: '#D4A373',
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = themes[themeMode];

  return (
    <ThemeContext.Provider value={{ themeMode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
