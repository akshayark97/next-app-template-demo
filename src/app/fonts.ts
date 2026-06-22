import { Geist, Geist_Mono } from "next/font/google";

// Shared across the localized and non-localized root layouts.
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
