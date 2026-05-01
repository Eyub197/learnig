"use client";

import { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemeProvider } from "next-themes";

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemeProvider attribute="class" {...props}>
      {children}
    </NextThemeProvider>
  );
}

export default ThemeProvider;
