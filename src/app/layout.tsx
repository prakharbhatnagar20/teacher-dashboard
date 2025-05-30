import type { Metadata } from "next";
import { Geist, Geist_Mono, Reddit_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const red = Reddit_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-red',
  weight: ['400', '500', '700', '900'],})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
         className={`${red.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
