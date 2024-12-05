import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ContextProvider } from "@/contexts/status";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Expedition - Your solution of expedition journey",
  description: "Your solution of expedition journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContextProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ContextProvider>
  );
}
