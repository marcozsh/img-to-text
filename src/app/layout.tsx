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

export const metadata: Metadata = {
  title: "Convertir Imagen a Texto",
  description: "App para convertir imagenes a texto",
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
