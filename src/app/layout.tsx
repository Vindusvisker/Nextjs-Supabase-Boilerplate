import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter as FontSans } from "next/font/google";
import { JetBrains_Mono as FontMono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/context/theme/ThemeProvider";
import "@/styles/globals.css";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { TooltipProvider } from "@/components/ui/Tooltip";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "SaaS Boilerplate",
  description: "A modern SaaS starter kit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <TooltipProvider>
          <ThemeProvider defaultTheme="default" defaultMode="system">
            <Suspense
              fallback={
                <div className="h-16 border-b border-border">
                  <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
                    <div className="animate-pulse h-6 w-32 bg-muted rounded" />
                  </div>
                </div>
              }
            >
              <Navbar />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  border: "1px solid hsl(var(--border))",
                },
                className: "font-sans",
              }}
            />
            {/* Theme Switcher - Fixed Position */}
            <div className="fixed bottom-4 right-4 z-50">
              <ThemeSwitcher />
            </div>
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
