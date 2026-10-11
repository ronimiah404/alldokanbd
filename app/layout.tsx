import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alldokan — Everyday shopping, made easy",
  description: "Discover everyday essentials, gadgets, fashion and home picks at Alldokan Bangladesh.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
