import type { Metadata } from "next";
import "./globals.css";
import GlobalStyles from "@/styles/GlobalStyles";
import localFont from "next/font/local";
import toastConfig from "@/utils/toastConfig";
import { Toaster } from "react-hot-toast";
import ComponentIds from "@/constants/ComponentIds";
import NavBar from "@/components/NabBar/NavBar";
import StyledComponentsRegistry from "@/lib/styledComponentRegistry";
import getMetadata from "@/lib/metadata";
import { AuthProvider } from "@/contexts/AuthContext";

const myFont = localFont({
  src: [{ path: "../../public/fonts/Righteous-Regular.ttf" }],
  display: "swap",
  fallback: ["cursive"],
});

export const metadata: Metadata = getMetadata({
  title: "Inicio",
  description: "Gestión de tickets",
  url: "/",
  addCompanyNameInTitle: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light-theme">
      <body>
        <AuthProvider>
          <StyledComponentsRegistry>
            <GlobalStyles $font={myFont} />
            <NavBar />
            {children}
          </StyledComponentsRegistry>
        </AuthProvider>
        <div id={ComponentIds.Portal}></div>
        <Toaster toastOptions={toastConfig} />
      </body>
    </html>
  );
}
