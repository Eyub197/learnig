import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/context/Theme";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navigation/navbar";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const inter = localFont({
  src: "./fonts/Inter-VariableFont.ttf",
  variable: "--font-inter-var",
  weight: "100 200 300 400 500 600 700 800 900",
});

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk-VariableFont.ttf",
  variable: "--font-space-grotesk-var",
  weight: "300 400 500 600 700",
});

export const metadata: Metadata = {
  title: "DevFlow",
  description:
    "A community-driven platform for asking and answering programming qustions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development. mobile app development, algorithms, data structures, and more.",
  // I might remove this
  icons: {
    icon: "/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn(
        "antialiased",
        inter.variable,
        spaceGrotesk.variable,
        "font-sans",
        figtree.variable,
      )}
    >
      <body className="font-inter">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
