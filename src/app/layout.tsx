import type { Metadata } from "next";
import { roboto } from "./fonts";
import { Providers, ThemeProviders } from "./providers";
import SessionWrapper from "./session-wrapper";
import { Toaster } from "react-hot-toast";
import "./globals.css";

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
    <SessionWrapper>

      <html lang="es" suppressHydrationWarning>
        <body
          className={`${roboto.className} antialiased flex flex-col items-center`}
        >
          <ThemeProviders>
            <Toaster position="top-left" />
            <Providers>{children}</Providers>
          </ThemeProviders>
        </body>
      </html>
    </SessionWrapper>
  );
}
