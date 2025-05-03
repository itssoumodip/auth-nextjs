import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextAuth",
  description: "Modern Authentication System",
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
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#18181b',
              color: '#fff',
              border: '1px solid #27272a',
              fontFamily: 'var(--font-geist-sans)',
              borderRadius: '0.375rem',
            },
            success: {
              iconTheme: {
                primary: '#a1a1aa', 
                secondary: '#18181b', 
              },
            },
            error: {
              iconTheme: {
                primary: '#a1a1aa', 
                secondary: '#18181b', 
              },
            },
          }} 
        />
        {children}
      </body>
    </html>
  );
}
