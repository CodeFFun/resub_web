import type { Metadata } from "next";
import "./globals.css";


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
        {children}
      </body>
    </html>
  );
}
