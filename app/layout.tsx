import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UK Energy Grid"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark:bg-slate-950 dark:text-white">
        <main className="mx-auto container p-4">
        {children}
        </main>
      </body>
    </html>
  );
}
