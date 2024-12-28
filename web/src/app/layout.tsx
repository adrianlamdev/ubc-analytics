import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "UBC Analytics",
	description:
		"An analytics platform for UBC students and faculty to analyze grades and data using machine learning techniques.",
	keywords: ["UBC", "analytics", "machine learning", "grades", "data"],
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
			<body
				className={cn(
					inter.variable,
					"antialiased min-h-screen flex flex-col",
					"bg-background text-foreground",
				)}
			>
				{/* TODO: Add error boundary */}
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
			</body>
		</html>
	);
}
