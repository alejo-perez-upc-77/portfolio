import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alejo.ai"),
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
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alejo Perez Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alejo Perez | AI Lead & Agentic Systems Engineer",
    description: "Portfolio of Alejo Perez, AI Lead specializing in Agentic Systems, Machine Learning, and Fullstack Architecture.",
    images: ["/og-image.png"],
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
