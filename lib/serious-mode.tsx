"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SeriousModeContextType {
  isSeriousMode: boolean;
  toggleSeriousMode: () => void;
  setSeriousMode: (enabled: boolean) => void;
}

const SeriousModeContext = createContext<SeriousModeContextType | undefined>(
  undefined
);

export function SeriousModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSeriousMode, setIsSeriousMode] = useState(false);

  useEffect(() => {
    // Load serious mode preference from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("serious-mode");
      if (saved) {
        setIsSeriousMode(JSON.parse(saved));
      }
    }
  }, []);

  const toggleSeriousMode = () => {
    const newValue = !isSeriousMode;
    setIsSeriousMode(newValue);
    if (typeof window !== "undefined") {
      localStorage.setItem("serious-mode", JSON.stringify(newValue));
    }
  };

  const setSeriousMode = (enabled: boolean) => {
    setIsSeriousMode(enabled);
    if (typeof window !== "undefined") {
      localStorage.setItem("serious-mode", JSON.stringify(enabled));
    }
  };

  return (
    <SeriousModeContext.Provider
      value={{ isSeriousMode, toggleSeriousMode, setSeriousMode }}
    >
      {children}
    </SeriousModeContext.Provider>
  );
}

export function useSeriousMode() {
  const context = useContext(SeriousModeContext);
  if (context === undefined) {
    throw new Error("useSeriousMode must be used within a SeriousModeProvider");
  }
  return context;
}
