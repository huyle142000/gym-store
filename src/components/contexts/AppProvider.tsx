'use client'
// App.tsx
import { User } from '@/types/user';
import React, { createContext, useContext, ReactNode, useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a custom theme with the desired color
const theme = createTheme({
  palette: {
    primary: {
      main: '#ee4d2d', // Set the primary color to orange
    },
  },
});

// Define context interfaces
interface AppContextProps {
  children: ReactNode;
}

interface AppContextValue {
  categories: string[];
  selectedCategory: string | null;
  selectCategory: (category: string) => void;
  breadcrumbs: string[];
  setBreadcrumbs: (breadcrumbs: string[]) => void;
  profileUser: User | null
  setProfileUser: (val: User) => void;
}

// Create context
const AppContext = createContext<AppContextValue | undefined>(undefined);

// Create custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
 
  return context;
};

// Create provider component
export const AppProvider: React.FC<AppContextProps> = ({ children }) => {
  const [categories, setCategories] = useState<string[]>(['Electronics', 'Clothing', 'Books']);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const [profileUser, setProfileUser] = useState<User | null>(null);

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const value: AppContextValue = {
    categories,
    selectedCategory,
    selectCategory,
    breadcrumbs,
    setBreadcrumbs,
    profileUser,
    setProfileUser
  };

  return <ThemeProvider theme={theme}>
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  </ThemeProvider>;
};
