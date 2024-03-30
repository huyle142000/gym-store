'use client'
// App.tsx
import React, { createContext, useContext, ReactNode } from 'react';

// Define context interfaces
interface TransContextProps {
    children: ReactNode;
    common: any,
    t: any
}

interface TransContextValue {
    common: any,
    t: any
}

// Create context
const TransContext = createContext<TransContextValue | undefined>(undefined);

// Create custom hook for using the context
export const useTransContext = () => {
    const context = useContext(TransContext);

    return context;
};

// Create provider component
export const TranslationContext: React.FC<TransContextProps> = ({ children, common, t }) => {

    const value: TransContextValue = {
        common, t
    };

    return <TransContext.Provider value={value}>{children}</TransContext.Provider>
};
