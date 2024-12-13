import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "GBenergy.live"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark:bg-zinc-900 dark:text-white">
        <Header />
        <main className="mt-16 mx-auto container p-4">
        {children}
        </main>
      </body>
    </html>
  );
}
