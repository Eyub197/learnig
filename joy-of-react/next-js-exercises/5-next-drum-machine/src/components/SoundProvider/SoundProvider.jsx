"use client";
import React from "react";

export const SoundContext = React.createContext();

function SoundProvider({ children }) {
  const [soundEnable, setSoundEnable] = React.useState(true);
  return (
    <SoundContext.Provider value={{ soundEnable, setSoundEnable }}>
      {children}
    </SoundContext.Provider>
  );
}

export default SoundProvider;
