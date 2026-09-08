import type { Metadata } from "next";
import { Inter, Syne, Black_Ops_One } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/providers/language-provider";
import { Preloader } from "@/components/layout/preloader";
import { CustomCursor } from "@/components/layout/custom-cursor";
import Navbar from "@/components/layout/navbar";
import { getDictionary, getContents, getSharedData } from "@/lib/loaders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const blackOpsOne = Black_Ops_One({
  weight: '400',
  variable: "--font-black-ops-one",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SHINAS S | Portfolio",
  description: "Creative Developer Portfolio",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = "en"; // Defaulting to English since we are not using [lang] routes yet
  
  const [dictionary, contents, shared] = await Promise.all([
    getDictionary(lang),
    getContents(lang),
    getSharedData(),
  ]);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.variable} ${syne.variable} ${blackOpsOne.variable} font-sans bg-background text-foreground antialiased min-h-full flex flex-col`}>
        <LanguageProvider lang={lang} dictionary={dictionary} contents={contents} shared={shared}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <CustomCursor />
            <Preloader />
            <SmoothScroll>
              <Navbar />
              {children}
            </SmoothScroll>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
