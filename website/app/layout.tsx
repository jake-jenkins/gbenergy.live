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
      <head>
      <script defer src="https://analytics.gbenergy.live/script.js" data-website-id="e035f0fa-6045-4a14-b885-2349d54dd1b2"></script>
      </head>
      <body className="dark:bg-zinc-900 dark:text-white">
        <Header />
        <main className="mt-16 mx-auto container p-4">
        {children}
        </main>
      </body>
    </html>
  );
}
