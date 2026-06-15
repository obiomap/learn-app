import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeLearn — Learn to Code for Beginners",
  description: "Interactive coding lessons with in-browser execution and AI tutoring.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
