import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/Provider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LuxMedi",
  description: "Online medical care when you need it",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}