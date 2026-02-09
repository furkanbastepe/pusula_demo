import type { Metadata } from "next";
import { Lexend, Noto_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Display font for headings
const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Body font
const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Monospace font for code
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PUSULA | Dijital Gençlik Merkezi",
  description: "Gerçek dünya problemleri çözerek dijital beceri kazan. Eskişehir DİGEM ile geleceğini inşa et.",
  keywords: ["dijital beceri", "gençlik merkezi", "Eskişehir", "DİGEM", "UNDP", "SDG", "eğitim"],
  authors: [{ name: "UNDP Türkiye" }],
  openGraph: {
    title: "PUSULA | Dijital Gençlik Merkezi",
    description: "Gerçek dünya problemleri çözerek dijital beceri kazan.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <head>
        {/* Material Symbols for stitch_design icons */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body
        className={`${lexend.variable} ${notoSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
