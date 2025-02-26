import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AreasProvider } from "@/app/context/context25/areascontext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Lictus",
  description: "Soluciones en Seguridad y Salud en el Trabajo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Manifest.json */}
        <link rel="manifest" href="/manifest.json" />
        {/* Theme Color */}
        <meta name="theme-color" content="#3e4eb8" />
        {/* Favicon */}
        <link rel="icon" href="/icons/lictus-logo-1-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AreasProvider>
          {children}
        </AreasProvider>
      </body>
    </html>
  );
}
