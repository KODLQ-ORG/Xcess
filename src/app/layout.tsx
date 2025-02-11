import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

import { NavBar } from "@/components/ui/app-navbar";

export const metadata: Metadata = {
  title: "Access Management",
  description: "Enterprise Access Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
