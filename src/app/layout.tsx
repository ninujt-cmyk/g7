import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

// G7 Hotels Brand Fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "G7 Hotels | Luxury Hotels & Fine Dining - Experience Timeless Elegance",
  description: "Discover unparalleled luxury at G7 Hotels. Experience world-class accommodations, exquisite fine dining, spa & wellness, and curated experiences. Book your unforgettable stay today.",
  keywords: [
    "luxury hotel",
    "five star hotel",
    "fine dining",
    "spa and wellness",
    "luxury accommodation",
    "boutique hotel",
    "hotel reservations",
    "luxury travel",
    "G7 Hotels",
  ],
  authors: [{ name: "G7 Hotels" }],
  creator: "G7 Hotels",
  publisher: "G7 Hotels",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "G7 Hotels | Luxury Hotels & Fine Dining",
    description: "Experience timeless luxury at G7 Hotels. World-class accommodations, exquisite dining, and unforgettable experiences await.",
    url: "https://g7hotels.com",
    siteName: "G7 Hotels",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "G7 Hotels - Luxury Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "G7 Hotels | Luxury Hotels & Fine Dining",
    description: "Experience timeless luxury at G7 Hotels. World-class accommodations, exquisite dining, and unforgettable experiences await.",
    images: ["/images/og-image.jpg"],
    creator: "@g7hotels",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
