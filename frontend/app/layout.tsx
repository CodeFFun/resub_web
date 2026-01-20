import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"



export const metadata: Metadata = {
  title: "ReSub",
  description: "A online e-commerce site for your daily use",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
        {children}
        </main>
      <Toaster position="top-right" />
      </body>
    </html>
  );
}
