import type { Metadata } from "next";
import { Inter, Oswald, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Safe Steels Pvt. Ltd. — Steel Solutions for Nation Building",
  description:
    "Safe Steels Pvt. Ltd. is an ISO 9001 & 14001 certified mechanical and structural steel fabrication, galvanization and erection company in Chitwan, Nepal — building truss bridges, towers, warehouses and infrastructure across the nation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-white font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
