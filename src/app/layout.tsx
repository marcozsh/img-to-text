import type { Metadata } from "next";
import { roboto } from "./fonts";
import { Providers, ThemeProviders } from "./providers";
import SessionWrapper from "./session-wrapper";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Footer from "@/components/footer";
import Separator from "@/components/separator";
import NavbarSession from "@/components/session-nav";
import { Analytics } from "@vercel/analytics/next";

const urlHost = process.env.NEXT_PUBLIC_URL_HOST;

const title = "Convertir Imagen a Texto";

const description = `App fácil de usar para convertir imágenes a texto utilizando Tesseract.js para el reconocimiento óptico de caracteres (OCR).`;

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: `imagen, texto, convertir, ocr, reconocimiento, optico, caracteres, img, txt, img to text, img2txt, img2text, img to txt, img2txt`,
  authors: [{ name: "Marco Peña" }],
  robots: "index, follow",
  icons: { icon: "/favicon.ico", apple: "/favicon.ico" },
  alternates: { canonical: urlHost },
  openGraph: {
    title: title,
    description: description,
    images: [{ url: "/img-principal.png", alt: title }],
    url: urlHost,
    type: "website",
    countryName: "Chile",
    emails: "marc.penar@outlook.cl",
    siteName: "Convertir Imagen a Texto",
  },
  twitter: {
    title: title,
    description: description,
    images: [{ url: "/img-principal.png", alt: title }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionWrapper>
        <html lang="es" suppressHydrationWarning>
          <Analytics />
          <body
            className={`${roboto.className} antialiased flex flex-col items-center`}
          >
            <ThemeProviders>
              <NavbarSession />
              <Toaster position="top-left" />
              <Providers>{children}</Providers>
              <Separator vertical={false} />
              <Footer />
            </ThemeProviders>
          </body>
        </html>
      </SessionWrapper>
    </>
  );
}
