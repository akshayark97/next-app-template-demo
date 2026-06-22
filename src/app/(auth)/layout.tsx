import { geistMono, geistSans } from "@/app/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";

/**
 * Root layout for non-localized routes (Stack Auth handler).
 * Stack Auth expects its handler on a fixed `/handler` path, so these pages
 * live outside the `[locale]` segment and get their own minimal shell.
 */
export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
