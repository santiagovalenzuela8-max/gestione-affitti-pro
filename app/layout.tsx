import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gestione Affitti Pro — Property Management di alta gamma | Verona, Garda, Trentino",
  description:
    "Gestione riservata di case vacanze per proprietari esigenti. Airbnb, Booking, pricing dinamico e assistenza dedicata. Verona, Lago di Garda, Trentino.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
