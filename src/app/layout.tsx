import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NavBar from "@/components/nav/nav-bar";
import { stackClientApp } from "@/stack/client";
import { STACK_AUTH_ENABLED } from "@/stack/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js App Template",
  description: "A full-stack Next.js starter template — ready for anything.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Only wrap with StackProvider when Stack Auth is configured.
  if (STACK_AUTH_ENABLED && stackClientApp) {
    const { StackProvider, StackTheme } = await import("@stackframe/stack");
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <StackProvider app={stackClientApp}>
            <StackTheme>
              <NavBar />
              {children}
              <Analytics />
              <SpeedInsights />
            </StackTheme>
          </StackProvider>
        </body>
      </html>
    );
  }

  // Auth not configured — render without StackProvider.
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
