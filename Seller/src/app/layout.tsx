import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TradeVistar Seller Hub | Scale Your B2B Manufacturing Globally",
  description: "Join TradeVistar as an enterprise B2B seller. Access verified buyers, enjoy 0% commission, and scale your B2B logistics infrastructure globally.",
  icons: {
    icon: "/logo/tradevistar.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logo/tradevistar.png" type="image/png" />
      </head>
      <body className="bg-background text-on-surface font-body-md overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
