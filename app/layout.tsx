import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/fontawesome.css";
import "../styles/themify-icons.css";
import "../styles/animate.css";
import "../styles/cursor.css";
import "../styles/custom-font.css";
import "../styles/main.css";
import { initCronJobs } from "@/lib/cronJobs";

export const metadata: Metadata = {
  title: "InnoThinkLab - Création de sites web, SEO & Marketing",
  description:
    "Agence experte en création de sites web, SEO et marketing digital. Développement sur mesure, référencement et stratégies digitales pour booster votre visibilité en ligne.",
  keywords:
    "site web, création de site web, SEO, marketing en ligne, agence de création de site web, agence de développement de site web, agence de SEO, agence de marketing en ligne",
  authors: [{ name: "InnoThinkLab" }],
  creator: "InnoThinkLab",
  publisher: "InnoThinkLab",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: "width=device-width,initial-scale=1",
  alternates: {
    canonical: 'https://innothinklab.com',
  },
  openGraph: {
    title: "InnoThinkLab - Création de sites web, SEO & Marketing",
    description:
      "Agence experte en création de sites web, SEO et marketing digital. Développement sur mesure, référencement et stratégies digitales pour booster votre visibilité en ligne.",
    type: "website",
    url: "https://innothinklab.com",
    siteName: "InnoThinkLab",
    locale: "fr_FR",
    images: [
      {
        url: "https://innothinklab.com/images/logo.png",
        width: 800,
        height: 600,
        alt: "Logo InnoThinkLab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InnoThinkLab - Création de sites web, SEO & Marketing",
    description:
      "Agence experte en création de sites web, SEO et marketing digital. Développement sur mesure, référencement et stratégies digitales pour booster votre visibilité en ligne.",
    images: ["https://innothinklab.com/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Always initialize scheduler in both development and production
  
    initCronJobs();
  

  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body id="scrool">{children}</body>
    </html>
  );
}
