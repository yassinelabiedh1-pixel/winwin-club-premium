import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Winwin Club | Coworking space in Menzah 7, Ariana",
    template: "%s | Winwin Club",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Winwin Club",
  keywords: [
    "coworking",
    "coworking Ariana",
    "coworking Menzah",
    "coworking Tunis",
    "espace de coworking",
    "study space",
    "Winwin Club",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Winwin Club",
    title: "Winwin Club | Coworking space in Menzah 7, Ariana",
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Winwin Club | Coworking space in Menzah 7, Ariana",
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
