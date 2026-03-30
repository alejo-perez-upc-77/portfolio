import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

/** Canonical origin — used for metadataBase so OG image URLs are absolute
 *  and don't 307-redirect (WhatsApp's scraper won't follow redirects). */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.alejo-ai.dev";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Alejo Perez | AI Lead & Agentic Systems Engineer",
  description: "Portfolio of Alejo Perez, AI Lead specializing in Agentic Systems, Machine Learning, and Fullstack Architecture.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Alejo Perez | AI Lead & Agentic Systems Engineer",
    description: "Portfolio of Alejo Perez, AI Lead specializing in Agentic Systems, Machine Learning, and Fullstack Architecture.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alejo Perez Portfolio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alejo Perez | AI Lead & Agentic Systems Engineer",
    description: "Portfolio of Alejo Perez, AI Lead specializing in Agentic Systems, Machine Learning, and Fullstack Architecture.",
    images: ["/og-image.jpg"],
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
        className={`${inter.variable} ${playfair.variable} antialiased font-sans bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
