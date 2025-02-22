import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { JetBrains_Mono as FontMono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/context/theme/ThemeProvider";
import "@/styles/globals.css";
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { TooltipProvider } from '@/components/ui/Tooltip'

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
            <Navbar />
            <main className="flex-1">{children}</main>
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--border))',
                },
                className: 'font-sans',
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
