import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { ErrorBoundary } from "@/components/error-boundary";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "UBC Metrics",
  description:
    "An analytics platform for UBC students and faculty to analyze grades and data using machine learning techniques.",
  keywords: [
    "UBC",
    "analytics",
    "machine learning",
    "grades",
    "data",
    "metrics",
  ],
  authors: [{ name: "Adrian Lam" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="8f2c2223-1c02-4397-ab99-0da414016f35"
      />
      <body
        className={cn(
          inter.variable,
          "antialiased min-h-screen flex flex-col",
          "bg-background text-foreground",
        )}
      >
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
