import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeColors {
  sidebarBg: string;
  sidebarText: string;
  sidebarActiveItem: string;
  sidebarBorder: string;
  buttonPrimary: string;
  buttonWarning: string;
  buttonDanger: string;
  buttonSuccess: string;
  paginationActive: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  updateColors: (newColors: Partial<ThemeColors>) => void;
}

const defaultColors: ThemeColors = {
  sidebarBg: '#1f2937',
  sidebarText: '#ffffff',
  sidebarActiveItem: '#374151',
  sidebarBorder: '#374151',
  buttonPrimary: '#3b82f6',
  buttonWarning: '#f59e0b',
  buttonDanger: '#ef4444',
  buttonSuccess: '#10b981',
  paginationActive: '#3b82f6',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colors, setColors] = useState<ThemeColors>(() => {
    const savedColors = localStorage.getItem('themeColors');
    if (savedColors) {
      const parsed = JSON.parse(savedColors);
      // 确保所有必需的颜色都存在，如果不存在则使用默认值
      return {
        ...defaultColors,
        ...parsed
      };
    }
    return defaultColors;
  });

  useEffect(() => {
    // 保存到 localStorage
    localStorage.setItem('themeColors', JSON.stringify(colors));

    // 更新 CSS 变量
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`;
      root.style.setProperty(cssVar, value);
    });
  }, [colors]);

  const updateColors = (newColors: Partial<ThemeColors>) => {
    setColors(prev => ({ ...prev, ...newColors }));
  };

  return (
    <ThemeContext.Provider value={{ colors, updateColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
