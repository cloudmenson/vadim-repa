"use client";

import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext<{
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
} | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <MenuContext.Provider value={{ mobileMenuOpen, setMobileMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within MenuProvider');
  return context;
}
