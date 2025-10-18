import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavigatorXProvider } from "@/components/NavigatorXProvider";
import { SearchModal } from "@/components/SearchModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NavigatorX",
  description:
    "A lightweight, type-safe keyboard shortcut manager for web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavigatorXProvider>
          {children}
          <SearchModal />
        </NavigatorXProvider>
      </body>
    </html>
  );
}
