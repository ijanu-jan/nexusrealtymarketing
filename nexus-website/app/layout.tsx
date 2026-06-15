import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins, Lora } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["200", "300", "400", "500"],
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexusrealtymarketing.com"),
  title: {
    default: "Nexus Realty Marketing | Built to Last. Guaranteed to Deliver.",
    template: "%s | Nexus Realty Marketing",
  },
  description:
    "Nexus Realty Marketing Pvt. Ltd. — premium real estate marketing in Bahria Town, Rawalpindi. Property sales, rentals, investment consultancy and the Tower 36 development.",
  keywords: [
    "Nexus Realty Marketing",
    "Tower 36",
    "Bahria Town real estate",
    "Rawalpindi property",
    "real estate marketing Pakistan",
  ],
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Nexus Realty Marketing",
    description: "Built to Last. Guaranteed to Deliver.",
    type: "website",
    locale: "en_PK",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${poppins.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-white text-ink">{children}</body>
    </html>
  );
}
