import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Outlet from "@/components/Outlet";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const GA_TRACKING_ID = 'G-91KCWFBS21';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "SAJAL GUPTA | Security Researcher | Bug Hunter",
  description: "Security Researcher and Bug Hunter with expertise in penetration testing, bug bounty hunting, and security research. Featured in Hackerone, Bugcrowd, and Google.",
  keywords: ["SAJAL GUPTA", "Security Researcher", "Bug Hunter", "Penetration Testing", "Bug Bounty", "Application Security", "Cybersecurity Expert", "Ethical Hacker"],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    }
  },
  icons: {
    icon: '/icon-180.png',
    apple: '/icon-180.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://guptasajal.com',
    siteName: 'SAJAL GUPTA',
    title: 'SAJAL GUPTA | Security Researcher & Bug Hunter',
    description: 'Security Researcher and Bug Hunter with expertise in penetration testing, bug bounty hunting, and security research.',
    images: [
      {
        url: 'https://guptasajal.com/Sajal_Gupta-og.jpg',
        width: 630,
        height: 630,
        alt: 'SAJAL GUPTA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAJAL GUPTA | Security Researcher & Bug Hunter',
    description: 'Security Researcher and Bug Hunter with expertise in penetration testing, bug bounty hunting, and security research.',
    images: ['https://guptasajal.com/Sajal_Gupta-og.jpg'],
    creator: '@codiologies',
  },
  metadataBase: new URL("https://guptasajal.com"),
  alternates: {
    canonical: 'https://guptasajal.com',
  },
  authors: [
    { name: 'Sajal Gupta', url: 'https://guptasajal.com' },
  ],
  category: 'Cybersecurity',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#000000" />
        
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        
        <Script id="schema-structured-data" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Sajal Gupta",
              "url": "https://guptasajal.com",
              "image": "https://guptasajal.com/Sajal_Gupta-og.jpg",
              "jobTitle": "Security Researcher",
              "description": "Security Researcher and Bug Hunter with expertise in penetration testing, bug bounty hunting, and security research.",
              "sameAs": [
                "https://twitter.com/codiologies",
                "https://github.com/codiologies",
                "https://www.linkedin.com/in/sajalgupta2812/"
              ],
              "knowsAbout": ["Cybersecurity", "Penetration Testing", "Bug Bounty", "Security Research", "Ethical Hacking"]
            }
          `}
        </Script>
        
        {/* Optimized resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Critical font loading - optimized */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" 
        />
        
        {/* Critical images */}
        <link rel="preload" as="image" href="/Sajal_Gupta.webp" />
        <link rel="preload" as="image" href="/grid.svg" />
        
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <Outlet>{children}</Outlet>
      </body>
    </html>
  );
}
