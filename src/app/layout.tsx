import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Feature-Sliced Todo List",
  description: "Next.js 16 + React 19 todo app structured with Feature-Sliced Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
