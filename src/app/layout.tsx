import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { Footer } from "@/components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ANDIJON MAZZA — Qarsildoq Tovuq Restorani (Andijon)",
  description:
    "Andijon tumanida eng qarsildoq Shirin va Achchiq qarsildoq tovuq. Kilogramm bo'yicha buyurtma bering, 10 kg dan yuqoriga mutlaqo bepul yetkazish!",
  keywords: [
    "qarsildoq tovuq Andijon",
    "qovurilgan tovuq Andijon",
    "Andijon mazza",
    "tovuq yetkazib berish Andijon",
    "ehson tovuq buyurtma",
  ],
  openGraph: {
    title: "ANDIJON MAZZA — Qarsildoq Tovuq Restorani",
    description: "Qarsildoq ta'm, yangi marinad. Andijon bo'ylab issiq holda yetkazib berish.",
    type: "website",
    locale: "uz_UZ",
    url: "https://andijon-mazza.uz",
    siteName: "ANDIJON MAZZA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FastFoodRestaurant",
    name: "ANDIJON MAZZA",
    image: "https://andijon-mazza.uz/images/hero/hero-flying-chicken.jpg",
    telephone: "+998952645664",
    servesCuisine: "Fried Chicken / Crispy Chicken",
    priceRange: "80000 UZS",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gulshan (Mo'ljal: 7 kun)",
      addressLocality: "Andijon tumani",
      addressRegion: "Andijon viloyati",
      addressCountry: "UZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7821,
      longitude: 72.3442,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "23:00",
      },
    ],
  };

  return (
    <html lang="uz" className="scroll-smooth dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${plusJakarta.variable} ${outfit.variable} font-body bg-[#0A0B0E] text-white antialiased selection:bg-crispy-500 selection:text-white`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
        <CheckoutModal />
      </body>
    </html>
  );
}
