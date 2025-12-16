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
import { startScheduler } from "@/lib/scheduler";

export const metadata: Metadata = {
  title: "InnoThinkLab - Création de sites web, SEO & Marketing",
  description:
    "Optimisez votre présence en ligne avec nos services de création de sites web, développement mobile, développement de site web personnalisé, marketing en ligne et référencement. Notre équipe de specialiste en SEO vous offre des solutions professionnelles, performantes et de haute qualité. Nous vous aidons à développer votre visibilité en ligne, à augmenter votre trafic organique et à améliorer votre conversion.",
  keywords:
    "site web, création de site web, SEO, marketing en ligne, agence de création de site web, agence de développement de site web, agence de SEO, agence de marketing en ligne",
  viewport: "width=device-width,initial-scale=1",
  openGraph: {
    title: "InnoThinkLab - Création de sites web, SEO & Marketing",
    description:
      "Optimisez votre présence en ligne avec nos services de création de sites web, développement mobile, développement de site web personnalisé, marketing en ligne et référencement. Notre équipe de specialiste en SEO vous offre des solutions professionnelles, performantes et de haute qualité. Nous vous aidons à développer votre visibilité en ligne, à augmenter votre trafic organique et à améliorer votre conversion.",
    type: "website",
    images: [
      {
        url: "https://innothinklab.com/images/logo.png",
        width: 800,
        height: 600,
        alt: "Logo InnoThinkLab",
      },
    ],
  },
  // additionalMetaTags: [
  //   {
  //     name: "twitter:card",
  //     content: "summary_large_image",
  //   },
  //   {
  //     name: "twitter:title",
  //     content: "InnoThinkLab - Création de sites web, SEO & Marketing",
  //   },
  //   {
  //     name: "twitter:description",
  //     content: "Optimisez votre présence en ligne avec nos services de création de sites web, développement mobile, développement de site web personnalisé, marketing en ligne et référencement. Notre équipe de specialiste en SEO vous offre des solutions professionnelles, performantes et de haute qualité. Nous vous aidons à développer votre visibilité en ligne, à augmenter votre trafic organique et à améliorer votre conversion.",
  //   },
  //   {
  //     name: "twitter:image",
  //     content: "https://innothinklab.com/images/logo.png",
  //   },
  // ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.NODE_ENV === "development") {
    startScheduler();
  }
  return (
    <html lang="en">
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
